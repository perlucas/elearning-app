import PageMetaData from '@/components/PageMetaData'
import { Col, Row } from 'react-bootstrap'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import SignIn from './components/SignIn'

const SignInPage = () => {
  return (
    <>
      <PageMetaData title="Sign-In" />
      <AuthLayout>
        <Col xs={12} lg={6} className="m-auto">
          <Row className="my-5">
            <Col sm={10} xl={8} className="m-auto">
              <span className="mb-0 fs-1">👋</span>
              <h1 className="fs-2">Login into Eduport!</h1>
              <p className="lead mb-4">Nice to see you! Please log in with your account.</p>
              <SignIn />
              <Row>
                <div className="position-relative my-4">
                  <hr />
                  <p className="small position-absolute top-50 start-50 translate-middle bg-body px-5">Or</p>
                </div>
                <Col xxl={6} className="d-grid">
                  <a href="#" className="btn bg-google mb-2 mb-xxl-0">
                    <FaGoogle className="text-white me-2" />
                    Login with Google
                  </a>
                </Col>
                <Col xxl={6} className="d-grid">
                  <a href="#" className="btn bg-facebook mb-0">
                    <FaFacebookF className="me-2" />
                    Login with Facebook
                  </a>
                </Col>
              </Row>
              <div className="mt-4 text-center">
                <span>
                  Don&apos;t have an account? <Link to="/auth/sign-up">Signup here</Link>
                </span>
              </div>
            </Col>
          </Row>
        </Col>
      </AuthLayout>
    </>
  )
}

export default SignInPage
