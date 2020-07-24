import { omit, isArray, isPlainObject, mapValues } from "lodash";
import { readdirSync } from "fs";
import { join } from "path";

export interface TreeNodeTransformerConfig {
    predicate: (refValue: any, path: (string | number)[]) => boolean;
    transform: (refValue: any, path: (string | number)[]) => any;
}

const walk = (tree: any, pathMemo: (string | number)[], ...transformers: TreeNodeTransformerConfig[]): any => {
    const transformer = transformers.find(({ predicate }) => predicate(tree, pathMemo));
    if (transformer) {
        return transformer.transform(tree, pathMemo);
    }
    if (isArray(tree)) {
        return tree.map((v, i) => walk(v, [...pathMemo, i], ...transformers));
    }
    if (isPlainObject(tree)) {
        return mapValues(tree, (v, k) => walk(v, [...pathMemo, k], ...transformers));
    }

    return tree;
};

export const treeWalker = <T>(tree: T, ...transformers: TreeNodeTransformerConfig[]): T => {
    return walk(tree, [], ...transformers);
};

export const getResourceTree = (basePath: string, nameSuffix: string): Record<string, any> => {
    const files = readdirSync(basePath, { withFileTypes: true });

    return files.reduce((acc, file) => {
        if (file.isDirectory()) {
            return {
                ...acc,
                [file.name]: getResourceTree(join(basePath, file.name), nameSuffix),
            };
        }
        if (file.isFile() && file.name.endsWith(nameSuffix)) {
            const fileName = file.name.endsWith(".enc.json") ? file.name.replace(".enc", "") : file.name;
            return {
                ...acc,
                [fileName]: require(join(basePath, file.name)),
            };
        }
        return acc;
    }, {});
};

export const getResourceFilesWithoutSops = (): Record<string, any> => {
    const baseResourceTree = getResourceTree(join(__dirname, "../../resources"), ".json");
    return treeWalker(baseResourceTree, {
        predicate: (_, path) => {
            const parentKey = String(path[path.length - 1]);
            return parentKey.includes("secrets.json");
        },
        transform: value => omit(value, "sops"),
    });
};
