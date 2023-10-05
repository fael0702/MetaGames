import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { BaseEntityDatas } from "../bases/baseEntityDatas"

@Entity()
export class Jogo extends BaseEntityDatas {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    data_lancamento: Date

}
