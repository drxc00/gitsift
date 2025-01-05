import Link from "next/link";
import { ThemeToggle } from "@/components/themes/theme-toggle";
import { Github, Coffee } from "lucide-react";

export function NavBar() {
    return (
        <div className="flex justify-between max-w-screen-xl mx-auto items-center h-14 py-10 mt-4">
            <div className="flex flex-row items-center justify-between w-full border p-4 rounded-lg">
                <div className="font-bold">
                    <Link href="/">
                        <h1 className="text-2xl text-primary">gitsift</h1>
                    </Link>
                </div>
                <div className="flex flex-row items-center text-primary justify-between gap-4">
                    <Link href="https://www.buymeacoffee.com/git-sift" target="_blank" className="hover:text-muted-foreground transition-colors">
                        <Coffee className="w-5 h-5" />
                    </Link>
                    <Link href="https://github.com/git-sift" target="_blank" className="hover:text-muted-foreground transition-colors">
                        <Github className="w-5 h-5" />
                    </Link>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}