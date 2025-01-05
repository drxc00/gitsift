import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export function InsightsCard({ insights }: { insights: string[] }) {
    return (
        <Card className="shadow-none rounded-md">
            <CardHeader className="bg-muted p-4 border-b border-border">
                <CardTitle className="text-lg">Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] mt-6 p-4 border rounded-md bg-muted flex flex-col">
                    <div className="space-y-2">
                        {insights.map((insight, index) => (
                            <div key={index} className="bg-background border p-4 rounded-md">
                                <p className="text-muted-foreground flex items-center gap-2">
                                    <Lightbulb className="text-green-500 mt-1 w-5 h-5" />
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
