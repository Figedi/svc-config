import { expect } from "chai";
import { join } from "path";
import { JSONSchema, createValidator } from "@figedi/typecop";

import { ConfigRepository } from "./types";
import { getFallback } from "./fallback";

describe("fallback", () => {
    let dereferencedSchema: JSONSchema<ConfigRepository>;
    const validator = createValidator();
    before(async () => {
        dereferencedSchema = await validator.compile(join(__dirname, "./schemas/root.schema.json"));
    });

    it("should be valid according to the schema", () => {
        const fallback = getFallback();
        const isValid = validator.validate(dereferencedSchema, fallback);
        expect(isValid).to.equal(true);
    });
});
