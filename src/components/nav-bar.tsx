
import { ThemeToggle } from "@/components/themes/theme-toggle";
import { Github, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import { SiGitter } from "react-icons/si";
import Link from "next/link";

export function NavBar() {
    return (
        <header className="fixed w-full border-b bg-background/80 backdrop-blur-sm z-50 items-center px-4 md:px-10">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                    <SiGitter className="h-6 w-6" />
                    <Link href="/">
                        <h1 className="text-2xl font-bold">Git
                            <span className="text-green-500">sift</span>
                        </h1>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Link href="https://buymeacoffee.com/neilpatricv" target="_blank">
                        <Button variant="ghost" size="icon">
                            <Coffee className="h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="https://github.com/drxc00/gitsift" target="_blank">
                        <Button variant="ghost" size="icon">
                            <Github className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}