import { useState, useCallback } from 'react';
import { Resources } from '@/views/instructors/courses/types';

type UseUploadAttachmentResult = {
    progress: number;
    data: Resources | null;
    error: Error | null;
    uploadFile: (file: File) => Promise<Resources>;
    reset: () => void;
};

export const useUploadAttachment = (): UseUploadAttachmentResult => {
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState<Resources | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const reset = () => {
        setProgress(0);
        setData(null);
        setError(null);
    };

    const uploadFile = useCallback(async (file: File): Promise<Resources> => {
        reset();

        const simulatedResponse: Resources = {
            id: `attachment-${Date.now()}`,
            title: file.name,
            url: 'https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg',
        };

        return new Promise<Resources>((resolve, reject) => {
            const isTooLarge = file.size > 1024 * 1024;
            if (isTooLarge) {
                const err = new Error('File exceeds maximum size of 1MB');
                setError(err);
                return reject(err);
            }

            let currentProgress = 0;
            const totalDuration = 2000;
            const intervalTime = 100;
            const steps = totalDuration / intervalTime;
            let currentStep = 0;

            const interval = setInterval(() => {
                currentStep++;
                currentProgress = Math.min(1, currentStep / steps);
                setProgress(currentProgress);
                if (currentProgress === 1) {
                    clearInterval(interval);
                    setData(simulatedResponse);
                    resolve(simulatedResponse);
                }
            }, intervalTime);
        }).catch((err: unknown) => {
            if (err instanceof Error) {
                setError(err);
            } else {
                setError(new Error(`An unexpected error occurred: ${String(err)}`));
            }
            throw err;
        });
    }, []);

    return { progress, data, error, uploadFile, reset };
};
