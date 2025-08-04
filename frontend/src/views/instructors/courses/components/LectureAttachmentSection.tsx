import { useUploadAttachment } from '@/hooks/useUploadAttachment';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Placeholder, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsPlusCircle } from 'react-icons/bs';
import { Lecture, LectureAttachmentSectionProps, Resource } from '../types';
import './LectureAttachmentSection.scss';
import LectureAttachmentItem from './LectureAttachmentItem';

const acceptedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/csv',
    'image/jpeg',
    'image/jpg',
    'image/png',
];

const maxFileSize = 1024 * 1024;
const maxAttachments = 3;

const LectureAttachmentSection = ({ lecture, module, updateLecture }: LectureAttachmentSectionProps) => {
    const { t } = useTranslation();
    const {
        progress,
        data: uploadedFileData,
        error: uploadError,
        uploadFile,
        reset: resetFileData,
    } = useUploadAttachment();
    const attachments = lecture?.resources ?? [];

    const [fileValidationError, setFileValidationError] = useState<string | null>(null);

    const combinedUploadError = fileValidationError || uploadError?.message;

    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    useEffect(() => {
        if (!uploadedFileData || !lecture || !module) return;
        const attachmentData = uploadedFileData;
        const updatedLecture: Lecture = {
            ...lecture,
            resources: [...(lecture.resources || []), attachmentData],
        };
        updateLecture(updatedLecture);
        resetFileData();
        fileInputRef.current && (fileInputRef.current.value = '');
    }, [uploadedFileData, lecture, module]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileValidationError(null);
        const file = e.target.files?.[0];
        if (file) {
            if (!acceptedTypes.includes(file.type)) {
                setFileValidationError(
                    t('views.instructors.courses.createCourse.editLecture.attachmentErrors.invalidType'),
                );
                return;
            }
            if (file.size > maxFileSize) {
                setFileValidationError(
                    t('views.instructors.courses.createCourse.editLecture.attachmentErrors.fileTooLarge'),
                );
                return;
            }
            if (attachments.length >= maxAttachments) {
                setFileValidationError(
                    t('views.instructors.courses.createCourse.editLecture.attachmentErrors.tooManyFiles'),
                );
                return;
            }
            uploadFile(file);
        }
    };

    const handleUpdateAttachment = (updatedItem: Resource) => {
        if (!lecture) return;
        const updatedResources = lecture.resources?.map((r) => (r.id === updatedItem.id ? updatedItem : r)) ?? [];
        updateLecture({ ...lecture, resources: updatedResources });
    };

    const handleDeleteAttachment = (itemId: string) => {
        if (!lecture) return;
        const updatedResources = lecture.resources?.filter((r) => r.id !== itemId) ?? [];
        updateLecture({ ...lecture, resources: updatedResources });
    };

    return (
        <section className="p-1 my-2">
            <div className="d-flex flex-row justify-content-between border-bottom mb-3 pb-2">
                <h3>{t('views.instructors.courses.createCourse.editLecture.attachments')}</h3>
            </div>
            <p className="text-black">{t('views.instructors.courses.createCourse.editLecture.attachmentsText')}</p>
            <div className="d-flex flex-row gap-2">
                <Button size="sm" className="d-flex align-items-center gap-2" onClick={openFilePicker}>
                    <BsPlusCircle />
                    {t('views.instructors.courses.createCourse.editLecture.uploadAttachment')}
                </Button>
            </div>
            <Container>
                {attachments.length > 0 &&
                    attachments.map((at, index) => (
                        <LectureAttachmentItem
                            key={at.id}
                            item={at}
                            index={index}
                            onUpdateItem={handleUpdateAttachment}
                            onDeleteItem={handleDeleteAttachment}
                        />
                    ))}
                {progress > 0 && progress < 1 && (
                    <Row className="px-2 py-2 my-2 g-0">
                        <Placeholder as={Col} animation="glow">
                            <Placeholder xs={12} size="lg" />
                        </Placeholder>
                    </Row>
                )}
                {combinedUploadError && (
                    <Row className="px-2 py-2 text-danger my-2 g-0">
                        <Col>{combinedUploadError}</Col>
                    </Row>
                )}
            </Container>
            <input
                type="file"
                accept=".pdf, .ppt, .pptx, .doc, .docx, .csv, .xls, .xlsx, .png, .jpeg, .jpg"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </section>
    );
};

export default LectureAttachmentSection;
