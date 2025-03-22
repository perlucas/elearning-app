import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Enrollment } from './enrollment.model';
import { User } from './user.model';

enum WithdrawalStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
}

type WithdrawalDetails = {
    purchasableIds?: number[];
    netAmount?: number;
};

@Table({
    tableName: 'withdrawals',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Withdrawal extends Model {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @Column
    declare status: WithdrawalStatus;

    @Column
    declare amount: number;

    @Column
    declare feesPerc: number;

    @Column({
        type: DataType.JSONB,
    })
    declare details: WithdrawalDetails;

    @Column
    declare completedAt?: Date;

    @HasMany(() => Enrollment)
    declare enrollments: Enrollment[];
}
