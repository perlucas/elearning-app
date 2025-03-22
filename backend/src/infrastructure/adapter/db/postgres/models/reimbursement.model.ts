import { Column, DataType, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Enrollment } from './enrollment.model';

enum ReimbursementStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
}

type ReimbursementDetails = {
    amount?: number;
    productTitle?: string;
};

@Table({
    tableName: 'reimbursements',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Reimbursement extends Model {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare id: string;

    @Column
    declare status: ReimbursementStatus;

    @Column({
        type: DataType.JSONB,
        defaultValue: {},
    })
    declare details: ReimbursementDetails;

    @Column
    declare completedAt?: Date;

    @HasOne(() => Enrollment)
    declare enrollment: Enrollment;
}
