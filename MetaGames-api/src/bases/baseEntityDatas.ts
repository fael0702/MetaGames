import {
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export abstract class BaseEntityDatas extends BaseEntity {
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