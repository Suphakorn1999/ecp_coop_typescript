import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Fm10_20_coop } from './fm10_20coopModel';
import { Question } from './questionModel';

@Table({
  timestamps: false,
  tableName: 'answerfm10_20',
})
export class Answerfm10_20 extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idanswer10_20!: number;

  @ForeignKey(() => Fm10_20_coop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'fm10_20_coop',
    },
  })
  idfm10_20_coop!: number;

  @BelongsTo(() => Fm10_20_coop)
  fm10_20_coop!: Fm10_20_coop;

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
