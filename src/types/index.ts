import { EncryptedSecretsConfiguration, CommonConfiguration } from "./types";

export * from "./types";

export interface ConfigRepository {
    resources: {
        configs: {
            service: {
                "common.json": CommonConfiguration;
            };
            "secrets.enc.json": EncryptedSecretsConfiguration;
        };
    };
}
