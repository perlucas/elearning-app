import { useTranslation } from 'react-i18next';
import ModuleDetails from './ModuleDetails';
import CustomTabs from '@/components/CustomTabs';
import './createCourse.scss';

const EditModule = () => {
    const { t } = useTranslation();
    const tabs = [
        {
            title: t('views.instructors.courses.createCourse.moduleDetails'),
            content: <ModuleDetails />,
        },
        {
            title: t('views.instructors.courses.createCourse.publishing'),
            content: <p>{t('views.instructors.courses.createCourse.publishing')}</p>,
        },
    ];

    return (
        <article className="__create-course-container">
            <h2>{t('views.instructors.courses.createCourse.editModule')}</h2>
            <CustomTabs tabs={tabs} defaultActiveKey={t('views.instructors.courses.createCourse.moduleDetails')} />
        </article>
    );
};

export default EditModule;
