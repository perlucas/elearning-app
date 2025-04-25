import { useTranslation } from 'react-i18next';
import CourseDetails from './CourseDetails';
import CustomTabs from '@/components/CustomTabs';
import './createCourse.scss';

const CreateCourse = () => {
    const { t } = useTranslation();
    const tabs = [
        {
            title: t('views.instructors.courses.createCourse.courseDetails'),
            content: <CourseDetails />,
        },
        {
            title: t('views.instructors.courses.createCourse.publishing'),
            content: <p>{t('views.instructors.courses.createCourse.publishing')}</p>,
        },
    ];

    return (
        <article className="__create-course-container">
            <h2>{t('views.instructors.courses.createCourse.createCourse')}</h2>
            <CustomTabs tabs={tabs} defaultActiveKey={t('views.instructors.courses.createCourse.courseDetails')} />
        </article>
    );
};

export default CreateCourse;
