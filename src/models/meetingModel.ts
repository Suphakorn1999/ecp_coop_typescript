import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Student_Company } from './student_companyModel';
import { Teacher } from './teacherModel';

@Table({
    timestamps: false,
    tableName: 'meeting',
})

export class Meeting extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idmeeting!: number;

    @ForeignKey(() => Student_Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idstudent_company!: number;

    @ForeignKey(() => Teacher)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idteacher!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    report_title_th!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    report_title_en!: string;
}