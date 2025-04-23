import { Col } from 'react-bootstrap';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import { Module } from './context/CreateCourseContext';
import DraggableItem from '@/components/draggable/DraggableItem';

interface ModuleItemProps {
    module: Module;
    index: number;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, index }) => {
    return (
        <DraggableItem item={module}>
            <Col className="px-1">
                <span>{`${index + 1}. ${module.title}`}</span>
            </Col>
            <Col xs="auto" className="d-flex gap-3 px-1">
                <BsPencilSquare role="button" />
                <BsTrash role="button" />
                <BsPlus role="button" />
            </Col>
        </DraggableItem>
    );
};

export default ModuleItem;
