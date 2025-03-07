import TopNavbar from '@/components/layout/app/TopNavbar';
import LogoBox from '@/components/layout/app/TopNavbar/components/LogoBox';
import Search from '@/components/layout/app/TopNavbar/components/Search';
import ProfileDropdown from '@/components/layout/app/TopNavbar/components/ProfileDropdown';
import { Container } from 'react-bootstrap';

const TopNavigationBar = () => {
    return (
        <TopNavbar>
            <Container>
                <LogoBox height={36} width={143} />
                <Search />
                <ProfileDropdown className="ms-1 ms-lg-0" />
            </Container>
        </TopNavbar>
    );
};

export default TopNavigationBar;
