import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircularProgress } from "@/components/standards/circular-progress";
import { StatusItem } from "@/components/status-item";
import { RepoStandard } from "@/app/types";
import { FileChartColumnIncreasing, FileIcon, Settings, Shield, GitBranch, Code, Lock, FileText, File, Tags } from "lucide-react";

const setupIcons = {
    license: File,
    codeOfConduct: FileText,
    issueTemplate: FileText,
    securityPolicy: Shield,
    hasTags: Tags,
    hasBranchProtection: GitBranch,
    hasContributionGuidelines: FileText,
    hasVulnerabilityAlerts: Shield,
    hasCodeOwners: Code,
    hasDependabot: Lock,
    hasReadme: FileText,
    default: Settings
};

export default function StandardEvaluation({ repoStandard }: { repoStandard: RepoStandard }) {
    const { standardScore, standardFiles, standardSetup, details } = repoStandard

    return (
        <div>
            <Card className="shadow-none rounded-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold">Repository Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col md:flex-row gap-4 lg:gap-10 items-center justify-center lg:px-10">
                            <div className="flex flex-col items-center justify-center space-y-4">
                                <CircularProgress value={standardScore} label="Overall Score" />
                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">Standard File Score: {Math.round(details.fileScore)}%</p>
                                    <p className="text-sm text-muted-foreground">Standard Setup Score: {Math.round(details.setupScore)}%</p>
                                </div>
                            </div>
                            <div className="space-y-4 w-full">
                                <div className="flex items-center gap-2">
                                    <FileChartColumnIncreasing className="h-5 w-5" />
                                    <h3 className="text-lg font-semibold">Quick Overview</h3>
                                </div>
                                <div className="space-y-2">
                                    <StatusItem label="License" present={standardFiles["LICENSE"]} icon={<File className="w-4 h-4 text-muted-foreground" />} />
                                    <StatusItem label="README" present={standardFiles["README.md"]} icon={<FileText className="w-4 h-4 text-muted-foreground" />} />
                                    <StatusItem label="Security Policy" present={standardSetup.securityPolicy.present} icon={<Shield className="w-4 h-4 text-muted-foreground" />} />
                                    <StatusItem label="Branch Protection" present={standardSetup.hasBranchProtection.present} icon={<GitBranch className="w-4 h-4 text-muted-foreground" />} />
                                </div>
                            </div>
                        </div>
                        <Tabs defaultValue="files" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="files" className="rounded-md">Standard Files</TabsTrigger>
                                <TabsTrigger value="setup" className="rounded-md">Repository Setup</TabsTrigger>
                            </TabsList>
                            <div className="mt-4 border rounded-md">
                                <TabsContent value="files" className="m-0">
                                    <ScrollArea className="h-[300px] p-2">
                                        <div className="grid gap-2">
                                            {Object.entries(standardFiles).map(([file, present]) => (
                                                <StatusItem
                                                    key={file}
                                                    label={file}
                                                    present={present}
                                                    icon={<FileIcon className="w-4 h-4 text-muted-foreground" />}
                                                    className="text-sm lg:text-base"
                                                />
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </TabsContent>
                                <TabsContent value="setup" className="m-0">
                                    <ScrollArea className="h-[300px] p-2">
                                        <div className="grid gap-2 capitalize">
                                            {Object.entries(standardSetup).map(([item, { present, weight }]) => {
                                                const IconComponent = setupIcons[item as keyof typeof setupIcons] || setupIcons.default;
                                                return (
                                                    <StatusItem
                                                        key={item}
                                                        label={item.replace(/([A-Z])/g, ' $1').trim()}
                                                        present={present}
                                                        weight={weight}
                                                        icon={<IconComponent className="w-4 h-4 text-muted-foreground" />}
                                                        className="text-sm lg:text-base"
                                                    />
                                                );
                                            })}
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

