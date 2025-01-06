
import { ThemeToggle } from "@/components/themes/theme-toggle";
import { Github, Coffee } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function NavBar() {
    return (
        <header className="fixed w-full border-b bg-background/80 backdrop-blur-sm z-50 items-center px-10">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link href="/"> 
                        <h1 className="text-2xl font-bold">gitsift</h1>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon">
                        <Coffee className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Github className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}