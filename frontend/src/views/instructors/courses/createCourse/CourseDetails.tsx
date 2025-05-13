import { BsPlusCircle } from 'react-icons/bs';
import { Form, FormControl, FormGroup, FormLabel, Button, Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ModuleItem from './ModuleItem';
import { CreateCourseContext, Module } from './context/CreateCourseContext';
import useSafeContext from '@/hooks/useSafeContext';
import DraggableZone from '@/components/draggable/DraggableZone';
import { Item } from '@/components/draggable/types';
import { useState } from 'react';

const CourseDetails = () => {
    const { t } = useTranslation();
    const { modules, setModules, addModule, updateModule, handleDeleteButton } = useSafeContext(CreateCourseContext);
    const [editModeMap, setEditModeMap] = useState<Record<string, boolean>>({});
    const [deleteModeMap, setDeleteModeMap] = useState<Record<string, boolean>>({});

    const toggleEditMode = (moduleId: string, editMode: boolean) => {
        setEditModeMap((prev) => ({ ...prev, [moduleId]: editMode }));
    };

    const toggleDeleteMode = (moduleId: string, editMode: boolean) => {
        setDeleteModeMap((prev) => ({ ...prev, [moduleId]: editMode }));
    };

    const handleAddModule = () => {
        const newModule = addModule();
        toggleEditMode(newModule.id, true);
    };

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
                    <Button size="sm" className="d-flex align-items-center gap-2" onClick={handleAddModule}>
                        <BsPlusCircle />
                        {t('views.instructors.courses.createCourse.addModule')}
                    </Button>
                </div>
                <Card className="p-0">
                    <DraggableZone items={modules} updateItems={(items: Item[]) => setModules(items as Module[])}>
                        <Container fluid>
                            {modules.length > 0 ? (
                                modules.map((mod, index) => (
                                    <ModuleItem
                                        module={mod}
                                        index={index}
                                        key={mod.id}
                                        editMode={editModeMap[mod.id] || false}
                                        onToggleEditMode={toggleEditMode}
                                        onUpdateModule={updateModule}
                                        deleteMode={deleteModeMap[mod.id] || false}
                                        onToggleDeleteMode={toggleDeleteMode}
                                        onDelete={handleDeleteButton}
                                    />
                                ))
                            ) : (
                                <p>{t('views.instructors.courses.createCourse.noModules')}</p>
                            )}
                        </Container>
                    </DraggableZone>
                </Card>
            </section>
        </section>
    );
};

export default CourseDetails;
