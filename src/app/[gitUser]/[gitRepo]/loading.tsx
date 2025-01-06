"use client";

import { Loader } from "@/components/loader";
import { useEffect, useState } from "react";

export default function Loading() {

    // Timeout for loading state
    const [timeOutRemaining, setTimeOutRemaining] = useState(10);

    // Decrement the timeout remaining every second
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOutRemaining(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 z-50 bg-background">
            <Loader />
            <p className="text-lg text-muted-foreground">Sifting Repository</p>
            <p className="text-sm text-muted-foreground">{timeOutRemaining} seconds remaining before timeout</p>
        </div>
    );
}
