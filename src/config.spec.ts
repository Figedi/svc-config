import { JSONSchema, createValidator } from "@figedi/typecop";
import { expect } from "chai";
import { join } from "path";

import { ConfigRepository } from "./types";
import { getResourceFilesWithoutSops } from "./shared.specFiles/helpers";

describe("config", () => {
    let dereferencedSchema: JSONSchema<ConfigRepository>;
    const validator = createValidator();
    before(async () => {
        dereferencedSchema = await validator.compile(join(__dirname, "./schemas/root.schema.json"));
    });

    it("validates the provided schemas correctly", () => {
        // strips away sops sections from any secrets-file and replaces the fileName to secrets.json
        const resourceTree = getResourceFilesWithoutSops();

        // the root-schema has resources as top-level prop
        const resources = { resources: resourceTree };
        const isValid = validator.validate(dereferencedSchema, resources);
        expect(isValid).to.eql(true);
    });
});
