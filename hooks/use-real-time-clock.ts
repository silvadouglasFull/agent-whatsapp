import { useEffect, useState } from "react";

export function useRealTimeClock(): string {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const formatTime = (): string => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        setCurrentTime(formatTime());
        const timerId = setInterval(() => {
            setCurrentTime(formatTime());
        }, 1_000);
        return () => {
            clearInterval(timerId);
        };
    }, []);
    return currentTime
}