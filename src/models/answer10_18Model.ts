import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Fm10_18_coop } from './fm10_18coopModel';
import { Question } from './questionModel';

@Table({
  timestamps: false,
  tableName: 'answerfm10_18',
})
export class Answerfm10_18 extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idanswer10_18!: number;
    
    @ForeignKey(() => Fm10_18_coop)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        references: {
        model: 'fm10_18_coop',
        },
    })
    idfm10_18_coop!: number;
    
    @BelongsTo(() => Fm10_18_coop)
    fm10_18_coop!: Fm10_18_coop;
    
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