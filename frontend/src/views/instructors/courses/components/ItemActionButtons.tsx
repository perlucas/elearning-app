import React, { ReactNode } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

interface Item {
    id: string;
    title: string;
}

interface ItemActionButtonsProps {
    item: Item;
    deleteMode: boolean;
    onToggleDeleteMode: (moduleId: string, editMode: boolean) => void;
    onDelete: (id: string) => void;
    children?: ReactNode;
}

const ItemActionButtons: React.FC<ItemActionButtonsProps> = ({
    item,
    deleteMode,
    onToggleDeleteMode,
    onDelete,
    children,
}) => {
    const { t } = useTranslation();
    return (
        <>
            <Col xs="auto" className="d-flex gap-3 px-1 ">
                {deleteMode ? (
                    <>
                        <div className="__module-item-deleteButton">
                            <Button size="sm" variant="link" className="p-0 m-0" onClick={() => onDelete(item.id)}>
                                {t('views.common.delete')}
                            </Button>
                        </div>
                        <div className="__module-item-cancelButton" onClick={() => onToggleDeleteMode(item.id, false)}>
                            <Button size="sm" variant="link" className="p-0 m-0">
                                {t('views.common.cancel')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <BsPencilSquare role="button" />
                        <BsTrash role="button" onClick={() => onToggleDeleteMode(item.id, true)} />
                        {children}
                    </>
                )}
            </Col>
        </>
    );
};

export default ItemActionButtons;
