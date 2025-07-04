import useSafeContext from '@/hooks/useSafeContext';
import { Button, Card, FormControl, FormLabel } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BsPlusCircle } from 'react-icons/bs';
import { CreateCourseContext } from './context/CreateCourseContext';
import DraggableZone from '@/components/draggable/DraggableZone';
import LectureItem from './LectureItem';
import { Lecture } from '../types';
import { Item } from '@/components/draggable/types';
import { useEffect, useState } from 'react';

const ModuleDetails = () => {
    const { t } = useTranslation();
    const { modules, setModules, updateItem, deleteItem, idGenerator, editingViewItem, setEditingViewItem } =
        useSafeContext(CreateCourseContext);

    const module = editingViewItem?.type === 'module' ? modules.find((m) => m.id === editingViewItem.id) : undefined;
    const [moduleTitle, setModuleTitle] = useState(module?.title ?? '');

    const [lectures, setLectures] = useState<Lecture[]>(module?.lectures ?? []);
    const [newLectureId, setNewLectureId] = useState<string | null>(null);

    const addLecture = () => {
        const id = idGenerator();
        const newLecture: Lecture = {
            id,
            title: 'Untitled',
        };
        setLectures((prev) => [...prev, newLecture]);
        return newLecture;
    };

    const handleAddLecture = () => {
        const newLecture = addLecture();
        setNewLectureId(newLecture.id);
    };

    useEffect(() => {
        if (module) {
            updateItem({ ...module, lectures }, setModules);
        }
    }, [lectures]);

    useEffect(() => {
        setModuleTitle(module?.title ?? '');
    }, [module]);

    const handleUpdateTitle = () => {
        module && updateItem({ ...module, title: moduleTitle !== '' ? moduleTitle : 'Untitled' }, setModules);
    };

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleUpdateTitle();
            (e.target as HTMLInputElement).blur();
        }
    };

    return (
        <section className="p-0">
            <div>
                <FormLabel>{t('views.instructors.courses.createCourse.title')}</FormLabel>
                <FormControl
                    type="text"
                    value={moduleTitle}
                    onChange={(e) => setModuleTitle(e.target.value)}
                    onBlur={handleUpdateTitle}
                    onKeyDown={handleKeydown}
                />
            </div>

            <section>
                <div className="d-flex flex-row justify-content-between border-bottom mb-3 pb-2">
                    <h3>{t('views.instructors.courses.createCourse.lectures')}</h3>
                    <Button size="sm" className="d-flex align-items-center gap-2" onClick={handleAddLecture}>
                        <BsPlusCircle />
                        {t('views.instructors.courses.createCourse.addLecture')}
                    </Button>
                </div>
                <Card className="p-0">
                    <DraggableZone items={lectures} updateItems={(items: Item[]) => setLectures(items as Lecture[])}>
                        {lectures.length > 0 ? (
                            lectures.map((lect, index) => (
                                <LectureItem
                                    key={lect.id}
                                    lecture={lect}
                                    index={index}
                                    onDeleteItem={deleteItem}
                                    onUpdateItem={updateItem}
                                    setLectures={setLectures}
                                    isNewLecture={lect.id === newLectureId}
                                    setEditingViewItem={setEditingViewItem}
                                />
                            ))
                        ) : (
                            <p>{t('views.instructors.courses.createCourse.noLectures')}</p>
                        )}
                    </DraggableZone>
                </Card>
            </section>
            <div className="d-flex justify-content-end mt-3">
                <Button
                    size="sm"
                    variant="gray"
                    className="d-flex align-items-center gap-2"
                    onClick={() => setEditingViewItem(null)}
                >
                    {t('views.instructors.courses.createCourse.backToCourse')}
                </Button>
            </div>
        </section>
    );
};

export default ModuleDetails;
