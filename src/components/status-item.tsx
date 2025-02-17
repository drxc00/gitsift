import { cn } from '@/lib/utils';
import { OctagonAlert, SquareCheckBig } from 'lucide-react'

interface StatusItemProps {
    label: string;
    present: boolean;
    weight?: number;
    isSelected?: boolean;
    className?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
}

export function StatusItem({ label, present, weight, isSelected, className, onClick, icon }: StatusItemProps) {
    return (
        <div className={cn("flex items-center justify-between space-x-2 p-2 bg-muted rounded-md", className, isSelected && 'bg-muted font-semibold')} onClick={onClick}>
            <div className="flex items-center space-x-2">
                <span className={cn(!isSelected && 'text-muted-foreground')}>{icon}</span>
                <span className="flex-grow">{label}</span>
                {weight !== undefined && (
                    <span className="text-sm text-muted-foreground">{weight}%</span>
                )}
            </div>
            <div className='flex items-center pr-1'>
                {present ? (
                    <SquareCheckBig className="text-green-500 flex-shrink-0 h-4 w-4" />
                ) : (
                    <OctagonAlert className="text-red-500 flex-shrink-0 h-4 w-4" />
                )}
            </div>
        </div>
    );
}

