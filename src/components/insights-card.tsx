import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkle } from "lucide-react";

export function InsightsCard({ insights }: { insights: string[] }) {
    return (
        <Card className="shadow-none rounded-md">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[200px] p-4 border rounded-md flex flex-col">
                    <div className="space-y-2">
                        {insights.map((insight, index) => (
                            <div key={index} className="bg-muted p-2 rounded-md">
                                <p className=" dark:text-white flex items-center gap-2 text-xs md:text-base">
                                    <Sparkle className="text-muted-foreground mt-1 w-5 h-5 md:w-4 md:h-4" />
                                    {insight}
                                </p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
