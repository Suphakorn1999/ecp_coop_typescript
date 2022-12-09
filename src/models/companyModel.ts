import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Meeting } from './meetingModel';
import { Province } from './provinceModel';
import { Qualification } from './qualificationModel';
import { Student_Company } from './student_companyModel';

@Table({
  timestamps: true,
  tableName: 'company',
})
export class Company extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idcompany!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_company!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name_company_eng!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address!: string;

  @ForeignKey(() => Province)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  idprovince!: number;

  @BelongsTo(() => Province)
  province!: Province;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  tel!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  detail_company!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  number_of_employee!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fname_manager!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lname_manager!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  rank!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  department!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  coordinator!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fname_coordinator!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lname_coordinator!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  rank_coordinator!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  department_coordinator!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  website!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    values: ['Software', 'Hardware', 'Network'],
  })
  type_company_1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    values: ['Software', 'Hardware', 'Network'],
  })
  type_company_2!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    values: ['Software', 'Hardware', 'Network'],
  })
  type_company_3!: string;

  @CreatedAt
  createdDate!: Date;

  @UpdatedAt
  updatedDate!: Date;

  @HasMany  (() => Student_Company)
  student_company!: Student_Company[];

  @HasMany  (() => Qualification)
  qualification!: Qualification[];
}
