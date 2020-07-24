import { SecretsConfiguration, CommonConfiguration } from "./types";

export * from "./types";

export interface ConfigRepository {
    resources: {
        configs: {
            service: {
                "common.json": CommonConfiguration;
            };
            tenant: {
                [tenantName: string]: {
                    "secrets.json": SecretsConfiguration;
                    [fileName: string]: SecretsConfiguration | string;
                };
            };
        };
    };
}
