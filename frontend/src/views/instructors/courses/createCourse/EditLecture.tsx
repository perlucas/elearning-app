import { useTranslation } from 'react-i18next';
import CustomTabs from '@/components/CustomTabs';
import './createCourse.scss';
import LectureDetails from './LectureDetails';

const EditLecture = () => {
    const { t } = useTranslation();
    const tabs = [
        {
            title: t('views.instructors.courses.createCourse.editLecture.lectureDetails'),
            content: <LectureDetails />,
        },
        {
            title: t('views.instructors.courses.createCourse.publishing'),
            content: <p>{t('views.instructors.courses.createCourse.publishing')}</p>,
        },
    ];

    return (
        <article className="__create-course-container">
            <h2>{t('views.instructors.courses.createCourse.editLecture.editLecture')}</h2>
            <CustomTabs
                tabs={tabs}
                defaultActiveKey={t('views.instructors.courses.createCourse.editLecture.lectureDetails')}
            />
        </article>
    );
};

export default EditLecture;
