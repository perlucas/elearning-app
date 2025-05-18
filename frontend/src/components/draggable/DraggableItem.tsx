import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Col, Row } from 'react-bootstrap';
import { BsList } from 'react-icons/bs';
import './_draggableItem.scss';
import { Item } from './types';

interface Props {
    item: Item;
    children: React.ReactNode;
    itemClass: String;
}

const DraggableItem = ({ item, children, itemClass }: Props) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
    const dndStyle = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
    };

    const classes = `d-flex align-items-center px-2 py-2 text-dark my-2 g-0 ${itemClass}`;
    return (
        <Row className={classes} ref={setNodeRef} style={{ height: '2.8rem', ...dndStyle }}>
            <Col xs="auto" className="px-1 __draggable-selection" {...attributes} {...listeners}>
                <BsList />
            </Col>
            {children}
        </Row>
    );
};

export default DraggableItem;
