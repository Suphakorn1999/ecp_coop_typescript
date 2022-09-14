import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Answerfm10_20 } from './answer10_20Model';
import { Answerfm10_14 } from './answerModel';
import { Form } from './formModel';

@Table({
  timestamps: false,
  tableName: 'question',
})
export class Question extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idquestion!: number;

  @ForeignKey(() => Form)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idform!: number;

  @BelongsTo(() => Form)
  form!: Form;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  idsub_question!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name_question!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  detail_question!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    values: ['yes', 'no'],
  })
  count_question!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    values: ['active', 'inactive'],
    defaultValue: 'active',
  })
  status_question!: string;

  @HasMany(() => Answerfm10_14)
  answers!: Answerfm10_14[];

  @HasMany(() => Answerfm10_20)
  answers10_20!: Answerfm10_20[];
}
