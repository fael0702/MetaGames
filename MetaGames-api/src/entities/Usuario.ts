import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { BaseEntityDatas } from "../bases/baseEntityDatas"
import { Review } from "./Review"

@Entity()
export class Usuario extends BaseEntityDatas {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

    @OneToMany(type => Review, type => type.usuario)
    reviews: Review[]

}
