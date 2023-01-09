import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { Activity_Student } from './activity_studentModel';
import { Activity_Year } from './activity_yearModel';

@Table({
    timestamps: false,
    tableName: 'activity',
})

export class Activity extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idactivity!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name_activity!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'active',
        values: ['active', 'inactive']
    })
    status!: string;

    @HasMany(() => Activity_Student)
    activity_students!: Activity_Student[];

    @HasMany(() => Activity_Year)
    activity_years!: Activity_Year[];
}