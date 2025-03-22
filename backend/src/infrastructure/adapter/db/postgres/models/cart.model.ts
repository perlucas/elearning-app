import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Payment } from './payment.model';
import { Enrollment } from './enrollment.model';

enum CartStatus {
    DRAFT = 'draft',
    PURCHASED = 'purchased',
}

type CartSnapshot = {
    items: {
        purchasableId: number;
        price: number;
        promotionId?: string;
    }[];
};

@Table({
    tableName: 'carts',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Cart extends Model {
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
    declare status: CartStatus;

    @Column
    declare purchasedAt?: Date;

    @Column({
        type: DataType.JSONB,
    })
    declare snapshot: CartSnapshot;

    @ForeignKey(() => Payment)
    @Column
    declare paymentId?: string;

    @HasOne(() => Payment)
    declare payment?: Payment;

    @HasMany(() => Enrollment)
    declare enrollments: Enrollment[];
}
