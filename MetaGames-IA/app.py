from flask import Flask, request, jsonify
from flask_cors import CORS  # Importe o CORS da extensão Flask-CORS
import psycopg2
from psycopg2 import sql
import nltk
from nltk.classify import NaiveBayesClassifier
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import nltk
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.classify import NaiveBayesClassifier
from nltk.stem import WordNetLemmatizer
from sklearn.model_selection import train_test_split

app = Flask(__name__)
CORS(app)

#Download das ferramentas para remoção de stopword, prefixos e sufixos
#tokenização e lematização
listaElementos = ['stopwords','rslp','punkt','wordnet']
for elemento in listaElementos:
  nltk.download(elemento)

#Leitura das Bases
dadosTreinamento = pd.read_csv('./dataset.csv',delimiter=',')
dadosTeste = pd.read_csv('./dataset.csv',delimiter=',')

dfTreinamento = pd.DataFrame(dadosTreinamento)
dfTeste = pd.DataFrame(dadosTeste)

#Apresentando os 10 primeiros itens do conjunto de dados
dfTreinamento.head(10)

# Substituir 'NaN' por NaN
dfTreinamento.replace('NaN', np.nan, inplace=True)

# Excluindo linhas com valores NaN da base de treinamento
dfTreinamento = dfTreinamento.dropna()

# Selecionar os primeiros 50 mil registros
# dfTreinamento = dfTreinamento.iloc[:50000]

# Substituir 'NaN' por NaN
dfTeste.replace('NaN', np.nan, inplace=True)

# Excluindo linhas com valores NaN da base de treinamento
dfTeste = dfTeste.dropna()

# Selecionar os primeiros 50 mil registros
dfTeste = dfTeste.iloc[:5000]

# Verificando as dimensões após a remoção de NaN
# print(dfTreinamento.shape)
print(dfTeste.shape)


dfTreinamento_balanceado = pd.concat([
    dfTreinamento[dfTreinamento['review_score'] == 1].sample(50000, random_state=42),
    dfTreinamento[dfTreinamento['review_score'] == -1].sample(50000, random_state=42)
])

dfTreinamento = dfTreinamento_balanceado

print(dfTreinamento.shape)

#Gerando um gráfico da base de dados de treinamento:

graficoTreinamento = sns.countplot(data=dfTreinamento,x='review_score')

plt.xlabel('Sentimento')
plt.ylabel('Contagem')

dfTeste.head(10)

#Gerando um gráfico da base de dados:

graficoTeste = sns.countplot(data=dfTeste,x='review_score')

plt.xlabel('Sentimento')
plt.ylabel('Contagem')

"""**Pré-processamento:**"""

#Iniciar o lematizador e selecionar lista de stopwords
lematizador = WordNetLemmatizer()
stopwords = set(stopwords.words('english'))

stopwords

# Suponho que você tenha definido lematizador e stopwords anteriormente

def limparTexto(texto):
    texto = texto.lower()
    texto = re.sub(r'@[A-Za-z0-9$-_@.&+]+', ' ', texto)
    texto = re.sub(r'https?://[A-Za-z0-9./]+', ' ', texto)
    texto = re.sub(r' +', ' ', texto)

    listaEmoticons = {':)': 'feliz', 'xD': 'feliz', ':p': 'feliz', ':O': 'feliz', 'Xp': 'feliz', ';)': 'feliz',
                      '*-*': 'feliz', ':(': 'triste', ':/': 'triste', '-_-': 'triste'}

    for emoticon in listaEmoticons:
        texto = texto.replace(emoticon, listaEmoticons[emoticon])

    palavras = [lematizador.lemmatize(palavra) for palavra in word_tokenize(texto) if palavra not in stopwords]

    return ' '.join([str(itemFrase) for itemFrase in palavras if not itemFrase.isdigit()])

def extrairFeatures(texto):
    palavras = [lematizador.lemmatize(palavra) for palavra in word_tokenize(texto) if palavra not in stopwords]
    return nltk.FreqDist(palavras)

# Carregar dados de treinamento e teste:
dfTreinamento = dfTreinamento[['review_text', 'review_score']]
dfTreinamento['review_text'] = dfTreinamento['review_text'].apply(limparTexto)
treino, teste = train_test_split(dfTreinamento, test_size=0.5, random_state=42)

dadosTreino = []

for i in range(len(treino)):
    texto = treino['review_text'].iloc[i]
    sentimento = treino['review_score'].iloc[i]
    features = extrairFeatures(texto)
    dadosTreino.append((features, sentimento))

dadosTeste = []

for i in range(len(teste)):
    texto = teste['review_text'].iloc[i]
    sentimento = teste['review_score'].iloc[i]
    features = extrairFeatures(texto)
    dadosTeste.append((features, sentimento))

# Inicializando o classificador Naive Bayes
classificadorNB = NaiveBayesClassifier.train(dadosTreino)

# Avaliando o modelo / Gerando acurácia
acuracia = nltk.classify.accuracy(classificadorNB, dadosTeste)
print(f'Acurácia do classificador é: {acuracia * 100:.2f} %')

@app.route('/receber_id_usuario', methods=['POST'])
def receber_id_usuario():
    try:
        data = request.get_json()
        print(data)
        id_usuario = data.get('id_usuario')

        # Construir a string de conexão
        conn_string = f"host=localhost port=5432 user=postgres password=22042003cR dbname=metagames"

        # Conectar ao banco de dados
        conn = psycopg2.connect(conn_string)
        print("Conexão bem-sucedida!")

        # Criar um objeto cursor para executar comandos SQL
        with conn.cursor() as cursor:
            # Consulta SQL para obter o último comentário do usuário
            query = sql.SQL("""
                SELECT id, comentario
                FROM review
                WHERE usuario_id = %s
                ORDER BY data_atualizacao DESC
                LIMIT 1
            """)

            # Executar a consulta com o ID do usuário como parâmetro
            cursor.execute(query, (id_usuario,))

            # Obter o resultado da consulta
            resultado = cursor.fetchone()


            # Verificar se há resultados
            if resultado:
                id_review, ultimo_comentario = resultado
                print(f"Último comentário do usuário {id_usuario}: {ultimo_comentario}")

                # Usar o classificador Naive Bayes para análise de sentimento
                features = extrairFeatures(ultimo_comentario)
                sentimento = classificadorNB.classify(features)

                print(f"Sentimento do comentário: {sentimento}")

                # Atualizar o sentimento na tabela "review"
                query_update = sql.SQL("""
                    UPDATE review
                    SET sentimento = %s
                    WHERE id = %s
                """)

                # Converter sentimento para int se necessário
                sentimento = int(sentimento)

                # Converter id_review e id_usuario para int se necessário
                id_review = int(id_review)

                print("Teste id_review: ", id_review)

                # Executar o UPDATE com o sentimento, ID e usuario_id como parâmetros
                cursor.execute(query_update, (sentimento, id_review))

                # Commit para salvar as alterações no banco de dados
                conn.commit()

                # Exemplo de resposta (pode ser adaptado conforme necessário):
                resposta = {
                    'status': 'OK',
                    'mensagem': f'ID do usuário {id_usuario} recebido com sucesso.',
                    'sentimento': sentimento
                }


            else:
                print(f"O usuário {id_usuario} não possui comentários.")

                resposta = {
                    'status': 'OK',
                    'mensagem': f'O usuário {id_usuario} não possui comentários.',
                    'sentimento': 'Indefinido'
            }

            return jsonify(resposta)

    except Exception as e:
        return jsonify({'status': 'Erro', 'mensagem': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
