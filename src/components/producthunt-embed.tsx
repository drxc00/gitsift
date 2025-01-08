"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function ProductHuntEmbed() {
    const { theme, systemTheme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | null>(null);

    useEffect(() => {
        setCurrentTheme((theme === "system" ? systemTheme : theme || "light") as "light" | "dark");
    }, [theme, systemTheme]);

    if (currentTheme === null) {
        return (
            <Skeleton className="w-[250px] h-[54px] animate-pulse"></Skeleton>
        ) // Loading placeholder
    }

    return (
        <>
            {currentTheme == "light" ? (
                <a
                    href="https://www.producthunt.com/products/gitsift/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-gitsift"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={`https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=872566&theme=light`}
                        alt="Gitsift - Evaluate your repository seamlessly."
                        width="250"
                        height="54"
                        style={{ width: '250px', height: '54px' }}
                    />
                </a>
            ) : (
                <a
                    href="https://www.producthunt.com/products/gitsift/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-gitsift"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src={`https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=872566&theme=dark`}
                        alt="Gitsift - Evaluate your repository seamlessly."
                        width="250"
                        height="54"
                        style={{ width: '250px', height: '54px' }}
                    />
                </a>
            )}
        </>
    );
}

