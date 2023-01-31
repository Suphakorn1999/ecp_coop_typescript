import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Activity_Student } from './activity_studentModel';
import { Branch } from './branchModel';
import { File } from './fileModel';
import { Role } from './roleModel';
import { Student_Company } from './student_companyModel';
import { Study_group } from './study_groupModel';
import { Year } from './YearModel';
@Table({
  timestamps: false,
  tableName: 'student',
})
export class Student extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idstudent!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idrole!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @Column({
    type: DataType.STRING(14),
    allowNull: false,
  })
  student_id!: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
  })
  prename_student!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  fname_student!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  lname_student!: string;

  @ForeignKey(() => Year)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  idyear!: number;

  @BelongsTo(() => Year)
  year!: Year;

  @ForeignKey(() => Branch)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idbranch!: number;

  @BelongsTo(() => Branch)
  branch!: Branch;

  @ForeignKey(() => Study_group)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  idstudy_group!: number;

  @BelongsTo(() => Study_group)
  study_group!: Study_group;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  username_student!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  status_file!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    values: ['satisfied', 'unsatisfied', 'null'],
    defaultValue: 'unsatisfied',
  })
  status!: string;

  @HasMany(() => Student_Company)
  student_companies!: Student_Company[];

  @HasMany(() => Activity_Student)
  activity_students!: Activity_Student[];

  @HasMany(() => File)
  files!: File[];
}