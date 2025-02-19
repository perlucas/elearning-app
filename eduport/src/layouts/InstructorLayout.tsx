import { INSTRUCTOR_MENU_ITEMS } from '@/assets/data/menu-items'
import Preloader from '@/components/Preloader'
import { useAuthContext } from '@/context/useAuthContext'
import { useLayoutContext } from '@/context/useLayoutContext'
import useToggle from '@/hooks/useToggle'
import useViewPort from '@/hooks/useViewPort'
import { ChildrenType } from '@/types/component-props'
import clsx from 'clsx'
import { lazy, Suspense } from 'react'
import { Col, Container, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Row } from 'react-bootstrap'
import { FaSignOutAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Banner = lazy(() => import('@/components/InstructorLayoutComponents/Banner'))
const Footer = lazy(() => import('@/components/InstructorLayoutComponents/Footer'))
const TopNavigationBar = lazy(() => import('@/components/InstructorLayoutComponents/TopNavigationBar'))

const VerticalMenu = () => {
  const { pathname } = useLocation()

  const { removeSession } = useAuthContext()
  return (
    <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
      <div className="list-group list-group-dark list-group-borderless">
        {INSTRUCTOR_MENU_ITEMS.map(({ label, url, icon }, idx) => {
          const Icon = icon
          return (
            <Link className={clsx('list-group-item icons-center', { active: pathname === url })} to={url || ''} key={idx}>
              {Icon && <Icon className="me-2" />}
              {label}
            </Link>
          )
        })}
        <Link className="list-group-item text-danger bg-danger-soft-hover" onClick={removeSession} to="/auth/sign-in">
          <FaSignOutAlt className="fa-fw me-2" />
          Sign Out
        </Link>
      </div>
    </div>
  )
}

const InstructorLayout = ({ children }: ChildrenType) => {
  const { width } = useViewPort()
  const {} = useLayoutContext()
  const { isTrue: isOffCanvasMenuOpen, toggle: toggleOffCanvasMenu } = useToggle()

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
                      <OffcanvasTitle>My profile</OffcanvasTitle>
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
  )
}

export default InstructorLayout
