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
    const inputRef = useRef<HTMLInputElement>(null);
    const [titleValue, setTitleValue] = useState('');
    const { t } = useTranslation();

    useLayoutEffect(() => {
        if (editMode && inputRef.current) {
            const newValue = module.title;
            setTitleValue(newValue);
            requestAnimationFrame(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            });
        }
    }, [editMode]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onUpdateModule({ ...module, title: titleValue });
            onToggleEditMode(module.id, false);
        }
    };

    return (
        <DraggableItem item={module}>
            <Col className="d-flex align-items-center px-1 flex-grow-1">
                {editMode ? (
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
                                onToggleEditMode(module.id, false);
                            }}
                        />
                    </>
                ) : (
                    <span
                        onDoubleClick={() => onToggleEditMode(module.id, true)}
                    >{`${index + 1}. ${module.title}`}</span>
                )}
            </Col>

            <Col xs="auto" className="d-flex gap-3 px-1 ">
                {deleteMode ? (
                    <>
                        <div className="__module-item-deleteButton">
                            <Button size="sm" variant="link" className="p-0 m-0" onClick={() => onDelete(module.id)}>
                                {t('views.common.delete')}
                            </Button>
                        </div>
                        <div
                            className="__module-item-cancelButton"
                            onClick={() => onToggleDeleteMode(module.id, false)}
                        >
                            <Button size="sm" variant="link" className="p-0 m-0">
                                {t('views.common.cancel')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <BsPencilSquare role="button" />
                        <BsTrash role="button" onClick={() => onToggleDeleteMode(module.id, true)} />
                        <BsPlus role="button" />
                    </>
                )}
            </Col>
        </DraggableItem>
    );
};

export default ModuleItem;
