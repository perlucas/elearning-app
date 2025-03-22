import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';

type NotificationDetails = Record<string, string | number>;

@Table({
    tableName: 'notifications',
    underscored: true,
})
export class Notification extends Model {
    @ForeignKey(() => User)
    @Column
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @Column
    declare viewed: boolean;

    @Column({
        type: DataType.JSONB,
    })
    declare details?: NotificationDetails;

    @CreatedAt
    @Column
    declare createdAt: Date;
}
