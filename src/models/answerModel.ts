import { Table, Model, Column, DataType, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Fm10_14_coop } from './fm10_14coopModel';
import { Question } from './questionModel';


@Table({
  timestamps: false,
  tableName: 'answerfm10_14',
})
export class Answerfm10_14 extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idanswer!: number;

    @ForeignKey(() => Fm10_14_coop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'fm10_14_coop',
        },
    })
    idfm10_14_coop!: number;

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
