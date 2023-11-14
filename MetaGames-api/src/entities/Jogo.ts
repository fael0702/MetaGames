import { Entity, Column, OneToMany } from "typeorm"
import { BaseEntityColumns } from "../bases/BaseEntityColumns"
import { Review } from "./Review"

@Entity()
export class Jogo extends BaseEntityColumns {

    @Column()
    nome: string;

    @Column()
    background_image: string;

    @Column()
    data_lancamento: Date;

    @OneToMany(type => Review, type => type.jogo)
    reviews: Review[];

}
