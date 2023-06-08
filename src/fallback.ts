/* eslint-disable import/no-dynamic-require */
import { join, extname } from "path";
import { readdirSync, readFileSync, Dirent } from "fs";
import { RESOURCE_BASE_DIR } from "./utils";
import { ConfigRepository } from "./types";

const convertFile = (filePath: string, file: Dirent) => {
    if (extname(file.name) === ".json") {
        return require(filePath);
    }
    return readFileSync(filePath).toString("base64");
};

const readDirectory = (directoryPath: string): Record<string, any> => {
    const dirs = readdirSync(directoryPath, { withFileTypes: true });
    return dirs.reduce((acc, dir) => {
        if (dir.isDirectory()) {
            return { ...acc, [dir.name]: readDirectory(join(directoryPath, dir.name)) };
        }
        return {
            ...acc,
            [dir.name]: convertFile(join(directoryPath, dir.name), dir),
        };
    }, {});
};

export const getFallback = (): ConfigRepository => {
    const fallback = readDirectory(RESOURCE_BASE_DIR) as ConfigRepository["resources"];
    return { resources: fallback };
};
