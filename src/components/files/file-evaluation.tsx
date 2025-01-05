import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusItem } from "@/components/status-item";
import { CheckCircleIcon, FileWarning } from "lucide-react";
import { RepoFiles } from "@/app/types";

export default function FileEvaluation({ data }: { data: RepoFiles }) {
    const { forbiddenFiles, details } = data

    const fileCategories = {
        "Environment Files": [".env", ".env.local", ".env.development", ".env.production", ".env.backup"],
        "SSH Keys": ["id_rsa", "id_rsa.pub"],
        "Authentication Files": [".htpasswd", "auth.json", "credentials.json", "secret.key"],
        "Configuration Files": ["config.php", "wp-config.php", "database.yml", "settings.py", "configuration.php"],
        "Database Files": [".sqlite", ".sqlite3", ".mdb", "dump.sql", "database.sql"],
        "Log Files": [".log", "error.log", "debug.log", "npm-debug.log"],
        "System Files": [".DS_Store", "Thumbs.db"],
        "Cache Files": [".sass-cache"],
        "IDE Files": [".idea/", ".vscode/"],
        "Dependency Files": ["yarn.lock", "package-lock.json", "node_modules/"],
        "Build Files": ["dist/", "build/"],
        "AWS Files": ["aws.config", "credentials.csv", ".aws/credentials"],
        "Certificate Files": [".pfx", ".crt", ".cer", ".pem", ".p12"],
        "Backup Files": [".bak", ".swp", "~", ".old"]
    }

    return (
        <div className="">
            <Card className="shadow-none rounded-md">
                <CardHeader className="bg-muted p-4 border-b border-border">
                    <CardTitle className="text-lg">File Evaluation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start mt-4">
                        {/* Left Section */}
                        <div className="flex flex-col h-full justify-between">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Quick Overview</h3>
                                {details.criticalFiles.length > 0 ? (
                                    <div className="flex items-center gap-2 text-yellow-500">
                                        <FileWarning className="w-4 h-4 " />
                                        <span>Critical Files Found</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-green-500">
                                        <CheckCircleIcon className="w-4 h-4 " />
                                        <span>No Critical Files Found</span>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-4">
                                <ScrollArea className="h-[200px] p-4 border border-border rounded-md">
                                    <div className="flex flex-col gap-2">
                                        {Object.entries(fileCategories).map(([category, files]) => {
                                            const hasCriticalFiles = files.some(file =>
                                                details.criticalFiles.includes(file)
                                            );
                                            return (
                                                <StatusItem
                                                    key={category}
                                                    label={category}
                                                    present={!hasCriticalFiles}
                                                />
                                            );
                                        })}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="space-y-4">
                            <Tabs defaultValue="all">
                                <TabsList className="grid grid-cols-2">
                                    <TabsTrigger value="all">All Files</TabsTrigger>
                                    <TabsTrigger value="categories">Categories</TabsTrigger>
                                </TabsList>
                                <div className="mt-4 border rounded-md">
                                    <TabsContent value="all" className="m-0">
                                        <ScrollArea className="h-[200px] p-4">
                                            <div className="grid gap-2">
                                                {Object.entries(forbiddenFiles).map(([file]) => {
                                                    const isCritical = details.criticalFiles.includes(file);
                                                    return (
                                                        <StatusItem key={file} label={file} present={!isCritical} />
                                                    );
                                                })}
                                            </div>
                                        </ScrollArea>
                                    </TabsContent>
                                    <TabsContent value="categories" className="m-0">
                                        <ScrollArea className="h-[200px] p-4">
                                            <div className="space-y-4">
                                                {Object.entries(fileCategories).map(([category, files]) => (
                                                    <div key={category}>
                                                        <h4 className="font-semibold mb-2">{category}</h4>
                                                        <div className="grid gap-2">
                                                            {files.map((file) => {
                                                                const isCritical = details.criticalFiles.includes(file);
                                                                return (
                                                                    <StatusItem key={file} label={file} present={!isCritical} />
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

