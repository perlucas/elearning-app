import useScrollEvent from '@/hooks/useScrollEvent';
import clsx from 'clsx';
import { ReactNode, useRef } from 'react';

type Props = {
    className?: string;
    children?: ReactNode;
};

const TopNavbar = ({ children, className }: Props) => {
    const { scrollY } = useScrollEvent();
    const headerRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <header
                ref={headerRef}
                className={clsx('navbar-light navbar-sticky header-static', className, {
                    'navbar-sticky-on': scrollY >= 400, // show a sticky navbar style, TODO: fix issue when scrolling slow
                })}
            >
                <nav className="navbar navbar-expand-xl">{children}</nav>
            </header>

            {/* TODO: check if this div is currently necessary */}
            <div
                style={{
                    height: scrollY >= 400 ? `${headerRef.current?.offsetHeight}px` : 0,
                }}
            />
        </>
    );
};

export default TopNavbar;
