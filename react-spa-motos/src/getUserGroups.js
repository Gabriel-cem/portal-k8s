import { loginRequest } from "./authConfig";

export const getUserGroups = async (msalInstance, account) => {
  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });

    const token = response.accessToken;

    const graphResponse = await fetch(
      "https://graph.microsoft.com/v1.0/me/memberOf",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await graphResponse.json();

    const grupos = data.value.filter(
      (item) =>
        item["@odata.type"] === "#microsoft.graph.group" &&
        item.displayName.startsWith("G_TEST_HOMEAPP_MOTOS")
    );

    return grupos;
  } catch (error) {
    console.error("Error al obtener los grupos del usuario:", error);
    return [];
  }
};
