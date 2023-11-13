// models/PasswordReset.js
import { Entity, Column } from 'typeorm';
import { BaseEntityColumns } from '../bases/BaseEntityColumns';

@Entity()
export class PasswordReset extends BaseEntityColumns {

  @Column()
  email: string;

  @Column()
  codigo: string;

}
