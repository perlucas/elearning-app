import useSafeContext from '@/hooks/useSafeContext';
import {
    Button,
    Card,
    CardBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormControl,
    FormLabel,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CreateCourseContext } from './context/CreateCourseContext';
import { BsPlusCircle } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { Lecture, Module } from '../types';

const LectureDetails = () => {
    const { t } = useTranslation();
    const { modules, setModules, updateItem, editingViewItem, setEditingViewItem } =
        useSafeContext(CreateCourseContext);
    const [module, setModule] = useState<Module>();
    const [lecture, setLecture] = useState<Lecture>();
    const [lectureTitle, setLectureTitle] = useState('');
    const [lectures, setLectures] = useState<Lecture[]>([]);

    useEffect(() => {
        if (editingViewItem?.type === 'lecture')
            for (const mod of modules) {
                const lect = mod.lectures.find((l) => l.id === editingViewItem.id);
                if (lect) {
                    setModule(mod);
                    setLecture(lect);
                }
            }
    }, [editingViewItem]);

    useEffect(() => setLectureTitle(lecture?.title ?? 'Untitled'), [lecture]);
    useEffect(() => setLectures(module?.lectures ?? []), [module]);
    useEffect(() => {
        module && updateItem({ ...module, lectures }, setModules);
    }, [lectures]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            lecture && updateItem({ ...lecture, title: lectureTitle }, setLectures);
        }
    };

    const [lectureType, setLectureType] = useState('video');
    const handleSelectLectureType = (eventKey: string | null) => {
        eventKey && setLectureType(eventKey);
    };

    return (
        <section className="p-0">
            <div>
                <FormLabel>{t('views.instructors.courses.createCourse.title')}</FormLabel>
                <FormControl
                    type="text"
                    value={lectureTitle}
                    onChange={(e) => setLectureTitle(e.target.value)}
                    onBlur={() => {
                        lecture && updateItem({ ...lecture, title: lectureTitle }, setLectures);
                    }}
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
                            value={lectureType}
                            readOnly
                            className="form-control"
                            id="lectureTypeDropdown"
                            style={{ width: '15rem' }}
                        />
                        <DropdownMenu>
                            <DropdownItem eventKey="video">
                                {t('views.instructors.courses.createCourse.editLecture.video')}
                            </DropdownItem>
                            <DropdownItem eventKey="text">
                                {t('views.instructors.courses.createCourse.editLecture.text')}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {lectureType === 'video' ? (
                    <Card
                        className="text-center border-2 mx-auto my-4 bg-body-secondary __lectureType-card"
                        style={{ maxWidth: '100%', minHeight: '180px', borderStyle: 'dashed' }}
                    >
                        <CardBody className=" d-flex flex-column justify-content-between align-items-center h-100">
                            <div className="d-flex flex-row align-items-center justify-content-center gap-2 flex-grow-1">
                                <Button>
                                    {t('views.instructors.courses.createCourse.editLecture.uploadVideoFile')}
                                </Button>
                                <span>or </span>
                                <a className="text-primary text-decoration-none fw-semibold">Pick from library</a>
                            </div>
                            <p className="mb-0 mt-auto">Note: only MP4 files allowed, 1GB max.</p>
                        </CardBody>
                    </Card>
                ) : (
                    <textarea name="" id="" style={{ maxWidth: '100%', minHeight: '180px' }}></textarea>
                )}
            </section>
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
