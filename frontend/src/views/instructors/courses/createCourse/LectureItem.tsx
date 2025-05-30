import DraggableItem from '@/components/draggable/DraggableItem';
import { ModuleItemProps, Lecture } from '../types';
import ItemTitle from '../components/ItemTitle';
import ItemActionButtons from '../components/ItemActionButtons';

type LectureItemProps = Pick<
    ModuleItemProps,
    'index' | 'isEditing' | 'toggleEditMode' | 'isDeleting' | 'toggleDeleteMode' | 'onUpdateItem' | 'onDeleteItem'
> & {
    lecture: Lecture;
    setItems: React.Dispatch<React.SetStateAction<Lecture[]>>;
};

const LectureItem: React.FC<LectureItemProps> = ({
    lecture,
    index,
    isEditing,
    isDeleting,
    toggleEditMode,
    toggleDeleteMode,
    onUpdateItem,
    setItems,
    onDeleteItem,
}) => {
    return (
        <>
            <DraggableItem item={lecture} itemClass={'__draggable-item-lightGrey'}>
                <ItemTitle<Lecture>
                    item={lecture}
                    index={index}
                    isEditing={isEditing}
                    toggleEditMode={toggleEditMode}
                    onUpdateItem={onUpdateItem}
                    setItems={setItems}
                />
                <ItemActionButtons<Lecture>
                    item={lecture}
                    isDeleting={isDeleting}
                    toggleDeleteMode={toggleDeleteMode}
                    onDeleteItem={onDeleteItem}
                    setItems={setItems}
                ></ItemActionButtons>
            </DraggableItem>
        </>
    );
};

export default LectureItem;
