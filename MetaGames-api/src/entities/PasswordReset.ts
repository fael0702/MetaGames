// models/PasswordReset.js
import { Entity, Column } from 'typeorm';
import { BaseEntityColumns } from '../bases/baseEntityColumns';

@Entity()
export class PasswordReset extends BaseEntityColumns {

  @Column()
  email: string;

  @Column()
  codigo: string;

}
