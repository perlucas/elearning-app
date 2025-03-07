import { useLocation, Link } from 'react-router';
import { useAuthContext } from '@/context/useAuthContext';
import { HTMLAttributeAnchorTarget } from 'react';
import { IconType } from 'react-icons';
import {
    BsBasket,
    BsFolderCheck,
    BsGear,
    BsGraphUp,
    BsPencilSquare,
    BsPeople,
    BsQuestionDiamond,
    BsStar,
    BsTrash,
    BsUiChecksGrid,
    BsWallet2,
} from 'react-icons/bs';

import clsx from 'clsx';
import { FaSignOutAlt } from 'react-icons/fa';

type MenuItemType = {
    key: string;
    label: string;
    isTitle?: boolean;
    icon?: IconType;
    url?: string;
    parentKey?: string;
    target?: HTMLAttributeAnchorTarget;
    children?: MenuItemType[];
    divider?: boolean;
    badge?: string;
    isMegaMenu?: boolean;
};

const INSTRUCTOR_MENU_ITEMS: MenuItemType[] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: BsUiChecksGrid,
        url: '/instructor/dashboard',
        parentKey: 'instructor',
    },
    {
        key: 'courses',
        label: 'My Courses',
        icon: BsBasket,
        url: '/instructor/manage-course',
        parentKey: 'instructor',
    },
    {
        key: 'quiz',
        label: 'Quiz',
        icon: BsQuestionDiamond,
        url: '/instructor/quiz',
        parentKey: 'instructor',
    },
    {
        key: 'earnings',
        label: 'Earnings',
        icon: BsGraphUp,
        url: '/instructor/earning',
        parentKey: 'instructor',
    },
    {
        key: 'students',
        label: 'Students',
        icon: BsPeople,
        url: '/instructor/student-list',
        parentKey: 'instructor',
    },
    {
        key: 'orders',
        label: 'Orders',
        icon: BsFolderCheck,
        url: '/instructor/order',
        parentKey: 'instructor',
    },
    {
        key: 'reviews',
        label: 'Reviews',
        icon: BsStar,
        url: '/instructor/review',
        parentKey: 'instructor',
    },
    {
        key: 'profile',
        label: 'Edit Profile',
        icon: BsPencilSquare,
        url: '/instructor/edit-profile',
        parentKey: 'instructor',
    },
    {
        key: 'payout',
        label: 'Payout',
        icon: BsWallet2,
        url: '/instructor/payout',
        parentKey: 'instructor',
    },
    {
        key: 'setting',
        label: 'Setting',
        icon: BsGear,
        url: '/instructor/setting',
        parentKey: 'instructor',
    },
    {
        key: 'delete',
        label: 'Delete Profile',
        icon: BsTrash,
        url: '/instructor/delete-account',
        parentKey: 'instructor',
    },
];

export default function VerticalMenu() {
    const { pathname } = useLocation();

    const { removeSession } = useAuthContext();
    return (
        <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
            <div className="list-group list-group-dark list-group-borderless">
                {INSTRUCTOR_MENU_ITEMS.map(({ label, url, icon }, idx) => {
                    const Icon = icon;
                    return (
                        <Link
                            className={clsx('list-group-item icons-center', { active: pathname === url })}
                            to={url || ''}
                            key={idx}
                        >
                            {Icon && <Icon className="me-2" />}
                            {label}
                        </Link>
                    );
                })}
                <Link
                    className="list-group-item text-danger bg-danger-soft-hover"
                    onClick={removeSession}
                    to="/auth/sign-in"
                >
                    <FaSignOutAlt className="fa-fw me-2" />
                    Sign Out
                </Link>
            </div>
        </div>
    );
}
