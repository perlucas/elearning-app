import { Button, Col } from 'react-bootstrap';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import { CreateCourseContext, Item } from './context/CreateCourseContext';
import DraggableItem from '@/components/draggable/DraggableItem';
import useSafeContext from '@/hooks/useSafeContext';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ModuleItemProps {
    module: Item;
    index: number;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ module, index }) => {
    const {
        editingModuleId,
        setEditingModuleId,
        changeItemName,
        deletingModuleId,
        setDeletingModuleId,
        handleTrashButton,
        handleDeleteButton,
    } = useSafeContext(CreateCourseContext);
    const isEditing = editingModuleId === module.id;
    const isDeleting = deletingModuleId === module.id;
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const { t } = useTranslation();

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

            <Col xs="auto" className="d-flex gap-3 px-1 ">
                {isDeleting ? (
                    <>
                        <div className="__module-item-deleteButton">
                            <Button
                                size="sm"
                                variant="link"
                                className="p-0 m-0"
                                onClick={() => handleDeleteButton(module.id)}
                            >
                                {t('views.instructors.courses.createCourse.moduleItem.delete').toUpperCase()}
                            </Button>
                        </div>
                        <div className="__module-item-cancelButton" onClick={() => setDeletingModuleId('')}>
                            <Button size="sm" variant="link" className="p-0 m-0">
                                {t('views.instructors.courses.createCourse.moduleItem.cancel').toUpperCase()}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <BsPencilSquare role="button" />
                        <BsTrash role="button" onClick={() => handleTrashButton(module.id)} />
                        <BsPlus role="button" />
                    </>
                )}
            </Col>
        </DraggableItem>
    );
};

export default ModuleItem;
