import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Purchasable } from './purchasable.model';
import { User } from './user.model';

@Table({
    tableName: 'lectures',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class Promotion extends Model {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    declare id: string;

    @Column
    declare discountPerc: number;

    @Column
    declare applySince?: Date;

    @Column
    declare applyTo?: Date;

    @Column
    declare unbounded: boolean;

    @HasMany(() => Purchasable)
    declare purchasables: Purchasable[];

    @ForeignKey(() => User)
    @Column
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;
}
