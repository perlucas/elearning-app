import useSafeContext from '@/hooks/useSafeContext';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormControl, FormLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CreateCourseContext } from './context/CreateCourseContext';
import { BsPlusCircle } from 'react-icons/bs';
import React, { useEffect, useState, useRef } from 'react';
import { Lecture, LectureType, Module } from '../types';
import { useUploadFile } from '@/hooks/useUploadFile';
import VideoLectureContent from '../components/VideoLectureContent';

const LectureDetails = () => {
    const { t } = useTranslation();
    const { modules, setModules, updateItem, editingViewItem, setEditingViewItem } =
        useSafeContext(CreateCourseContext);
    const { progress, data: uploadedFileData, error: uploadError, uploadFile, reset: resetFileData } = useUploadFile();
    const [module, setModule] = useState<Module>();
    const [lecture, setLecture] = useState<Lecture>();
    const [lectureTitle, setLectureTitle] = useState('');
    const [lectureType, setLectureType] = useState<LectureType>(LectureType.VIDEO);
    const [fileValidationError, setFileValidationError] = useState<Error | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const combinedUploadError = fileValidationError || uploadError;

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        let foundModule: Module | undefined;
        let foundLecture: Lecture | undefined;
        if (editingViewItem?.type === 'lecture') {
            for (const mod of modules) {
                const lect = mod.lectures.find((l) => l.id === editingViewItem.id);
                if (lect) {
                    foundModule = mod;
                    foundLecture = lect;
                    break;
                }
            }
        }
        if (module?.id !== foundModule?.id) {
            setModule(foundModule);
        }
        if (lecture?.id !== foundLecture?.id) {
            setLecture(foundLecture);
        }
        const newLectureTitle = foundLecture?.title ?? 'Untitled';
        if (lectureTitle !== newLectureTitle) {
            setLectureTitle(newLectureTitle);
        }
        const newLectureType = foundLecture?.type ?? LectureType.VIDEO;
        if (lectureType !== newLectureType) {
            setLectureType(newLectureType);
        }
    }, [editingViewItem, modules, module, lecture, lectureType]);

    const updateLecture = (updatedLecture: Lecture) => {
        if (module && lecture) {
            const updatedLects = module.lectures.map((l) => (l.id === updatedLecture.id ? updatedLecture : l));
            const updatedModule = { ...module, lectures: updatedLects };
            updateItem(updatedModule, setModules);
        }
    };

    useEffect(() => {
        if (uploadedFileData && lecture && module) {
            const updatedLecture: Lecture = {
                ...lecture,
                type: LectureType.VIDEO,
                content: { ...lecture.content, video: uploadedFileData },
            };
            updateLecture(updatedLecture);
        }
    }, [uploadedFileData, lecture, module]);

    const handleUpdateTitle = () => {
        lecture && updateLecture({ ...lecture, title: lectureTitle });
    };

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUpdateTitle();
        }
    };

    const handleSelectLectureType = (eventKey: string | null) => {
        eventKey && setLectureType(eventKey as LectureType);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setFileValidationError(null);
        if (file) {
            if (file.type !== 'video/mp4') {
                const errorMessage = t('views.instructors.courses.createCourse.editLecture.videoFormatError');
                setFileValidationError(new Error(errorMessage));
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                return;
            }
            uploadFile(file);
        }
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const currentVideoFile = uploadedFileData || lecture?.content?.video;

    const handleDeleteVideo = async () => {
        if (currentVideoFile && lecture) {
            const videoToDelete = currentVideoFile.id;
            const updatedLect = { ...lecture, content: { ...lecture.content, video: undefined } };
            updateLecture(updatedLect);
            setIsDeleting(false);
            resetFileData();
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                console.log('Solicitud de eliminación para el video' + videoToDelete);
            } catch (err: any) {
                console.error(err.message);
            }
        }
    };

    return (
        <section className="p-0">
            <div>
                <FormLabel>{t('views.instructors.courses.createCourse.title')}</FormLabel>
                <FormControl
                    type="text"
                    value={lectureTitle}
                    onChange={(e) => setLectureTitle(e.target.value)}
                    onBlur={handleUpdateTitle}
                    onKeyDown={handleKeydown}
                />
            </div>

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
                            value={lecture?.type || lectureType}
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
                    <textarea name="" id="" style={{ maxWidth: '100%', minHeight: '180px' }}></textarea>
                )}
            </section>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="video/mp4"
            />
            <section className="p-1 my-2">
                <div className="d-flex flex-row justify-content-between border-bottom mb-3 pb-2">
                    <h3>{t('views.instructors.courses.createCourse.editLecture.attatchments')}</h3>
                </div>
                <p className="text-black">{t('views.instructors.courses.createCourse.editLecture.attatchmentsText')}</p>
                <div className="d-flex flex-row gap-2">
                    <Button size="sm" className="d-flex align-items-center gap-2">
                        <BsPlusCircle />
                        {t('views.instructors.courses.createCourse.editLecture.uploadAttatchment')}
                    </Button>
                </div>
            </section>
            <div className="d-flex justify-content-end mt-3 gap-2">
                <Button
                    size="sm"
                    variant="gray"
                    className="d-flex align-items-center gap-2"
                    onClick={() => module && setEditingViewItem({ id: module.id, type: 'module' })}
                >
                    {t('views.instructors.courses.createCourse.editLecture.backToModule')}
                </Button>
                <Button
                    size="sm"
                    variant="gray"
                    className="d-flex align-items-center gap-2"
                    onClick={() => setEditingViewItem(null)}
                >
                    {t('views.instructors.courses.createCourse.backToCourse')}
                </Button>
            </div>
        </section>
    );
};

export default LectureDetails;
