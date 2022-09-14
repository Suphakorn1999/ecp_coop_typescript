import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Fm10_21_coop } from './fm10_21coopModel';
import { Question } from './questionModel';


@Table({
  timestamps: false,
  tableName: 'answerfm10_21',
})
export class Answerfm10_21 extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idanswer10_21!: number;

  @ForeignKey(() => Fm10_21_coop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'fm10_21_coop',
    },
  })
  idfm10_21_coop!: number;

  @BelongsTo(() => Fm10_21_coop)
  fm10_21_coop!: Fm10_21_coop;

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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  note!: string;
  
}
