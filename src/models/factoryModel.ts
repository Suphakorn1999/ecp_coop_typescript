import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Branch } from './branchModel';

@Table({
  timestamps: false,
  tableName: 'factory',
})
export class Factory extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idfactory!: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name_factory!: string;

    @HasMany(() => Branch)
    branches!: Branch[];
}
