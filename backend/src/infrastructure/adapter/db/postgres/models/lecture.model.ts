import { BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table } from 'sequelize-typescript';
import { Course } from './course.model';
import { Module } from './module.model';
import { Purchasable } from './purchasable.model';

type LectureStats = {
    sells?: number;
};

type Resource = {
    type: 'video' | 'document' | 'text';
    url?: string;
    content?: string;
};

type LectureResources = {
    main?: Resource;
    attachments?: Resource[]; // note: up to 3 attachments
};

@Table({
    tableName: 'lectures',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Lecture extends Model {
    @Column({
        allowNull: false,
        validate: { len: [2, 100] },
    })
    declare title: string;

    @Column
    declare order: number;

    @ForeignKey(() => Module)
    @Column
    declare moduleId: number;

    @BelongsTo(() => Module)
    declare module: Module;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        defaultValue: {},
    })
    declare resources: LectureResources;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        defaultValue: {},
    })
    declare stats: LectureStats;

    @HasOne(() => Purchasable)
    declare purchasable?: Purchasable;
}
