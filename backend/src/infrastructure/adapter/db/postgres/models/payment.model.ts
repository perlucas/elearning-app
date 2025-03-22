import { BelongsTo, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Cart } from './cart.model';

enum PaymentStatus {
    PENDING = 'pending',
    SUCCESS = 'success',
    ERROR = 'error',
}

type PaymentDetails = {
    attempts?: {
        date: Date;
        result: string;
        errorCode: string;
        paymentId: string;
    }[];
};

@Table({
    tableName: 'payments',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Payment extends Model {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare id: string;

    @Column
    declare status: PaymentStatus;

    @Column
    declare dueAmount: number;

    @Column
    declare confirmedAt: Date;

    @Column({
        allowNull: false,
        type: DataType.JSONB,
        defaultValue: {},
    })
    declare details: PaymentDetails;

    @BelongsTo(() => Cart)
    declare cart: Cart;
}
