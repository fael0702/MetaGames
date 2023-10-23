import { Entity, Column, OneToMany } from "typeorm"
import { BaseEntityColumns } from "../bases/baseEntityColumns"
import { Review } from "./Review"

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

}
