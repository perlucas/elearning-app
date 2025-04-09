import { Col, Row } from 'react-bootstrap';
import { BsList, BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';

export interface Module {
    title: string;
}

interface ModuleItemProps {
    module: Module;
    index: number;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, index }) => {
    return (
        <Row className="bg-secondary d-flex align-items-center g-0 px-2 py-2 text-dark my-2">
            <Col xs="auto" className="px-1">
                <BsList />
            </Col>
            <Col className="px-1">
                <span>{`${index + 1}. ${module.title}`}</span>
            </Col>
            <Col xs="auto" className="d-flex gap-3 px-1">
                <BsPencilSquare role="button" />
                <BsTrash role="button" />
                <BsPlus role="button" />
            </Col>
        </Row>
    );
};

export default ModuleItem;
