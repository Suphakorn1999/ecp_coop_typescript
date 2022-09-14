import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Answerfm10_20 } from './answer10_20Model';
import { Meeting } from './meetingModel';

@Table({
  timestamps: false,
  tableName: 'fm10_20_coop',
})
export class Fm10_20_coop extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idfm10_20_coop!: number;

  @ForeignKey(() => Meeting)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'meeting',
    },
  })
  idmeeting!: number;

  @BelongsTo(() => Meeting)
  meeting!: Meeting;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  createdAt?: any;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  updatedAt?: any;

  @HasMany(() => Answerfm10_20)
  answerfm10_20!: Answerfm10_20[];
}
