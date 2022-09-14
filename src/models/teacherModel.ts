import { Branch } from './branchModel';
import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Role } from './roleModel';
import { Meeting } from './meetingModel';

@Table({
  timestamps: false,
  tableName: 'teacher',
})
export class Teacher extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  idteacher!: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idrole!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @ForeignKey(() => Branch)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  idbranch!: number;

  @BelongsTo(() => Branch)
  branch!: Branch;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  prename_teacher!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstname_teacher!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastname_teacher!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  username_teacher!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    values: ['active', 'inactive'],
    defaultValue: 'active',
  })
  status_teacher!: string;

  @HasMany(() => Meeting)
  meetings!: Meeting[];
}