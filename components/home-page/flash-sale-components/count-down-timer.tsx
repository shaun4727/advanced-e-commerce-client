'use client';

import { useEffect, useState } from 'react';

export const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 5,
        minutes: 7,
        seconds: 2,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center space-x-2">
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-8 text-center">
                {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <span className="text-gray-600">:</span>
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-8 text-center">
                {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <span className="text-gray-600">:</span>
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold min-w-8 text-center">
                {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
        </div>
    );
};
