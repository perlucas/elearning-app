import { useState, useCallback } from 'react';
import { VideoFileData } from '@/views/instructors/courses/types';

type UseUploadFileResult = {
    progress: number;
    data: VideoFileData | null;
    error: Error | null;
    uploadFile: (file: File) => Promise<VideoFileData>;
    reset: () => void;
};

export const useUploadFile = (): UseUploadFileResult => {
    const [progress, setProgress] = useState(0);
    const [data, setData] = useState<VideoFileData | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const uploadFile = useCallback(async (file: File): Promise<VideoFileData> => {
        setProgress(0);
        setData(null);
        setError(null);

        const simulatedResponse: VideoFileData = {
            id: `file-${Date.now()}`,
            filename: file.name,
            url: 'https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg',
            previewUrl:
                'https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg',
            duration: Math.floor(Math.random() * (600 - 30 + 1) + 30),
        };

        return new Promise<VideoFileData>((resolve, _) => {
            let currentProgress = 0;
            const totalDuration = 3000;
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

    const reset = () => {
        setProgress(0);
        setData(null);
        setError(null);
    };

    return { progress, data, error, uploadFile, reset };
};
