import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Company } from './companyModel';

@Table({
  timestamps: false,
  tableName: 'qualification',
})
export class Qualification extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idqualification!: number;
  @ForeignKey(() => Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idcompany!: number;

  @BelongsTo(() => Company)
  company!: Company;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subject!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  esired_field_of_study_1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  esired_field_of_study_2!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  esired_field_of_study_3!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  esired_field_of_study_4!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  amount_of_work!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  ability_to_work_1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ability_to_work_2!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ability_to_work_3!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ability_to_work_4!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  selection_of_students!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  other_requirements_1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  other_requirements_2!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  other_requirements_3!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  other_requirements_4!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  job_topic!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  job_position!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  job_description!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  working_hours!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  length_of_time!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  compensation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  accommodation!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  other_welfare_1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  other_welfare_2!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  other_welfare_3!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  other_welfare_4!: string;
}
