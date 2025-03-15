import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import { BsGear, BsInfoCircle, BsPerson, BsPower } from 'react-icons/bs';
import { Link } from 'react-router';
import avatar from '@/assets/images/avatar-01.jpg';

const ProfileDropdown = ({ className }: { className: string }) => {
    const removeSession = () => {
        // dummy placeholder
    };

    return (
        <Dropdown drop="start" className={className}>
            <DropdownToggle
                as="a"
                className="avatar avatar-sm p-0 arrow-none"
                id="profileDropdown"
                role="button"
                data-bs-auto-close="outside"
                data-bs-display="static"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <img className="avatar-img rounded-circle" src={avatar} alt="avatar" />
            </DropdownToggle>
            <DropdownMenu
                as="ul"
                className="dropdown-animation dropdown-menu-end shadow pt-3"
                aria-labelledby="profileDropdown"
            >
                <li className="px-3 mb-3">
                    <div className="d-flex align-items-center">
                        <div className="avatar me-3">
                            <img className="avatar-img rounded-circle shadow" src={avatar} alt="avatar" />
                        </div>
                        <div>
                            <a className="h6" href="#">
                                Lori Ferguson
                            </a>
                            <p className="small m-0">example@gmail.com</p>
                        </div>
                    </div>
                </li>
                <li>
                    <DropdownDivider />
                </li>
                <li>
                    <DropdownItem href="/instructor/edit-profile">
                        <BsPerson className="fa-fw me-2" />
                        Edit Profile
                    </DropdownItem>
                </li>
                <li>
                    <DropdownItem href="/admin/admin-settings">
                        <BsGear className="fa-fw me-2" />
                        Account Settings
                    </DropdownItem>
                </li>
                <li>
                    <DropdownItem href="/help/center">
                        <BsInfoCircle className="fa-fw me-2" />
                        Help
                    </DropdownItem>
                </li>
                <li>
                    <Link className="dropdown-item bg-danger-soft-hover" onClick={removeSession} to="/auth/sign-in">
                        <BsPower className="fa-fw me-2" />
                        Sign Out
                    </Link>
                </li>
            </DropdownMenu>
        </Dropdown>
    );
};

export default ProfileDropdown;
