import { Button, Card, CardBody, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { VideoFileData } from '../types';
import React from 'react';
import { BsTrash } from 'react-icons/bs';

type VideoLectureContentProps = {
    currentVideoFile: VideoFileData | undefined;
    isUploading: boolean;
    progress: number;
    openFilePicker: () => void;
    uploadError: Error | null;
};

const VideoLectureContent: React.FC<VideoLectureContentProps> = ({
    currentVideoFile,
    isUploading,
    progress,
    openFilePicker,
    uploadError,
}) => {
    const { t } = useTranslation();
    return currentVideoFile ? (
        <div className="d-flex flex-row align-items-start justify-content-center gap-2 flex-grow-1">
            <img
                src={currentVideoFile.url}
                alt="video preview"
                className="img-fluid"
                style={{ maxWidth: '18rem', borderRadius: '10px' }}
            />
            <div className="d-flex flex-column text-black gap-2" style={{ width: '15rem' }}>
                <p className="m-0">
                    <span className="fw-bold">File:</span> {currentVideoFile.filename}
                </p>
                {currentVideoFile.duration && (
                    <p className="m-0">
                        <span className="fw-bold">Duration: </span>
                        {currentVideoFile.duration}
                    </p>
                )}
                <div>
                    <Button variant="danger" size="sm">
                        Delete <BsTrash />
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <Card
            className="text-center border-2 mx-auto mt-2 mb-4 bg-body-secondary __lectureType-card"
            style={{ maxWidth: '100%', minHeight: '180px', borderStyle: 'dashed' }}
        >
            <CardBody className=" d-flex flex-column justify-content-between align-items-center h-100">
                {isUploading ? (
                    <div className="d-flex flex-column align-items-center justify-content-center gap-2 flex-grow-1">
                        <Spinner animation="border" role="status" variant="primary" />
                        <span>Uploading: {progress}%</span>
                    </div>
                ) : (
                    <>
                        <div className="d-flex flex-grow-1 align-items-center">
                            <Button onClick={openFilePicker}>
                                {t('views.instructors.courses.createCourse.editLecture.uploadVideoFile')}
                            </Button>
                        </div>
                        {uploadError && <p className="text-danger my-2">{uploadError.message}</p>}
                        <p className="mb-0 mt-auto">Note: only MP4 files allowed, 1GB max.</p>
                    </>
                )}
            </CardBody>
        </Card>
    );
};

export default VideoLectureContent;
