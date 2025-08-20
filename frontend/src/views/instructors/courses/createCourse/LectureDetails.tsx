import useSafeContext from '@/hooks/useSafeContext';
import { Button, FormControl, FormLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CreateCourseContext } from './context/CreateCourseContext';
import React, { useEffect, useState, useMemo } from 'react';
import { Lecture } from '../types';
import LectureContentSection from '../components/LectureContentSection';
import LectureAttachmentSection from '../components/LectureAttachmentSection';

const LectureDetails = () => {
    const { t } = useTranslation();
    const { modules, setModules, updateItem, editingViewItem, setEditingViewItem } =
        useSafeContext(CreateCourseContext);

    const [lectureTitle, setLectureTitle] = useState('');

    const lecture = useMemo(() => {
        if (editingViewItem?.type !== 'lecture') return null;
        for (const mod of modules) {
            const lect = mod.lectures.find((l) => l.id === editingViewItem.id);
            if (lect) return lect;
        }
        return null;
    }, [editingViewItem, modules]);

    const module = useMemo(() => {
        if (editingViewItem?.type !== 'lecture') return null;
        return modules.find((mod) => mod.lectures.some((l) => l.id === editingViewItem.id)) ?? null;
    }, [editingViewItem, modules]);

    useEffect(() => {
        const newTitle = lecture?.title ?? 'Untitled';
        setLectureTitle(newTitle);
    }, [lecture]);

    const updateLecture = (updatedLecture: Lecture) => {
        if (module && lecture) {
            const updatedLects = module.lectures.map((l) => (l.id === updatedLecture.id ? updatedLecture : l));
            const updatedModule = { ...module, lectures: updatedLects };
            updateItem(updatedModule, setModules);
        }
    };

    const handleUpdateTitle = () => {
        lecture && updateLecture({ ...lecture, title: lectureTitle !== '' ? lectureTitle : 'Untitled' });
    };

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUpdateTitle();
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

            <LectureContentSection lecture={lecture} module={module} updateLecture={updateLecture} />

            <LectureAttachmentSection lecture={lecture} module={module} updateLecture={updateLecture} />

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
