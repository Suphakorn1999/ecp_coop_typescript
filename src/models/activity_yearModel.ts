import { Table, Model, Column, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Activity } from './activityModel';
import { Student } from './studentModel';
import { Year } from './YearModel';

@Table({
  timestamps: false,
  tableName: 'activity_year',
})

export class Activity_Year extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idactivity_year!: number;
    
    @ForeignKey(() => Activity)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idactivity!: number;
    
    @BelongsTo(() => Activity)
    activity!: Activity;
    
    @ForeignKey(() => Year)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    idyear!: number;
    
    @BelongsTo(() => Year)
    year!: Year;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'active',
        values: ['active', 'inactive'],
    })
    status_activity_year!: string;
  
}
