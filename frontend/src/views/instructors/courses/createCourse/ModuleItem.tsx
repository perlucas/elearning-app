import DraggableItem from '@/components/draggable/DraggableItem';
import ItemTitle from '../components/ItemTitle';
import ItemActionButtons from '../components/ItemActionButtons';
import { BsDash, BsPlus, BsPlusCircle } from 'react-icons/bs';
import { ModuleItemProps, Lecture, Module } from '../types';
import DraggableZone from '@/components/draggable/DraggableZone';
import { Button, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Item } from '@/components/draggable/types';
import LectureItem from './LectureItem';

const ModuleItem: React.FC<ModuleItemProps> = ({
    module,
    index,
    onUpdateItem,
    onDeleteItem,
    idGenerator,
    setModules,
    setEditingViewItem,
    isNewModule = false,
}) => {
    const { t } = useTranslation();
    const [lectures, setLectures] = useState<Lecture[]>(module.lectures);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
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
        onUpdateItem({ ...module, lectures }, setModules);
    }, [lectures]);

    useEffect(() => {
        if (isNewModule) {
            setIsEditing(true);
        }
    }, [isNewModule]);

    return (
        <>
            <DraggableItem item={module} itemClass={'__draggable-item-darkGrey'}>
                <ItemTitle<Module>
                    item={module}
                    index={index}
                    isEditing={isEditing}
                    toggleEditMode={setIsEditing}
                    onUpdateItem={(updatedItem) => onUpdateItem(updatedItem, setModules)}
                />
                <ItemActionButtons<Module>
                    item={module}
                    isDeleting={isDeleting}
                    toggleDeleteMode={setIsDeleting}
                    onDeleteItem={(itemId) => onDeleteItem(itemId, setModules)}
                    onEditAction={(itemId) => setEditingViewItem({ id: itemId, type: 'module' })}
                >
                    {isDropDownOpen ? (
                        <BsDash role="button" onClick={() => setIsDropDownOpen(false)} />
                    ) : (
                        <BsPlus role="button" onClick={() => setIsDropDownOpen(true)} />
                    )}
                </ItemActionButtons>
            </DraggableItem>
            {isDropDownOpen && (
                <div className="ms-5">
                    <DraggableZone items={lectures} updateItems={(items: Item[]) => setLectures(items as Lecture[])}>
                        {lectures.length > 0 ? (
                            lectures.map((lect, index) => (
                                <LectureItem
                                    key={lect.id}
                                    lecture={lect}
                                    index={index}
                                    onDeleteItem={onDeleteItem}
                                    onUpdateItem={onUpdateItem}
                                    setLectures={setLectures}
                                    isNewLecture={lect.id === newLectureId}
                                    setEditingViewItem={setEditingViewItem}
                                />
                            ))
                        ) : (
                            <p>{t('views.instructors.courses.createCourse.noLectures')}</p>
                        )}
                    </DraggableZone>
                    <Row className="p-0">
                        <Col>
                            <Button
                                size="sm"
                                className="d-flex align-items-center gap-2 m-0"
                                onClick={handleAddLecture}
                            >
                                <BsPlusCircle />
                                {t('views.instructors.courses.createCourse.addLecture')}
                            </Button>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};

export default ModuleItem;
