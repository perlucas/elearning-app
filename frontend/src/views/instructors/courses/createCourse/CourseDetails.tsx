import { BsPlusCircle } from 'react-icons/bs';
import { Form, FormControl, FormGroup, FormLabel, Button, Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ModuleItem from './ModuleItem';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CreateCourseContext } from './context/CreateCourseContext';
import useSafeContext from '@/hooks/useSafeContext';
import { handleDragEnd } from '@/utils/dndFunctions';
import useDndSensors from '@/hooks/useDndSensors';

const CourseDetails = () => {
    const { t } = useTranslation();

    const { modules, setModules } = useSafeContext(CreateCourseContext);
    const sensors = useDndSensors();

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
                <Card className="p-0">
                    <DndContext
                        collisionDetection={closestCorners}
                        onDragEnd={(event) => handleDragEnd(event, modules, setModules)}
                        sensors={sensors}
                    >
                        <Container fluid>
                            <SortableContext items={modules.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                                {modules.length > 0 ? (
                                    modules.map((mod) => <ModuleItem module={mod} modules={modules} key={mod.id} />)
                                ) : (
                                    <p>{t('views.instructors.courses.createCourse.noModules')}</p>
                                )}
                            </SortableContext>
                        </Container>
                    </DndContext>
                </Card>
            </section>
        </section>
    );
};

export default CourseDetails;
