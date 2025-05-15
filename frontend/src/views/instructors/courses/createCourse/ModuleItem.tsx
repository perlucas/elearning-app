import { Button, Col } from 'react-bootstrap';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import DraggableItem from '@/components/draggable/DraggableItem';
import { useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Module {
    id: string;
    title: string;
}

interface ModuleItemProps {
    module: Module;
    index: number;
    isEditing: boolean;
    toggleEditMode: (moduleId: string, isEditing: boolean) => void;
    onUpdateModule: (updateModule: Module) => void;
    isDeleting: boolean;
    toggleDeleteMode: (moduleId: string, isEditing: boolean) => void;
    onDeleteModule: (id: string) => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({
    module,
    index,
    isEditing,
    toggleEditMode,
    onUpdateModule,
    isDeleting,
    toggleDeleteMode,
    onDeleteModule,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [titleValue, setTitleValue] = useState('');
    const { t } = useTranslation();

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
            onUpdateModule({ ...module, title: titleValue });
            toggleEditMode(module.id, false);
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
                                onUpdateModule({ ...module, title: titleValue });
                                toggleEditMode(module.id, false);
                            }}
                        />
                    </>
                ) : (
                    <span onDoubleClick={() => toggleEditMode(module.id, true)}>{`${index + 1}. ${module.title}`}</span>
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
                                onClick={() => onDeleteModule(module.id)}
                            >
                                {t('views.common.delete')}
                            </Button>
                        </div>
                        <div className="__module-item-cancelButton">
                            <Button
                                size="sm"
                                variant="link"
                                className="p-0 m-0"
                                onClick={() => toggleDeleteMode(module.id, false)}
                            >
                                {t('views.common.cancel')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <BsPencilSquare role="button" />
                        <BsTrash role="button" onClick={() => toggleDeleteMode(module.id, true)} />
                        <BsPlus role="button" />
                    </>
                )}
            </Col>
        </DraggableItem>
    );
};

export default ModuleItem;
