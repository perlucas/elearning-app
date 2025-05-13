import DraggableItem from '@/components/draggable/DraggableItem';
import ItemTitle from '../components/ItemTitle';
import ItemActionButtons from '../components/ItemActionButtons';
import { BsPlus } from 'react-icons/bs';

interface Module {
    id: string;
    title: string;
}

interface ModuleItemProps {
    module: Module;
    index: number;
    editMode: boolean;
    onToggleEditMode: (moduleId: string, editMode: boolean) => void;
    onUpdateModule: (updateModule: Module) => void;
    deleteMode: boolean;
    onToggleDeleteMode: (moduleId: string, editMode: boolean) => void;
    onDelete: (id: string) => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
    module,
    index,
    editMode,
    onToggleEditMode,
    onUpdateModule,
    deleteMode,
    onToggleDeleteMode,
    onDelete,
}) => {
    return (
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
                <BsPlus role="button" />
            </ItemActionButtons>
        </DraggableItem>
    );
};

export default ModuleItem;
