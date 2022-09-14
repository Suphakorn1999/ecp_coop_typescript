import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Fm10_11_coop } from './fm10_11coopModel';
import { Question } from './questionModel';

@Table({
  timestamps: false,
  tableName: 'answerfm10_11',
})
export class Answerfm10_11 extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idanswer10_11!: number;

  @ForeignKey(() => Fm10_11_coop)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'fm10_11_coop',
    },
  })
  idfm10_11_coop!: number;

  @BelongsTo(() => Fm10_11_coop)
  fm10_20_coop!: Fm10_11_coop;

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
