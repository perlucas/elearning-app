import { developedBy, developedByLink } from '@/context/constants'

import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

import logoLight from '@/assets/images/logo-light.svg'

const Footer = () => {
  return (
    <footer className="bg-dark p-3">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <Link to="/">
              <img className="h-20px" width={94} height={20} src={logoLight} alt="logo" />
            </Link>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <div className="text-center text-white text-primary-hover">
              Copyrights ©2024 Eduport. Build by
              <Link to={developedByLink} target="_blank" className="text-white">
                {developedBy}
              </Link>
              .
            </div>
          </Col>
          <Col md={4}>
            <ul className="list-inline mb-0 text-center text-md-end">
              <li className="list-inline-item ms-2">
                <Link to="">
                  <FaFacebook className="text-white" />
                </Link>
              </li>
              <li className="list-inline-item ms-2">
                <Link to="">
                  <FaInstagram className="text-white" />
                </Link>
              </li>
              <li className="list-inline-item ms-2">
                <Link to="">
                  <FaLinkedinIn className="text-white" />
                </Link>
              </li>
              <li className="list-inline-item ms-2">
                <Link to="">
                  <FaTwitter className="text-white" />
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
