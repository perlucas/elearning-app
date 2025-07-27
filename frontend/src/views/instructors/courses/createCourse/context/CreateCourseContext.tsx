import { createContext, ReactNode, useState } from 'react';
import { Module, Lecture, Setter, EditTarget, Resources } from '../../types';

type Props = {
    children: ReactNode;
};

type updateItemFn = <T extends Module | Lecture | Resources>(updatedItem: T, setItems: Setter<T[]>) => void;
type deleteItemFn = <T extends Module | Lecture>(id: string, setItems: Setter<T[]>) => void;

type VoidStringFn = (t: string) => void;

type ContextType = {
    courseTitle: string;
    setCourseTitle: Setter<string>;
    modules: Module[];
    setModules: Setter<Module[]>;
    addModule: () => Module;
    updateItem: updateItemFn;
    deleteItem: deleteItemFn;
    changeCourseTitle: VoidStringFn;
    idGenerator: () => string;
    editingViewItem: EditTarget;
    setEditingViewItem: Setter<EditTarget>;
};

export const CreateCourseContext = createContext<ContextType | undefined>(undefined);

const CreateCourseContextBoundary = ({ children }: Props) => {
    const [courseTitle, setCourseTitle] = useState('');

    const changeCourseTitle = (value: string) => {
        setCourseTitle(value !== '' ? value : 'Untitled');
    };

    const [modules, setModules] = useState<Module[]>([
        { id: '1', title: 'REST principles 01', lectures: [] },
        { id: '2', title: 'REST principles 02', lectures: [] },
        { id: '3', title: 'REST principles 03', lectures: [] },
    ]);

    //Provisional function
    const idGenerator = () => {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    };

    const addModule = () => {
        const id = idGenerator();
        const newModule: Module = {
            id,
            title: 'Untitled',
            lectures: [],
        };
        setModules((prev) => [...prev, newModule]);
        return newModule;
    };

    const updateItem: updateItemFn = (updatedItem, setItems) => {
        if (updatedItem.title === '') {
            updatedItem.title = 'Untitled';
        }
        setItems((prev) => {
            const updatedItems = [...prev];
            const index = updatedItems.findIndex((m) => m.id === updatedItem.id);
            if (index !== -1) {
                updatedItems.splice(index, 1, updatedItem);
            }
            return updatedItems;
        });
    };

    //Delete module

    const deleteItem: deleteItemFn = (id, setItems) => {
        setItems((prev) => prev.filter((m) => m.id !== id));
    };

    const [editingViewItem, setEditingViewItem] = useState<EditTarget>(null);

    const data: ContextType = {
        modules,
        setModules,
        addModule,
        updateItem,
        deleteItem,
        courseTitle,
        setCourseTitle,
        changeCourseTitle,
        idGenerator,
        editingViewItem,
        setEditingViewItem,
    };

    return <CreateCourseContext.Provider value={data}>{children}</CreateCourseContext.Provider>;
};

export default CreateCourseContextBoundary;
