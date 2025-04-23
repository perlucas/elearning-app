import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Col, Row } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import './_draggableItem.scss';

interface Item {
    id: string;
    title: string;
}

interface Props {
    item: Item;
    children: React.ReactNode;
}

const DraggableItem = ({ item, children }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const dndStyle = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
    };
    return (
        <Row
            className="d-flex align-items-center px-2 py-2 text-dark my-2 __module-item"
            ref={setNodeRef}
            style={dndStyle}
        >
            <Col xs="auto" className="px-1 __module-item-draggable" {...attributes} {...listeners}>
                <BsList />
            </Col>
            {children}
        </Row>
    );
};

export default DraggableItem;
