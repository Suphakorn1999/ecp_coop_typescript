import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Answerfm10_21 } from './answer10_21Model';
import { Student } from './studentModel';

@Table({
  timestamps: false,
  tableName: 'fm10_21_coop',
})
export class Fm10_21_coop extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idfm10_21_coop!: number;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'student',
    },
  })
  idstudent!: number;

  @BelongsTo(() => Student)
  qualification!: Student;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  createdAt?: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  updatedAt?: any;

  @HasMany(() => Answerfm10_21)
  answers!: Answerfm10_21[];
}
