import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Module } from './module.model';
import { Purchasable } from './purchasable.model';

type CourseStats = {
    sells?: number;
};

@Table({
    tableName: 'courses',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Course extends Model {
    @Column({
        allowNull: false,
        validate: { len: [2, 100] },
    })
    declare title: string;

    @ForeignKey(() => User)
    @Column
    declare instructorId: number;

    @BelongsTo(() => User)
    declare instructor: User;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        defaultValue: {},
    })
    declare stats: CourseStats;

    @HasMany(() => Module)
    declare modules: Module[];

    @HasOne(() => Purchasable)
    declare purchasable?: Purchasable;
}
