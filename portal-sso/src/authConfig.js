export const msalConfig = {
  auth: {
    clientId: "ad4f6904-2f95-46d7-8313-53b3a81645b6",
    authority:
      "https://login.microsoftonline.com/c562f4db-f28b-4fa8-9dac-e8f89e8532db",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const loginRequest = {
  scopes: ["User.Read", "GroupMember.Read.All"],
};
