import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Student } from './studentModel';

@Table({
  timestamps: false,
  tableName: 'study_group',
})

export class Study_group extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idstudy_group!: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    name_study_group!: string;

    @HasMany(() => Student)
    students!: Student[]
}