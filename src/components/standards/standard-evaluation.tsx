import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircularProgress } from "@/components/standards/circular-progress";
import { StatusItem } from "@/components/status-item";
import { RepoStandard } from "@/app/types";

export default function StandardEvaluation({ repoStandard }: { repoStandard: RepoStandard }) {
    const { standardScore, standardFiles, standardSetup, details } = repoStandard

    return (
        <div className="">
            <Card className="shadow-none rounded-md">
                <CardHeader className="bg-muted p-4 border-b border-border">
                    <CardTitle className="text-lg">Repository Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                        <div className="flex gap-10 items-center justify-center border rounded-md p-4">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <CircularProgress value={standardScore} label="Overall Score" />
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">File Score: {Math.round(details.fileScore)}%</p>
                                    <p className="text-sm text-muted-foreground">Setup Score: {Math.round(details.setupScore)}%</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Quick Overview</h3>
                                <div className="space-y-2">
                                    <StatusItem label="License" present={standardFiles["LICENSE"]} />
                                    <StatusItem label="README" present={standardFiles["README.md"]} />
                                    <StatusItem label="Security Policy" present={standardSetup.securityPolicy.present} />
                                    <StatusItem label="Branch Protection" present={standardSetup.hasBranchProtection.present} />
                                </div>
                            </div>
                        </div>
                        <Tabs defaultValue="files">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="files">Standard Files</TabsTrigger>
                                <TabsTrigger value="setup">Repository Setup</TabsTrigger>
                            </TabsList>
                            <div className="mt-4 border rounded-md">
                                <TabsContent value="files" className="m-0">
                                    <ScrollArea className="h-[300px] p-4">
                                        <div className="grid gap-2">
                                            {Object.entries(standardFiles).map(([file, present]) => (
                                                <StatusItem key={file} label={file} present={present} />
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent value="setup" className="m-0">
                                    <ScrollArea className="h-[300px] p-4">
                                        <div className="grid gap-2 capitalize">
                                            {Object.entries(standardSetup).map(([item, { present, weight }]) => (
                                                <StatusItem
                                                    key={item}
                                                    label={item.replace(/([A-Z])/g, ' $1').trim()}
                                                    present={present}
                                                    weight={weight}
                                                />
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

