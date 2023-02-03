import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Student } from './studentModel';
import { Year } from './YearModel';

@Table({
    timestamps: false,
    tableName: 'enroll',
})

export class Enroll extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idenroll!: number;

    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idstudent!: number;

    @BelongsTo(() => Student)
    student!: Student;

    @ForeignKey(() => Year)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idyear!: number;

    @BelongsTo(() => Year)
    year!: Year;

    @Column({
        type: DataType.STRING(),
        allowNull: true,
        defaultValue: '',
    })
    status_file!: string;

    @Column({
        type: DataType.STRING(),
        allowNull: true,
        defaultValue: '',
    })
    grade!: string;

}