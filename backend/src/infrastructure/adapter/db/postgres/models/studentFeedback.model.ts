import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Enrollment } from './enrollment.model';

@Table({
    tableName: 'student_feedbacks',
    underscored: true,
})
export class StudentFeedback extends Model {
    @ForeignKey(() => Enrollment)
    @Column
    declare enrollmentId: number;

    @BelongsTo(() => Enrollment)
    declare enrollment: Enrollment;

    @Column
    declare score: number;

    @Column
    declare comment: string;

    @CreatedAt
    @Column
    declare createdAt: Date;
}
