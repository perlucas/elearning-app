import { ReactNode } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

type ConfirmModalProps = {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    children: ReactNode;
};

const ConfirmModal = ({ show, onClose, onConfirm, children }: ConfirmModalProps) => {
    const { t } = useTranslation();
    return (
        <Modal show={show} onHide={onClose} centered>
            <ModalHeader closeButton>
                <ModalTitle>{t('views.common.areYouSure')}</ModalTitle>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={onClose} style={{ textTransform: 'uppercase' }}>
                    {t('views.common.cancel')}
                </Button>
                <Button variant="danger" onClick={onConfirm} style={{ textTransform: 'uppercase' }}>
                    {t('views.common.continue')}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmModal;
