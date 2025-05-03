import { Col } from 'react-bootstrap';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import { CreateCourseContext, Item } from './context/CreateCourseContext';
import DraggableItem from '@/components/draggable/DraggableItem';
import useSafeContext from '@/hooks/useSafeContext';
import { useLayoutEffect, useRef, useState } from 'react';

interface ModuleItemProps {
    module: Item;
    index: number;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, index }) => {
    const { editingModuleId, setEditingModuleId, changeItemName } = useSafeContext(CreateCourseContext);
    const isEditing = editingModuleId === module.id;
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');

    useLayoutEffect(() => {
        if (isEditing && inputRef.current) {
            const newValue = module.title;
            setInputValue(newValue);
            requestAnimationFrame(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            });
        }
    }, [isEditing]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            changeItemName(module, inputValue);
        }
    };

    return (
        <DraggableItem item={module}>
            <Col className="d-flex align-items-center px-1 flex-grow-1">
                {isEditing ? (
                    <>
                        <span className="me-1">{index + 1}.</span>
                        <input
                            type="text"
                            className="w-100 __module-item-input"
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeydown}
                            onBlur={() => changeItemName(module, inputValue)}
                        />
                    </>
                ) : (
                    <span onDoubleClick={() => setEditingModuleId(module.id)}>{`${index + 1}. ${module.title}`}</span>
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
