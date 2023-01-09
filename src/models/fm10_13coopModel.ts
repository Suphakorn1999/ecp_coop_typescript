import { Student_Company } from './student_companyModel';
import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Answerfm10_13 } from './answer10_13Model';

@Table({
  timestamps: false,
  tableName: 'fm10_13_coop',
})
export class Fm10_13_coop extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idfm10_13_coop!: number;
    
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
        allowNull: false,
    })
    fname_assessor!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lname_assessor!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    position_assessor!: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    department_assessor!: string;

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

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    other_comments!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    updatedAt!: Date;

    @HasMany(() => Answerfm10_13)
    answerfm10_13!: Answerfm10_13[];
}
