import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Company } from './companyModel';

@Table({
  timestamps: false,
  tableName: 'province',
})
export class Province extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idprovince!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name_province!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  region!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country!: string;

  @HasMany(() => Company)
  companies!: Company[];
}