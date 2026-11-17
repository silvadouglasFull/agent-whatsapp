'use client';

import { useRealTimeClock } from '@/hooks/use-real-time-clock';

export function RealTimeClock() {
    const currentTime = useRealTimeClock()

    return (
        <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 font-sans select-none">
            <svg
                className="w-3 h-3 text-neutral-400"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            >
                <circle cx="8" cy="8" r="6.25" />
                <path d="M8 4V8L10.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{currentTime}</span>
        </span>
    );
}