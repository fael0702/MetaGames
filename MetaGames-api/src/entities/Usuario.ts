import { Entity, Column, OneToMany } from "typeorm"
import { BaseEntityColumns } from "../bases/BaseEntityColumns"
import { Review } from "./Review"
import { TokenInvalido } from "./TokenInvalido";

@Entity()
export class Usuario extends BaseEntityColumns {

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column('date')
    data_nascimento: Date;

    @Column({ nullable: true })
    imagem: string;

    @OneToMany(type => Review, type => type.usuario)
    reviews: Review[];

    @OneToMany(type => TokenInvalido, type => type.usuario)
    tokens: TokenInvalido[];

}
