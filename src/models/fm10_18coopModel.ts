import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Student_Company } from './student_companyModel';

@Table({
  timestamps: false,
  tableName: 'fm10_18_coop',
})
export class Fm10_18_coop extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idfm10_18_coop!: number;

  @ForeignKey(() => Student_Company)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'student_company',
    },
  })
  idstudent_company!: number;

  @BelongsTo(() => Student_Company)
  student_company!: Student_Company;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fname_assessor!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lname_assessor!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  position_assessor!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  department_assessor!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  strength_1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  strength_2!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  strength_3!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  strength_4!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  improvement_1!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  improvement_2!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  improvement_3!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  improvement_4!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    values: ['Yes', 'No','Not Sure'],
  })
  get_into_work!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  other_comments!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  total_score!: string;

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
}
