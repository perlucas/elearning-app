import DraggableItem from '@/components/draggable/DraggableItem';
import ItemTitle from '../components/ItemTitle';
import ItemActionButtons from '../components/ItemActionButtons';
import { BsChevronDown, BsPlus } from 'react-icons/bs';
import { ModuleItemProps } from '../types';
//import DraggableZone from '@/components/draggable/DraggableZone';
import { Container } from 'react-bootstrap';

const ModuleItem: React.FC<ModuleItemProps> = ({
    module,
    index,
    editMode,
    onToggleEditMode,
    onUpdateModule,
    deleteMode,
    onToggleDeleteMode,
    onDelete,
    dropDownMode,
    onToggleDropDownMode,
}) => {
    return (
        <>
            <DraggableItem item={module}>
                <ItemTitle
                    item={module}
                    index={index}
                    editMode={editMode}
                    onToggleEditMode={onToggleEditMode}
                    onUpdateItem={onUpdateModule}
                />
                <ItemActionButtons
                    item={module}
                    deleteMode={deleteMode}
                    onToggleDeleteMode={onToggleDeleteMode}
                    onDelete={onDelete}
                >
                    {dropDownMode ? (
                        <BsChevronDown role="button" onClick={() => onToggleDropDownMode(module.id, false)} />
                    ) : (
                        <BsPlus role="button" onClick={() => onToggleDropDownMode(module.id, true)} />
                    )}
                </ItemActionButtons>
            </DraggableItem>
            {dropDownMode && <Container>Hola</Container>}
        </>
    );
};

export default ModuleItem;
