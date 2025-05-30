import { BsPlusCircle } from 'react-icons/bs';
import { FormControl, FormLabel, Button, Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ModuleItem from './ModuleItem';
import { CreateCourseContext } from './context/CreateCourseContext';
import { Module } from '../types';
import useSafeContext from '@/hooks/useSafeContext';
import DraggableZone from '@/components/draggable/DraggableZone';
import { Item } from '@/components/draggable/types';
import { useEffect, useRef } from 'react';
import useModeMap from '@/hooks/useModeMap';

const CourseDetails = () => {
    const { t } = useTranslation();
    const {
        modules,
        setModules,
        addModule,
        updateItem,
        deleteItem,
        courseTitle,
        setCourseTitle,
        changeCourseTitle,
        idGenerator,
        setEditingViewItem,
    } = useSafeContext(CreateCourseContext);
    const { modeMap: editModeMap, toggleMode: toggleEditMode } = useModeMap();
    const { modeMap: deleteModeMap, toggleMode: toggleDeleteMode } = useModeMap();
    const { modeMap: dropDownModeMap, toggleMode: toggleDropDownMode } = useModeMap();

    const handleAddModule = () => {
        const newModule = addModule();
        toggleEditMode(newModule.id, true);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (courseTitle === '') {
            requestAnimationFrame(() => {
                inputRef.current?.focus();
            });
        }
    }, [courseTitle]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            changeCourseTitle(courseTitle);
            inputRef.current?.blur();
        }
    };

    return (
        <section className="p-0">
            <div>
                <FormLabel>{t('views.instructors.courses.createCourse.title')}</FormLabel>
                <FormControl
                    type="text"
                    value={courseTitle}
                    ref={inputRef}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    onBlur={(e) => changeCourseTitle(e.target.value)}
                    onKeyDown={handleKeydown}
                />
            </div>

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
                        <Container fluid className="p-0">
                            {modules.length > 0 ? (
                                modules.map((mod, index) => (
                                    <ModuleItem
                                        module={mod}
                                        index={index}
                                        key={mod.id}
                                        isEditing={editModeMap[mod.id] || false}
                                        toggleEditMode={toggleEditMode}
                                        onUpdateItem={updateItem}
                                        isDeleting={deleteModeMap[mod.id] || false}
                                        toggleDeleteMode={toggleDeleteMode}
                                        onDeleteItem={deleteItem}
                                        isDropDownOpen={dropDownModeMap[mod.id] || false}
                                        toggleDropDownMode={toggleDropDownMode}
                                        idGenerator={idGenerator}
                                        editModeMap={editModeMap}
                                        deleteModeMap={deleteModeMap}
                                        setModules={setModules}
                                        setEditingViewItem={setEditingViewItem}
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
