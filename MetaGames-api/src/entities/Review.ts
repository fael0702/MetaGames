import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { BaseEntityDatas } from "../bases/baseEntityDatas"
import { Usuario } from "./Usuario"
import { Jogo } from "./Jogo"

@Entity()
export class Review extends BaseEntityDatas {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comentario: string

    @Column({ type: 'decimal', precision: 5, scale: 1 })
    nota: number

    @ManyToOne(type => Usuario)
    @JoinColumn({name: 'usuario_id'})
    usuario: Usuario

    @OneToOne(() => Jogo)
    @JoinColumn({name: 'jogo_id'})
    jogo: Jogo;
}
