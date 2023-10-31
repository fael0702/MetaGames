import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { BaseEntityColumns } from "../bases/baseEntityColumns"
import { Usuario } from "./Usuario"
import { Jogo } from "./Jogo"

@Entity()
export class TokenInvalido extends BaseEntityColumns {

    @Column()
    token: string;

    @Column()
    exp: number;

    @ManyToOne(type => Usuario)
    @JoinColumn({name: 'usuario_id'})
    usuario: Usuario;

}
