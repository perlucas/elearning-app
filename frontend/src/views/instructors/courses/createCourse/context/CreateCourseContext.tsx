import React, { createContext, ReactNode, useState } from 'react';

export interface Module {
    id: string;
    title: string;
}

type Props = {
    children: ReactNode;
};

type ContextType = {
    modules: Module[];
    setModules: React.Dispatch<React.SetStateAction<Module[]>>;
};

export const CreateCourseContext = createContext<ContextType | undefined>(undefined);

const CreateCourseContextComponent = ({ children }: Props) => {
    const [modules, setModules] = useState<Module[]>([
        { id: '1', title: 'REST principles 01' },
        { id: '2', title: 'REST principles 02' },
        { id: '3', title: 'REST principles 03' },
    ]);

    const data: ContextType = {
        modules,
        setModules,
    };

    return <CreateCourseContext.Provider value={data}>{children}</CreateCourseContext.Provider>;
};

export default CreateCourseContextComponent;
