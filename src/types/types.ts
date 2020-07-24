export type Translation = { text: string; variables: string[] };

export interface CommonConfiguration {
    logLevel: string;
    defaultLanguage: string;
}

export interface SecretsConfiguration {
    apiKeys: {
        mapBoxApiKey: string;
        stripeApiKey: string;
    };
}

interface SopsLike {
    version: string;
    mac: string;
    lastmodified: string;
}
export interface EncryptedSecretsConfiguration extends SecretsConfiguration {
    sops: SopsLike;
}
