import { Button, FormControl, FormLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsPlusCircle } from 'react-icons/bs';

const ModuleDetails = () => {
    const { t } = useTranslation();
    return (
        <section className="p-0">
            <div>
                <FormLabel>{t('views.instructors.courses.createCourse.title')}</FormLabel>
                <FormControl type="text" value={''} />
            </div>

            <section>
                <div className="d-flex flex-row justify-content-between">
                    <h3>{t('views.instructors.courses.createCourse.modules')}</h3>
                    <Button size="sm" className="d-flex align-items-center gap-2">
                        <BsPlusCircle />
                        {t('views.instructors.courses.createCourse.addLecture')}
                    </Button>
                </div>
            </section>
            <div className="d-flex justify-content-end mt-3">
                <Button size="sm" variant="gray" className="d-flex align-items-center gap-2">
                    {t('views.instructors.courses.createCourse.backToCourse')}
                </Button>
            </div>
        </section>
    );
};

export default ModuleDetails;
