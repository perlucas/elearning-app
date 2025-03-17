import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Course } from './course.model';
import { Lecture } from './lecture.model';

type ModuleStats = {
    sells?: number;
};

@Table({
    tableName: 'modules',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Module extends Model {
    @Column({
        allowNull: false,
        validate: { len: [2, 100] },
    })
    declare title: string;

    @Column
    declare order: number;

    @ForeignKey(() => Course)
    @Column
    declare courseId: number;

    @BelongsTo(() => Course)
    declare course: Course;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        defaultValue: {},
    })
    declare stats: ModuleStats;

    @HasMany(() => Lecture)
    declare lectures: Lecture[];
}
