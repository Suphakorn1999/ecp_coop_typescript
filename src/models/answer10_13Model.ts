import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Fm10_13_coop } from './fm10_13coopModel';
import { Question } from './questionModel';


@Table({
  timestamps: false,
  tableName: 'answerfm10_13',
})
export class Answerfm10_13 extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idanswer!: number;

    @ForeignKey(() => Fm10_13_coop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'fm10_13_coop',
        },
    })
    idfm10_13_coop!: number;

    @ForeignKey(() => Question)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idquestion!: number;

    @BelongsTo(() => Question)
    question!: Question;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    answer!: string;
}
