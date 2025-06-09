import DraggableItem from '@/components/draggable/DraggableItem';
import { ModuleItemProps, Lecture } from '../types';
import ItemTitle from '../components/ItemTitle';
import ItemActionButtons from '../components/ItemActionButtons';
import { useEffect, useState } from 'react';

type LectureItemProps = Pick<ModuleItemProps, 'index' | 'onUpdateItem' | 'onDeleteItem' | 'setEditingViewItem'> & {
    lecture: Lecture;
    setLectures: React.Dispatch<React.SetStateAction<Lecture[]>>;
    isNewLecture?: boolean;
};

const LectureItem: React.FC<LectureItemProps> = ({
    lecture,
    index,
    onUpdateItem,
    setLectures,
    onDeleteItem,
    setEditingViewItem,
    isNewLecture,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (isNewLecture) {
            setIsEditing(true);
        }
    }, [isNewLecture]);

    return (
        <>
            <DraggableItem item={lecture} itemClass={'__draggable-item-lightGrey'}>
                <ItemTitle<Lecture>
                    item={lecture}
                    index={index}
                    isEditing={isEditing}
                    toggleEditMode={setIsEditing}
                    onUpdateItem={(updatedItem) => onUpdateItem(updatedItem, setLectures)}
                />
                <ItemActionButtons<Lecture>
                    item={lecture}
                    itemType="lecture"
                    isDeleting={isDeleting}
                    toggleDeleteMode={setIsDeleting}
                    onDeleteItem={(itemId) => onDeleteItem(itemId, setLectures)}
                    setEditingViewItem={setEditingViewItem}
                ></ItemActionButtons>
            </DraggableItem>
        </>
    );
};

export default LectureItem;
