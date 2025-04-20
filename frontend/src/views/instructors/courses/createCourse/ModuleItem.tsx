import { Col, Row } from 'react-bootstrap';
import { BsList, BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import { useSortable } from '@dnd-kit/sortable';
import { Module } from './context/CreateCourseContext';
import { getSortableStyle } from '@/utils/dndFunctions';

interface ModuleItemProps {
    module: Module;
    modules: Module[];
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, modules }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: module.id });

    const dndStyle = getSortableStyle(transform, transition);

    const index = modules.findIndex((m) => m.id === module.id);
    return (
        <Row
            className="d-flex align-items-center px-2 py-2 text-dark my-2 __module-item"
            ref={setNodeRef}
            style={dndStyle}
        >
            <Col xs="auto" className="px-1 __module-item-draggable" {...attributes} {...listeners}>
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
