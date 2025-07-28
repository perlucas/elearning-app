import ItemTitle from './ItemTitle';
import { Row } from 'react-bootstrap';
import { ItemTitleProps, Resources } from '../types';
import { useState } from 'react';

type LectureAttachmentItemProps = Pick<ItemTitleProps<Resources>, 'item' | 'index' | 'onUpdateItem'>;

const LectureAttachmentItem = ({ item, index, onUpdateItem }: LectureAttachmentItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    return (
        <Row className="d-flex align-items-center px-2 py-2 text-dark my-2 g-0 __item-row">
            <ItemTitle
                item={item}
                index={index}
                isEditing={isEditing}
                toggleEditMode={setIsEditing}
                onUpdateItem={onUpdateItem}
            />
        </Row>
    );
};

export default LectureAttachmentItem;
