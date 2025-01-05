import { GitTree, ParseTreeItem } from "@/app/types";

export function ParseTree(rawTree: GitTree) {
    const tree: Record<string, ParseTreeItem> = {};

    // Iterate over each item in the tree
    rawTree.tree.forEach((item) => {
        // Split the path into parts
        const pathParts = item.path.split("/");
        // Start at the root of the tree
        let currentLevel: Record<string, ParseTreeItem> = tree;

        // Iterate over each part of the path, it will create the necessary nested objects
        pathParts.forEach((part, index) => {
            // Check if the part is already in the current level
            if (!currentLevel[part]) {
                // If it isn't, add the part to the current level
                currentLevel[part] = {
                    name: part,
                    type: item.type,
                    path: item.path,
                    children: {} as Record<string, ParseTreeItem>,
                    mode: item.mode,
                    sha: item.sha,
                    url: item.url,
                };
            }
            // If it's the last part of the path, add the item details to the current level
            if (index === pathParts.length - 1) {
                // Add additional file/directory details
                currentLevel[part] = {
                    ...currentLevel[part],
                    ...item,
                };
            }
            // Else move to the next level
            // If there are no more parts, this does nothing
            currentLevel = currentLevel[part].children as Record<string, ParseTreeItem>;
        });
    });

    return tree;
}    