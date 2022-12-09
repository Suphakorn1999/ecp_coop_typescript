import { Student } from './studentModel';
import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'year',
})
export class Year extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idyear!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  term!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  year!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status_year!: string;

  @HasMany(() => Student)
  students!: Student[]
}