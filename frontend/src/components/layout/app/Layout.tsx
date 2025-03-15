import { ReactNode, Suspense } from 'react';
import { Container, Row, Col, Offcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody } from 'react-bootstrap';
import TopNavigationBar from './TopNavigationBar';
import Banner from './Banner';
import VerticalMenu from './VerticalMenu';
import useToggle from '@/hooks/useToggle';
import Preloader from '@/components/Preloader';
import Footer from './Footer';
import useViewPort from '@/hooks/useViewPort';

export default function Layout({ children }: { children: ReactNode }) {
    const { width } = useViewPort();
    const { isTrue: isOffCanvasMenuOpen, toggle: toggleOffCanvasMenu } = useToggle();

    return (
        <>
            <Suspense>
                <TopNavigationBar />
            </Suspense>
            <main>
                <Banner toggleOffCanvas={toggleOffCanvasMenu} />
                <section className="pt-0">
                    <Container>
                        <Row>
                            <Col xl={3}>
                                {width >= 1200 ? (
                                    <VerticalMenu />
                                ) : (
                                    <Offcanvas show={isOffCanvasMenuOpen} placement="end" onHide={toggleOffCanvasMenu}>
                                        <OffcanvasHeader className="bg-light" closeButton>
                                            <OffcanvasTitle>Menu</OffcanvasTitle>
                                        </OffcanvasHeader>
                                        <OffcanvasBody className="p-3 p-xl-0">
                                            <VerticalMenu />
                                        </OffcanvasBody>
                                    </Offcanvas>
                                )}
                            </Col>
                            <Col xl={9}>
                                <Suspense fallback={<Preloader />}>{children}</Suspense>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </main>

            <Suspense>
                <Footer />
            </Suspense>
        </>
    );
}
