import { Column, Table, DataType, Model, HasMany } from 'sequelize-typescript';
import { Course } from './course.model';
import { Purchasable } from './purchasable.model';
import { Promotion } from './promotion.model';
import { Cart } from './cart.model';
import { Enrollment } from './enrollment.model';
import { Withdrawal } from './withdrawal.model';
import { Notification } from './notification.model';

type AccountConfig = {
    language?: 'en' | 'es';
    plan?: 'basic' | 'premium';
    limits?: {
        createCourses: number;
        withdrawalMin: number;
    };
    withdrawalsConfig?: any;
};

type UserStats = {
    student?: {
        courses?: {
            inProgress: number;
            completed: number;
            pending: number;
        };
    };
    teacher?: {
        score?: number;
        students?: {
            total: number;
            inProgress: number;
        };
    };
};

@Table({
    tableName: 'users',
    underscored: true,
    timestamps: true,
    paranoid: true,
})
export class User extends Model {
    @Column({
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    })
    declare email: string;

    @Column({ allowNull: false })
    declare password: string;

    @Column({
        allowNull: false,
        validate: { len: [2, 70] },
    })
    declare firstName: string;

    @Column({
        allowNull: false,
        validate: { len: [2, 70] },
    })
    declare lastName: string;

    @Column({ type: DataType.DATE, allowNull: false })
    declare birthDate: Date;

    @Column
    declare avatarUrl: string;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        defaultValue: {},
    })
    declare config: AccountConfig;

    @Column({
        type: DataType.JSONB,
        allowNull: false,
        defaultValue: {},
    })
    declare stats: UserStats;

    @HasMany(() => Course)
    declare courses: Course[];

    @HasMany(() => Purchasable)
    declare purchasables: Purchasable[];

    @HasMany(() => Promotion)
    declare promotions: Promotion[];

    @HasMany(() => Cart)
    declare carts: Cart[];

    @HasMany(() => Enrollment)
    declare enrollments: Enrollment[];

    @HasMany(() => Withdrawal)
    declare withdrawals: Withdrawal[];

    @HasMany(() => Notification)
    declare notifications: Notification[];
}
