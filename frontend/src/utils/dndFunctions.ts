import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';

interface Item {
    id: string;
    title: string;
}

export const handleDragEnd = (
    event: DragEndEvent,
    items: Item[],
    setItems: React.Dispatch<React.SetStateAction<Item[]>>,
) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const originalIdx = items.findIndex((m) => m.id === active.id);
    const newIdx = items.findIndex((m) => m.id === over.id);
    setItems(arrayMove(items, originalIdx, newIdx));
};

export const getSortableStyle = (transform: any, transition: string | undefined) => {
    return {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition,
    };
};
