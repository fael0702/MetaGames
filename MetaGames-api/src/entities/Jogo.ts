import { Entity, Column } from "typeorm"
import { BaseEntityColumns } from "../bases/baseEntityColumns"

@Entity()
export class Jogo extends BaseEntityColumns {

    @Column()
    nome: string

    @Column()
    data_lancamento: Date

}
