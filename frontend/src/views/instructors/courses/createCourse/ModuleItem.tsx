import { Col, FormControl } from 'react-bootstrap';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import { CreateCourseContext, Item } from './context/CreateCourseContext';
import DraggableItem from '@/components/draggable/DraggableItem';
import useSafeContext from '@/hooks/useSafeContext';
import { useEffect, useRef, useState } from 'react';

interface ModuleItemProps {
    module: Item;
    index: number;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, index }) => {
    const { editingModuleId, setEditingModuleId, tempModules, changeItemName } = useSafeContext(CreateCourseContext);
    const isEditing = editingModuleId === module.id;
    const inputRef = useRef<HTMLInputElement>(null);
    const tempModule = tempModules.find((m) => m.id === module.id);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            setInputValue(tempModule?.title ?? module.title);
        }
    }, [isEditing]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeItemName(module, inputValue);
        }
    };

    return (
        <DraggableItem item={module}>
            <Col className="px-1">
                {isEditing ? (
                    <FormControl
                        type="text"
                        style={{ height: '1.8rem' }}
                        className="__form-input"
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeydown}
                        onBlur={() => changeItemName(module, inputValue)}
                    />
                ) : (
                    <span
                        onDoubleClick={() => setEditingModuleId(module.id)}
                    >{`${index + 1}. ${tempModule ? tempModule.title : module.title}`}</span>
                )}
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
