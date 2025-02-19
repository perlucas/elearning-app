import { STUDENT_MENU_ITEMS } from '@/assets/data/menu-items'
import Preloader from '@/components/Preloader'
import { useAuthContext } from '@/context/useAuthContext'
import useToggle from '@/hooks/useToggle'
import useViewPort from '@/hooks/useViewPort'
import { ChildrenType } from '@/types/component-props'
import clsx from 'clsx'
import { lazy, Suspense } from 'react'
import { Col, Collapse, Container, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Row } from 'react-bootstrap'
import { BsLock } from 'react-icons/bs'
import { FaSignOutAlt } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Banner = lazy(() => import('@/components/StudentLayoutComponents/Banner'))
const Footer = lazy(() => import('@/components/StudentLayoutComponents/Footer'))
const TopNavigationBar = lazy(() => import('@/components/StudentLayoutComponents/TopNavigationBar'))

const StudentLayout = ({ children }: ChildrenType) => {
  const { width } = useViewPort()

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

const VerticalMenu = () => {
  const { pathname } = useLocation()

  const { isTrue: isOpen, toggle } = useToggle()

  const { removeSession } = useAuthContext()

  return (
    <div className="bg-dark border rounded-3 pb-0 p-3 w-100">
      <div className="list-group list-group-dark list-group-borderless collapse-list">
        {STUDENT_MENU_ITEMS.map(({ label, url, icon }, idx) => {
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
        <a
          className="list-group-item"
          onClick={toggle}
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="collapseauthentication">
          <BsLock className="me-2" />
          Dropdown level
        </a>
        <Collapse in={isOpen} className="nav  flex-column" data-bs-parent="#navbar-sidebar">
          <ul>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dropdown item
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dropdown item
              </a>
            </li>
          </ul>
        </Collapse>
      </div>
    </div>
  )
}

export default StudentLayout
