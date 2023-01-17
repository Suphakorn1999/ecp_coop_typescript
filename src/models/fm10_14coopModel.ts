import { Student_Company } from './student_companyModel';
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Answerfm10_14 } from './answerModel';

@Table({
  timestamps: false,
  tableName: 'fm10_14_coop',
})
export class Fm10_14_coop extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idfm10_14_coop!: number;

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
    allowNull: true,
  })
  other_Comments!: string;

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

  @HasMany(() => Answerfm10_14)
    answers!: Answerfm10_14[];
}
