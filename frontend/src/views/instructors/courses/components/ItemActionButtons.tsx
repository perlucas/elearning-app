import { Button, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import { ItemActionButtonsProps, Module, Lecture } from '../types';

const ItemActionButtons = <T extends Module | Lecture>({
    item,
    itemType,
    isDeleting,
    toggleDeleteMode,
    onDeleteItem,
    children,
    setEditingViewItem,
}: ItemActionButtonsProps<T>) => {
    const { t } = useTranslation();
    return (
        <>
            <Col xs="auto" className="d-flex gap-3 px-1 ">
                {isDeleting ? (
                    <>
                        <div className="__module-item-deleteButton">
                            <Button size="sm" variant="link" className="p-0 m-0" onClick={() => onDeleteItem(item.id)}>
                                {t('views.common.delete')}
                            </Button>
                        </div>
                        <div className="__module-item-cancelButton" onClick={() => toggleDeleteMode(false)}>
                            <Button size="sm" variant="link" className="p-0 m-0">
                                {t('views.common.cancel')}
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <BsPencilSquare
                            role="button"
                            onClick={() => setEditingViewItem({ id: item.id, type: itemType })}
                        />
                        <BsTrash role="button" onClick={() => toggleDeleteMode(true)} />
                        {children}
                    </>
                )}
            </Col>
        </>
    );
};

export default ItemActionButtons;
