import { useLayoutEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';
import { Module, ModuleItemProps } from '../types';

type ItemTitleProps = Pick<ModuleItemProps, 'index' | 'editMode' | 'onToggleEditMode'> & {
    item: Module;
    onUpdateItem: ModuleItemProps['onUpdateModule'];
};

const ItemTitle: React.FC<ItemTitleProps> = ({ item, index, editMode, onToggleEditMode, onUpdateItem }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [titleValue, setTitleValue] = useState('');

    useLayoutEffect(() => {
        if (editMode && inputRef.current) {
            const newValue = item.title;
            setTitleValue(newValue);
            requestAnimationFrame(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
            });
        }
    }, [editMode]);

    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onUpdateItem({ ...item, title: titleValue });
            onToggleEditMode(item.id, false);
        }
    };
    return (
        <>
            <Col className="d-flex align-items-center px-1 flex-grow-1">
                {editMode ? (
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
                                onUpdateItem({ ...item, title: titleValue });
                                onToggleEditMode(item.id, false);
                            }}
                        />
                    </>
                ) : (
                    <span onDoubleClick={() => onToggleEditMode(item.id, true)}>{`${index + 1}. ${item.title}`}</span>
                )}
            </Col>
        </>
    );
};

export default ItemTitle;
