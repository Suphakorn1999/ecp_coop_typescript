import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { File } from './fileModel';

@Table({
  timestamps: false,
  tableName: 'assignment_file',
})
export class AssignmentFile extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idassignmentFile!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_assignment_file!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  note_assignment!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  start_date!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  end_date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    values:['active','inactive'],
    defaultValue:'active',
  })
  status_assignment_file!: string;

  @HasMany(() => File)
    file!: File[];
}
