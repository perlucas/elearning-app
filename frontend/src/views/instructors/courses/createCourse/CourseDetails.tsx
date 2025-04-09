import { BsPlusCircle } from 'react-icons/bs';
import { Row, Col, Form, FormControl, FormGroup, FormLabel, Button, Card } from 'react-bootstrap';
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
        <>
            <Form>
                <FormGroup controlId="courseTitle">
                    <FormLabel>{t('views.instructors.courses.createCourse.title')}</FormLabel>
                    <FormControl type="text"></FormControl>
                </FormGroup>
            </Form>
            <section>
                <Row className="border-bottom g-0 mb-4">
                    <Col xs={6}>
                        <h3>{t('views.instructors.courses.createCourse.modules')}</h3>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end">
                        <Button size="sm" className="d-flex align-items-center gap-2">
                            <BsPlusCircle />
                            {t('views.instructors.courses.createCourse.addModule')}
                        </Button>
                    </Col>
                </Row>
                <Card>
                    {modules.length > 0 ? (
                        modules.map((mod, index) => <ModuleItem module={mod} index={index} key={index} />)
                    ) : (
                        <p>{t('views.instructors.courses.createCourse.noModules')}</p>
                    )}
                </Card>
            </section>
        </>
    );
};

export default CourseDetails;
