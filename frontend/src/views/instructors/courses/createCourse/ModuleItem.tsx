import DraggableItem from '@/components/draggable/DraggableItem';
import ItemTitle from '../components/ItemTitle';
import ItemActionButtons from '../components/ItemActionButtons';
import { BsChevronDown, BsPlus, BsPlusCircle } from 'react-icons/bs';
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
    isEditing,
    toggleEditMode,
    onUpdateItem,
    isDeleting,
    toggleDeleteMode,
    onDeleteItem,
    isDropDownOpen,
    toggleDropDownMode,
    idGenerator,
    editModeMap,
    deleteModeMap,
    setModules,
}) => {
    const { t } = useTranslation();
    const [lectures, setLectures] = useState<Lecture[]>(module.lectures);

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
        toggleEditMode(newLecture.id, true);
    };

    useEffect(() => {
        onUpdateItem({ ...module, lectures }, setModules);
    }, [lectures]);

    return (
        <>
            <DraggableItem item={module} itemClass={'__draggable-item-darkGrey'}>
                <ItemTitle<Module>
                    item={module}
                    index={index}
                    isEditing={isEditing}
                    toggleEditMode={toggleEditMode}
                    onUpdateItem={onUpdateItem}
                    setItems={setModules}
                />
                <ItemActionButtons<Module>
                    item={module}
                    isDeleting={isDeleting}
                    toggleDeleteMode={toggleDeleteMode}
                    onDeleteItem={onDeleteItem}
                    setItems={setModules}
                >
                    {isDropDownOpen ? (
                        <BsChevronDown role="button" onClick={() => toggleDropDownMode(module.id, false)} />
                    ) : (
                        <BsPlus role="button" onClick={() => toggleDropDownMode(module.id, true)} />
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
                                    isEditing={editModeMap[lect.id] || false}
                                    toggleEditMode={toggleEditMode}
                                    isDeleting={deleteModeMap[lect.id] || false}
                                    toggleDeleteMode={toggleDeleteMode}
                                    onDeleteItem={onDeleteItem}
                                    onUpdateItem={onUpdateItem}
                                    setItems={setLectures}
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
