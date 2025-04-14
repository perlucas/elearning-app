import { BsPlusCircle } from 'react-icons/bs';
import { Form, FormControl, FormGroup, FormLabel, Button, Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ModuleItem from './ModuleItem';
import { Module } from './ModuleItem';

const CourseDetails = () => {
    const { t } = useTranslation();
    const modules: Module[] = [
        { title: 'REST principles' },
        { title: 'REST principles' },
        { title: 'REST principles' },
    ];
    //To test the "no modules" state, try using an empty array:
    return (
        <section className="p-0">
            <Form>
                <FormGroup controlId="courseTitle">
                    <FormLabel>{t('views.instructors.courses.createCourse.title')}</FormLabel>
                    <FormControl type="text"></FormControl>
                </FormGroup>
            </Form>
            <section>
                <div className="d-flex flex-row justify-content-between">
                    <h3>{t('views.instructors.courses.createCourse.modules')}</h3>
                    <Button size="sm" className="d-flex align-items-center gap-2">
                        <BsPlusCircle />
                        {t('views.instructors.courses.createCourse.addModule')}
                    </Button>
                </div>
                <Card>
                    <Container className="g-0">
                        {modules.length > 0 ? (
                            modules.map((mod, index) => <ModuleItem module={mod} index={index} key={index} />)
                        ) : (
                            <p>{t('views.instructors.courses.createCourse.noModules')}</p>
                        )}
                    </Container>
                </Card>
            </section>
        </section>
    );
};

export default CourseDetails;
