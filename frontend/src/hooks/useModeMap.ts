import { useState } from 'react';

type ModeMap = Record<string, boolean>;

export default function useModeMap() {
    const [modeMap, setModeMap] = useState<ModeMap>({});

    const toggleMode = (id: string, state: boolean) => {
        setModeMap((prev) => ({ ...prev, [id]: state }));
    };

    return {
        modeMap,
        toggleMode,
    };
}
