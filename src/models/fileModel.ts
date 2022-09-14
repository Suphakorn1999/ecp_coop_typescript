import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { AssignmentFile } from './assignmentFileModel';
import { Student } from './studentModel';

@Table({
    timestamps: false,
    tableName: 'file',
})

export class File extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idfile!: number;

    @ForeignKey(() => Student)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idstudent!: string;

    @BelongsTo(() => Student)
    student!: Student;

    @ForeignKey(() => AssignmentFile)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idassignmentFile!: number;

    @BelongsTo(() => AssignmentFile)
    assignmentFile!: AssignmentFile;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name_file!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    path_file!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type_file!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    date_file!: string;
}