import {
    BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export abstract class BaseEntityColumns extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
      name: 'data_cadastro',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    })
    dataCadastro: Date;
  
    @UpdateDateColumn({
      name: 'data_atualizacao',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    dataAtualizacao: Date;
  }