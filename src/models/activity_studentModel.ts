import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Activity } from './activityModel';
import { Student } from './studentModel';

@Table({
  timestamps: false,
  tableName: 'activity_student',
})

export class Activity_Student extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idactivity_student!: number;

  @ForeignKey(() => Activity)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idactivity!: number;
  
  @BelongsTo(() => Activity)
  activity!: Activity;

  @ForeignKey(() => Student)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idstudent!: number;

  @BelongsTo(() => Student)
  student!: Student;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: '',
    values: ['pass', 'progress', 'fail'],
  })
  status_activity!: string;
  
}
