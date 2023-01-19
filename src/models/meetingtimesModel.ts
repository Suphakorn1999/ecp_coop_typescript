import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Year } from './YearModel';


@Table({
    timestamps: false,
    tableName: 'meeting_times',
})

export class Meeting_Times extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    idmeeting_times!: number;

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
        allowNull: true,
    })
    times!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    start_date!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    end_date!: Date;
}