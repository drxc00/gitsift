import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
    return (
        <footer className="w-full sticky top-[100vh] text-center border-t bg-background">
            <div className="flex flex-col items-center justify-between gap-4 py-4">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{' '}
                        <Link
                            href="https://github.com/drxc00"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            drxc00
                        </Link>
                        . The source code is available on{' '}
                        <Link
                            href="https://github.com/drxc00/gitsift"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </footer>
    )
}

