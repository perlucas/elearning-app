import React, { useEffect, useRef, useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import VideoLectureContent from './VideoLectureContent';
import RichTextEditor from './RichTextEditor';
import ConfirmModal from './ConfirmModal';
import { useTranslation } from 'react-i18next';
import { useUploadFile } from '@/hooks/useUploadFile';
import { LectureType, Lecture, Module } from '../types';

type LectureContentSectionProps = {
    lecture: Lecture | null;
    module: Module | null;
    updateLecture: (updatedLecture: Lecture) => void;
};

const LectureContentSection = ({ lecture, module, updateLecture }: LectureContentSectionProps) => {
    const { t } = useTranslation();
    const { progress, data: uploadedFileData, error: uploadError, uploadFile, reset: resetFileData } = useUploadFile();
    const [fileValidationError, setFileValidationError] = useState<Error | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [textContent, setTextContent] = useState<string>('');
    const [isTextEmpty, setIsTextEmpty] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [pendingLectureType, setPendingLectureType] = useState<LectureType | null>(null);
    const [lectureType, setLectureType] = useState<LectureType>(lecture?.type ?? LectureType.VIDEO);

    const combinedUploadError = fileValidationError || uploadError;
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const newTextContent = lecture?.content?.text?.content ?? '';
        setTextContent(newTextContent);
        setIsTextEmpty(!newTextContent || newTextContent.trim() === '' || newTextContent === '<p><br></p>');
    }, [lecture]);

    const handleSelectLectureType = (eventKey: string | null) => {
        const selectedType = eventKey as LectureType;
        if ((lecture?.type ?? lectureType) === selectedType) return;
        const hasVideo = Boolean(currentVideoFile);
        const hasText = Boolean(currentText?.content && currentText.content.trim() !== '');
        if ((selectedType === LectureType.TEXT && hasVideo) || (selectedType === LectureType.VIDEO && hasText)) {
            setPendingLectureType(selectedType);
            setShowModal(true);
        } else {
            setLectureType(selectedType);
        }
    };

    const handleCloseModal = () => {
        setPendingLectureType(null);
        setShowModal(false);
    };

    const handleConfirmModal = () => {
        currentVideoFile && handleDeleteVideo();
        currentText && setTextContent('');
        pendingLectureType && setLectureType(pendingLectureType);
        handleCloseModal();
    };

    //Lecture type VIDEO

    useEffect(() => {
        if (!uploadedFileData || !lecture || !module) return;
        const videoData = uploadedFileData;
        const updatedLecture: Lecture = {
            ...lecture,
            type: LectureType.VIDEO,
            content: { ...lecture.content, video: videoData },
        };
        updateLecture(updatedLecture);
        resetFileData();
        fileInputRef.current && (fileInputRef.current.value = '');
    }, [uploadedFileData, lecture, module]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileValidationError(null);
        if (file) {
            if (file.type !== 'video/mp4') {
                const errorMessage = t('views.instructors.courses.createCourse.editLecture.videoFormatError');
                setFileValidationError(new Error(errorMessage));
                fileInputRef.current && (fileInputRef.current.value = '');
                return;
            }
            uploadFile(file);
        }
    };

    const handleDeleteVideo = () => {
        if (currentVideoFile && lecture) {
            const videoToDelete = currentVideoFile.id;
            const updatedLect = { ...lecture, type: undefined, content: { ...lecture.content, video: undefined } };
            updateLecture(updatedLect);
            setIsDeleting(false);
            resetFileData();
            fileInputRef.current && (fileInputRef.current.value = '');
            new Promise((resolve) => setTimeout(resolve, 500))
                .then(() => {
                    console.log('Solicitud de eliminación para el video ' + videoToDelete);
                })
                .catch((err) => {
                    console.error(err.message);
                });
        }
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const currentVideoFile = lecture?.content?.video;

    //Lecture type TEXT

    useEffect(() => {
        if (!lecture || !module) return;
        const currentTextContent = lecture.content?.text?.content ?? '';
        const hasContentChanged = currentTextContent !== textContent;
        const hasEmptyStateChanged =
            (isTextEmpty && lecture.type === LectureType.TEXT) || (!isTextEmpty && !lecture.type);
        if (!hasContentChanged && !hasEmptyStateChanged) {
            return;
        }
        const handler = setTimeout(() => {
            const updatedLecture: Lecture = {
                ...lecture,
                type: isTextEmpty ? undefined : LectureType.TEXT,
                content: {
                    ...lecture.content,
                    text: isTextEmpty
                        ? undefined
                        : {
                              content: textContent,
                          },
                },
            };
            updateLecture(updatedLecture);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [textContent, isTextEmpty, lecture?.id]);

    const handleTextChange = (content: string) => {
        setTextContent(content);
    };

    const handleIsEmptyChange = (isEmpty: boolean) => {
        if (isEmpty !== isTextEmpty) {
            setIsTextEmpty(isEmpty);
        }
    };

    const currentText = lecture?.content?.text;

    return (
        <>
            <section className="pb-0 mb-1">
                <div className="d-flex flex-row justify-content-between border-bottom mb-3 pb-2">
                    <h3>{t('views.common.content')}</h3>
                </div>
                <div className="d-flex flex-row align-items-center gap-6">
                    <span className="text-black fw-normal">
                        {t('views.instructors.courses.createCourse.editLecture.pickALectureType')}:
                    </span>

                    <Dropdown onSelect={handleSelectLectureType}>
                        <DropdownToggle
                            as="input"
                            value={lecture?.type ?? lectureType}
                            readOnly
                            className="form-control"
                            id="lectureTypeDropdown"
                            style={{ width: '15rem' }}
                        />
                        <DropdownMenu>
                            <DropdownItem eventKey={LectureType.VIDEO}>
                                {t('views.instructors.courses.createCourse.editLecture.video')}
                            </DropdownItem>
                            <DropdownItem eventKey={LectureType.TEXT}>
                                {t('views.instructors.courses.createCourse.editLecture.text')}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <p className="text-black my-3">
                    {t('views.instructors.courses.createCourse.editLecture.videoLectureIndication')}
                </p>
                {(lecture?.type || lectureType) === LectureType.VIDEO ? (
                    <VideoLectureContent
                        currentVideoFile={currentVideoFile}
                        isUploading={progress > 0 && progress < 1}
                        progress={Math.round(progress * 100)}
                        openFilePicker={openFilePicker}
                        uploadError={combinedUploadError}
                        handleDeleteVideo={handleDeleteVideo}
                        isDeleting={isDeleting}
                        toggleDeleteMode={setIsDeleting}
                    />
                ) : (
                    <RichTextEditor
                        key={lecture?.id}
                        value={textContent}
                        onChange={handleTextChange}
                        onIsEmptyChange={handleIsEmptyChange}
                    />
                )}
            </section>

            <ConfirmModal show={showModal} onClose={handleCloseModal} onConfirm={handleConfirmModal}>
                {t('views.instructors.courses.createCourse.editLecture.lectureTypeModal')}
            </ConfirmModal>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="video/mp4"
            />
        </>
    );
};

export default LectureContentSection;
