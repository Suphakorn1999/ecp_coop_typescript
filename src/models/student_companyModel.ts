import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Company } from './companyModel';
import { Student } from './studentModel';


@Table({
    timestamps: false,
    tableName: 'student_company',
})

export class Student_Company extends Model<Student_Company> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idstudent_company!: number;

    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idstudent!: number;

    @BelongsTo(() => Student)
    student!: Student;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idcompany!: number;

    @BelongsTo(() => Company)
    company!: Company;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        values: ['active', 'inactive'],
        defaultValue: 'active',
    })
    status_student_company!: string;
}