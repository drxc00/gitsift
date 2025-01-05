import { Check, X } from 'lucide-react'

interface StatusItemProps {
    label: string;
    present: boolean;
    weight?: number;
}

export function StatusItem({ label, present, weight }: StatusItemProps) {
    return (
        <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
            {present ? (
                <Check className="text-green-500 flex-shrink-0" />
            ) : (
                <X className="text-red-500 flex-shrink-0" />
            )}
            <span className="flex-grow">{label}</span>
            {weight !== undefined && (
                <span className="text-sm text-muted-foreground">{weight}%</span>
            )}
        </div>
    );
}

