import { Col } from 'react-bootstrap';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import { CreateCourseContext, Module } from './context/CreateCourseContext';
import DraggableItem from '@/components/draggable/DraggableItem';
import useSafeContext from '@/hooks/useSafeContext';
import { useLayoutEffect, useRef, useState } from 'react';

interface ModuleItemProps {
    module: Module;
    index: number;
    editingModuleId: string;
    setEditingModuleId: React.Dispatch<React.SetStateAction<string>>;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, index, editingModuleId, setEditingModuleId }) => {
    const { updateModule } = useSafeContext(CreateCourseContext);
    const isEditing = editingModuleId === module.id;
    const inputRef = useRef<HTMLInputElement>(null);
    const [titleValue, setTitleValue] = useState('');

    useLayoutEffect(() => {
        if (isEditing && inputRef.current) {
            const newValue = module.title;
            setTitleValue(newValue);
            requestAnimationFrame(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            });
        }
    }, [isEditing]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateModule({ ...module, title: titleValue });
            setEditingModuleId('');
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
                            value={titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                            onKeyDown={handleKeydown}
                            onBlur={() => {
                                updateModule({ ...module, title: titleValue });
                                setEditingModuleId('');
                            }}
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
