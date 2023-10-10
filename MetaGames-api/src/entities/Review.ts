import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { BaseEntityColumns } from "../bases/baseEntityColumns"
import { Usuario } from "./Usuario"
import { Jogo } from "./Jogo"

@Entity()
export class Review extends BaseEntityColumns {

    @Column()
    comentario: string

    @Column()
    background_image: string

    @Column({ type: 'decimal', precision: 5, scale: 1 })
    nota: number

    @ManyToOne(type => Usuario)
    @JoinColumn({name: 'usuario_id'})
    usuario: Usuario

    @OneToOne(() => Jogo)
    @JoinColumn({name: 'jogo_id'})
    jogo: Jogo;
}
