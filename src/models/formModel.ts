import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Question } from './questionModel';


@Table({
    timestamps: false,
    tableName: 'form',
})

export class Form extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idform!: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name_form!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        values:['active','inactive'],
        defaultValue:'active'
    })
    status_form!: string;

    @HasMany(() => Question)
    questions!: Question[];
}