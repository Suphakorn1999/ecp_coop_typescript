import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Answerfm10_20 } from './answer10_20Model';
import { Student_Company } from './student_companyModel';

@Table({
  timestamps: false,
  tableName: 'fm10_20_coop',
})
export class Fm10_20_coop extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idfm10_20_coop!: number;

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

  @HasMany(() => Answerfm10_20)
  answerfm10_20!: Answerfm10_20[];
}
