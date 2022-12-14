import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Answerfm10_11 } from './answer10_11Model';
import { Student_Company } from './student_companyModel';

@Table({
  timestamps: false,
  tableName: 'fm10_11_coop',
})
export class Fm10_11_coop extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idfm10_11_coop!: number;

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
  time!: string;

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

  @HasMany(() => Answerfm10_11)
  answerfm10_11!: Answerfm10_11[];
}
