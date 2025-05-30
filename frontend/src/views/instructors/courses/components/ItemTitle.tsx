import { useLayoutEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Lecture, Module, ModuleItemProps } from '../types';

type ItemTitleProps<T extends Module | Lecture> = Pick<
    ModuleItemProps,
    'index' | 'isEditing' | 'toggleEditMode' | 'onUpdateItem'
> & {
    item: T;
    setItems: React.Dispatch<React.SetStateAction<T[]>>;
};

const ItemTitle = <T extends Module | Lecture>({
    item,
    index,
    isEditing,
    toggleEditMode,
    onUpdateItem,
    setItems,
}: ItemTitleProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [titleValue, setTitleValue] = useState('');

    useLayoutEffect(() => {
        if (isEditing && inputRef.current) {
            const newValue = item.title;
            setTitleValue(newValue);
            requestAnimationFrame(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            });
        }
    }, [isEditing]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onUpdateItem({ ...item, title: titleValue }, setItems);
            toggleEditMode(item.id, false);
        }
    };
    return (
        <>
            <Col className="d-flex align-items-center px-1 flex-grow-1">
                {isEditing ? (
                    <>
                        <span className="me-1">{index + 1}.</span>
                        <input
                            type="text"
                            className="w-100 __module-item-input"
                            ref={inputRef}
                            value={titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
                            onKeyDown={handleKeydown}
                            onBlur={() => {
                                onUpdateItem({ ...item, title: titleValue }, setItems);
                                toggleEditMode(item.id, false);
                            }}
                        />
                    </>
                ) : (
                    <span onDoubleClick={() => toggleEditMode(item.id, true)}>{`${index + 1}. ${item.title}`}</span>
                )}
            </Col>
        </>
    );
};

export default ItemTitle;
