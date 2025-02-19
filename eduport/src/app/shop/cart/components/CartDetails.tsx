import { getAllCourses } from '@/helpers/data'
import { useFetchData } from '@/hooks/useFetchData'
import useToggle from '@/hooks/useToggle'
import { CourseType } from '@/types/other'
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { BsXLg } from 'react-icons/bs'
import { FaRegEdit, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CartCard = ({ image, title, price }: CourseType) => {
  return (
    <tr>
      <td>
        <div className="d-lg-flex align-items-center">
          <div className="w-100px w-md-80px mb-2 mb-md-0">
            <img src={image} className="rounded" alt="courseImage" />
          </div>
          <h6 className="mb-0 ms-lg-3 mt-2 mt-lg-0">
            <a href="#">{title}</a>
          </h6>
        </div>
      </td>
      <td className="text-center">
        <h5 className="text-success mb-0">${price}</h5>
      </td>
      <td>
        <Button variant="success-soft" size="sm" className="px-2 me-1 mb-1 mb-md-0">
          <FaRegEdit size={15} />
        </Button>
        <button className="btn btn-sm btn-danger-soft px-2 mb-0">
          <FaTimes size={14} />
        </button>
      </td>
    </tr>
  )
}

const CartDetails = () => {
  const cartData = useFetchData(getAllCourses)

  const { isTrue, toggle } = useToggle(true)

  return (
    <section className="pt-5">
      <Container>
        <Row className="g-4 g-sm-5">
          <Col lg={8} className="mb-4 mb-sm-0">
            <Card className="card-body p-4 shadow">
              <Alert
                show={isTrue}
                onClose={toggle}
                className="alert alert-danger alert-dismissible d-flex justify-content-between align-items-center fade show py-3 pe-2"
                role="alert">
                <div>
                  <span className="fs-5 me-1">🔥</span>
                  These courses are at a limited discount, please checkout within<strong className="text-danger ms-1">2 days and 18 hours</strong>
                </div>
                <button
                  type="button"
                  onClick={toggle}
                  className="btn btn-link mb-0 text-primary-hover text-end"
                  data-bs-dismiss="alert"
                  aria-label="Close">
                  <BsXLg></BsXLg>
                </button>
              </Alert>
              <div className="table-responsive border-0 rounded-3">
                <table className="table align-middle p-4 mb-0">
                  <tbody className="border-top-0">{cartData?.slice(0, 2).map((item, idx) => <CartCard key={idx} {...item} />)}</tbody>
                </table>
              </div>
              <Row className="g-3 mt-2">
                <Col md={6}>
                  <div className="input-group">
                    <input className="form-control form-control " placeholder="COUPON CODE" />
                    <button type="button" className="btn btn-primary">
                      Apply coupon
                    </button>
                  </div>
                </Col>
                <Col md={6} className="text-md-end">
                  <button className="btn btn-primary mb-0" disabled>
                    Update cart
                  </button>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="card-body p-4 shadow">
              <h4 className="mb-3">Cart Total</h4>
              <ul className="list-group list-group-borderless mb-2">
                <li className="list-group-item px-0 d-flex justify-content-between">
                  <span className="h6 fw-light mb-0">Original Price</span>
                  <span className="h6 fw-light mb-0 fw-bold">$500</span>
                </li>
                <li className="list-group-item px-0 d-flex justify-content-between">
                  <span className="h6 fw-light mb-0">Coupon Discount</span>
                  <span className="text-danger">-$20</span>
                </li>
                <li className="list-group-item px-0 d-flex justify-content-between">
                  <span className="h5 mb-0">Total</span>
                  <span className="h5 mb-0">$480</span>
                </li>
              </ul>
              <div className="d-grid">
                <Link to="/shop/checkout" className="btn btn-lg btn-success">
                  Proceed to Checkout
                </Link>
              </div>
              <p className="small mb-0 mt-2 text-center">
                By completing your purchase, you agree to these
                <a href="#">
                  <strong>Terms of Service</strong>
                </a>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default CartDetails
