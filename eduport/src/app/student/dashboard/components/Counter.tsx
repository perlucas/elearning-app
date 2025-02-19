import { CounterType } from '@/types/other'
import { Col, Row } from 'react-bootstrap'
import CountUp from 'react-countup'
import { counterData } from '../data'

const CounterCard = ({ count, title, icon: Icon, suffix, variant }: CounterType) => {
  return (
    <div className={`d-flex justify-content-center align-items-center p-4 bg-${variant} bg-opacity-15 rounded-3`}>
      <span className={`display-6 text-${variant}   mb-0`}>{Icon && <Icon size={56} className="fa-fw" />}</span>
      <div className="ms-4">
        <div className="d-flex">
          <h5 className="purecounter mb-0 fw-bold">
            <CountUp suffix={suffix} end={count} delay={2} />
          </h5>
        </div>
        <span className="mb-0 h6 fw-light">{title}</span>
      </div>
    </div>
  )
}

const Counter = () => {
  return (
    <Row className="mb-4">
      {counterData.map((item, idx) => (
        <Col sm={6} lg={4} className="mb-3" key={idx}>
          <CounterCard {...item} />
        </Col>
      ))}
    </Row>
  )
}

export default Counter
