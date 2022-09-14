import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Answerfm10_11 } from './answer10_11Model';
import { Meeting } from './meetingModel';

@Table({
  timestamps: false,
  tableName: 'fm10_11_coop',
})
export class Fm10_11_coop extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idfm10_11_coop!: number;

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

  @HasMany(() => Answerfm10_11)
  answerfm10_11!: Answerfm10_11[];
}
