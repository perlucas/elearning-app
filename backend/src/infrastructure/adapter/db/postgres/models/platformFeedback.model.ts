import { Column, CreatedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

@Table({
    tableName: 'platform_feedbacks',
    underscored: true,
})
export class PlatformFeedback extends Model {
    @ForeignKey(() => User)
    @Column
    declare userId: number;

    @Column
    declare score: number;

    @Column
    declare comment: string;

    @CreatedAt
    @Column
    declare createdAt: Date;
}
