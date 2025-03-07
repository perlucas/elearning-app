import logo from '@/assets/images/logo.svg';
import { Link } from 'react-router';

const LogoBox = ({ height, width }: { height?: number; width?: number }) => {
    return (
        <Link className="navbar-brand" to="/">
            <img
                height={height}
                width={width}
                className="light-mode-item navbar-brand-item w-auto"
                src={logo}
                alt="logo"
            />
        </Link>
    );
};

export default LogoBox;
