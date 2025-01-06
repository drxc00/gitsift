import { Loader } from "@/components/loader";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 z-50 bg-background">
            <Loader />
            <p className="text-lg text-muted-foreground">Sifting Repository</p>
        </div>
    );
}
