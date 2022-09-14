import { Admin } from './adminModel';
import { Student } from './studentModel';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Teacher } from './teacherModel';

@Table({
  timestamps: false,
  tableName: 'role',
})
export class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idrole!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @HasMany(() => Teacher)
  teachers!: Teacher[];

  @HasMany(() => Student)
  students!: Student[];

  @HasMany(() => Admin)
  admins!: Admin[];
}
