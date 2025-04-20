import { BsPlusCircle } from 'react-icons/bs';
import { Form, FormControl, FormGroup, FormLabel, Button, Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ModuleItem from './ModuleItem';
import { Module } from './ModuleItem';
import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';

const CourseDetails = () => {
    const { t } = useTranslation();
    const [modules, setModules] = useState<Module[]>([
        { id: '1', title: 'REST principles 01' },
        { id: '2', title: 'REST principles 02' },
        { id: '3', title: 'REST principles 03' },
    ]);
    //To test the "no modules" state, try using an empty array:

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const originalIdx = modules.findIndex((m) => m.id === active.id);
        const newIdx = modules.findIndex((m) => m.id === over.id);
        setModules(arrayMove(modules, originalIdx, newIdx));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

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
                    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
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
