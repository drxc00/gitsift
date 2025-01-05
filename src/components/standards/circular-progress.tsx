interface CircularProgressProps {
    value: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
}

export function CircularProgress({ value, size = 160, strokeWidth = 12, label }: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;
    const color = value >= 80 ? "text-green-500" : value >= 50 ? "text-yellow-500" : "text-red-500";

    return (
        <div className="relative inline-flex flex-col items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    className="text-muted stroke-current"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={`${color} stroke-current`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{Math.round(value)}%</span>
                {label && <span className="text-sm text-muted-foreground">{label}</span>}
            </div>
        </div>
    );
}

