import React, { ReactNode } from 'react';
import { Button, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { ModuleItemProps, Module, Lecture } from '../types';

type ItemActionButtonsProps<T extends Module | Lecture> = Pick<
    ModuleItemProps,
    'isDeleting' | 'toggleDeleteMode' | 'onDeleteItem'
> & {
    children?: ReactNode;
    item: T;
    setItems: React.Dispatch<React.SetStateAction<T[]>>;
};

const ItemActionButtons = <T extends Module | Lecture>({
    item,
    isDeleting,
    toggleDeleteMode,
    onDeleteItem,
    children,
    setItems,
}: ItemActionButtonsProps<T>) => {
    const { t } = useTranslation();
    return (
        <>
            <Col xs="auto" className="d-flex gap-3 px-1 ">
                {isDeleting ? (
                    <>
                        <div className="__module-item-deleteButton">
                            <Button
                                size="sm"
                                variant="link"
                                className="p-0 m-0"
                                onClick={() => onDeleteItem(item.id, setItems)}
                            >
                                {t('views.common.delete')}
                            </Button>
                        </div>
                        <div className="__module-item-cancelButton" onClick={() => toggleDeleteMode(item.id, false)}>
                            <Button size="sm" variant="link" className="p-0 m-0">
                                {t('views.common.cancel')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <BsPencilSquare role="button" />
                        <BsTrash role="button" onClick={() => toggleDeleteMode(item.id, true)} />
                        {children}
                    </>
                )}
            </Col>
        </>
    );
};

export default ItemActionButtons;
