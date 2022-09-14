import { Factory } from './factoryModel';
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Teacher } from './teacherModel';
import { Student } from './studentModel';

@Table({
  timestamps: false,
  tableName: 'branch',
})
export class Branch extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idbranch!: number;

    @ForeignKey(() => Factory)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idfactory!: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name_branch!: string;

    @BelongsTo(() => Factory)
    factory!: Factory;

    @HasMany(() => Teacher)
    teachers!: Teacher[]

    @HasMany(() => Student)
    students!: Student[];
}