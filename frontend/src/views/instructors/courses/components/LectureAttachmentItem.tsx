import ItemTitle from './ItemTitle';
import { Row } from 'react-bootstrap';
import { ItemTitleProps, ItemActionButtonsProps, Resource } from '../types';
import { useState } from 'react';
import { BsDownload } from 'react-icons/bs';
import ItemActionButtons from './ItemActionButtons';

type LectureAttachmentItemProps = Pick<ItemTitleProps<Resource>, 'item' | 'index' | 'onUpdateItem'> &
    Pick<ItemActionButtonsProps<Resource>, 'onDeleteItem'>;

const LectureAttachmentItem = ({ item, index, onUpdateItem, onDeleteItem }: LectureAttachmentItemProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <Row className="d-flex align-items-center px-2 py-2 text-dark my-2 g-0 __item-row">
            <ItemTitle<Resource>
                item={item}
                index={index}
                isEditing={isEditing}
                toggleEditMode={setIsEditing}
                onUpdateItem={onUpdateItem}
            />
            <ItemActionButtons<Resource>
                item={item}
                isDeleting={isDeleting}
                toggleDeleteMode={setIsDeleting}
                onDeleteItem={onDeleteItem}
                onEditAction={() => setIsEditing(true)}
            >
                <a
                    href={item.url}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center' }}
                >
                    <BsDownload role="button" />
                </a>
            </ItemActionButtons>
        </Row>
    );
};

export default LectureAttachmentItem;
