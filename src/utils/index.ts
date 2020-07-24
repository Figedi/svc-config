import { JSONSchema } from "@figedi/typecop";
import { readdirSync, Dirent } from "fs";
import { join } from "path";
import pkgUp from "pkg-up";
import { ConfigRepository } from "../types";

const getFiles = (basePath: string, nameSuffix: string): Dirent[] => {
    const files = readdirSync(basePath, { withFileTypes: true });
    return files.filter(file => file.isFile() && file.name.endsWith(nameSuffix));
};

export const SCHEMA_BASE_DIR = join(__dirname, "..", "schemas");
export const RESOURCE_BASE_DIR = join(__dirname, "..", "..", "resources");
export const getSchemas = (): Record<string, any> =>
    getFiles(SCHEMA_BASE_DIR, "schema.json").reduce(
        (acc, file) => ({
            ...acc,
            [file.name.replace(".schema", "")]: require(join(SCHEMA_BASE_DIR, file.name)),
        }),
        {},
    );

export const getRootSchema = (): JSONSchema<ConfigRepository> => {
    const [rootSchema] = getFiles(SCHEMA_BASE_DIR, "root.schema.json");
    if (!rootSchema) {
        throw new Error(`No root.schema.json found in ${SCHEMA_BASE_DIR}.`);
    }

    return require(join(SCHEMA_BASE_DIR, rootSchema.name));
};

export const getVersion = (): string => {
    const packageJsonPath = pkgUp.sync({ cwd: __dirname });
    if (!packageJsonPath) {
        throw new Error(`Could not locate package-json of svc-config, is it correctly installed?`);
    }
    return require(packageJsonPath).version;
};
