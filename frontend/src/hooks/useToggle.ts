'use client';
import { useCallback, useState } from 'react';

import _useViewPort from '@/hooks/useViewPort';

const useToggle = (initialState = false) => {
    /**
     * create a simple toggle for controlling simple boolean states
     */
    const [isTrue, setIsTrue] = useState(initialState);

    const setTrue = useCallback(() => setIsTrue(true), []);
    const setFalse = useCallback(() => setIsTrue(false), []);
    const toggle = useCallback(() => setIsTrue(!isTrue), [isTrue]);

    return { isTrue, toggle, setTrue, setFalse };
};

export default useToggle;
