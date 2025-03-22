import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from './user.model';
import { Purchasable } from './purchasable.model';
import { Cart } from './cart.model';
import { Withdrawal } from './withdrawal.model';

enum EnrollmentStatus {
    DRAFT = 'draft',
    PENDING_PAYMENT = 'pending_payment',
    ACTIVE = 'active',
    CANCELLED = 'cancelled',
}

type EnrollmentProgress = {
    [key: string]: number;
    general: number;
};

type ProductSnapshot = {
    purchasableId: string;
    price: number;
    promotionId: string;
};

@Table({
    tableName: 'enrollments',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Enrollment extends Model {
    @ForeignKey(() => User)
    @Column
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    @ForeignKey(() => Purchasable)
    @Column
    declare purchasableId: number;

    @BelongsTo(() => Purchasable)
    declare purchasable: Purchasable;

    @ForeignKey(() => Cart)
    @Column
    declare cartId: string;

    @BelongsTo(() => Cart)
    declare cart: Cart;

    @Column
    declare status: EnrollmentStatus;

    @Column
    declare startedAt?: Date;

    @Column({
        type: DataType.JSONB,
    })
    declare progress: EnrollmentProgress;

    @Column({ type: DataType.JSONB })
    declare snapshot: ProductSnapshot;

    @ForeignKey(() => Withdrawal)
    @Column
    declare withdrawalId?: string;

    @BelongsTo(() => Withdrawal)
    declare withdrawal?: Withdrawal;
}
