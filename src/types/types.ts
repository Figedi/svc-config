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
