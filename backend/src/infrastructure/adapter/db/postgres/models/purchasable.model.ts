import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Course } from './course.model';
import { Module } from './module.model';
import { Lecture } from './lecture.model';
import { User } from './user.model';
import { Promotion } from './promotion.model';

enum PurchasableType {
    COURSE = 'course',
    MODULE = 'module',
    LECTURE = 'lecture',
}

enum PurchasableStatus {
    ACTIVE = 'active',
    DRAFT = 'draft',
}

@Table({
    tableName: 'purchasables',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Purchasable extends Model {
    @Column
    declare title: string;

    @Column
    declare description: string;

    @Column
    declare type: PurchasableType;

    @ForeignKey(() => Course)
    @Column
    declare courseId?: number;

    @BelongsTo(() => Course)
    declare course?: Course;

    @ForeignKey(() => Module)
    @Column
    declare moduleId?: number;

    @BelongsTo(() => Module)
    declare module?: Module;

    @ForeignKey(() => Lecture)
    @Column
    declare lectureId?: number;

    @BelongsTo(() => Lecture)
    declare lecture?: Lecture;

    @ForeignKey(() => User)
    @Column
    declare instructorId: number;

    @BelongsTo(() => User)
    declare instructor: User;

    @Column
    declare categoryId?: number;

    @Column
    declare price: number;

    @Column
    declare status: PurchasableStatus;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        defaultValue: [],
    })
    declare keywords: string[];

    @Column
    declare releasedAt?: Date;

    @Column
    declare duration?: number;

    @Column
    declare approxNumStudents?: number;

    @Column
    declare averageRank?: number;

    @ForeignKey(() => Promotion)
    @Column({
        type: DataType.UUID,
    })
    declare promotion_id?: string;

    @BelongsTo(() => Promotion)
    declare purchasable?: Promotion;
}
