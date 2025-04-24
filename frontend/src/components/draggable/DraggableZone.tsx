import {
    closestCorners,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export interface Item {
    id: string;
    title: string;
}

interface Props {
    items: Item[];
    updateItems: React.Dispatch<React.SetStateAction<Item[]>>;
    children: React.ReactNode;
}

const DraggableZone = ({ items, updateItems, children }: Props) => {
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const originalIdx = items.findIndex((m) => m.id === active.id);
        const newIdx = items.findIndex((m) => m.id === over.id);
        updateItems(arrayMove(items, originalIdx, newIdx));
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext items={items.map((m) => m.id)} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    );
};

export default DraggableZone;
