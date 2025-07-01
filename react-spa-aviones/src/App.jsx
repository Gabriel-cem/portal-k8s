import React, { useEffect, useState } from "react";
import {
  MsalProvider,
  useMsal,
  useIsAuthenticated,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig";
import Button from "react-bootstrap/Button";
import { PageLayout } from "./components/PageLayout";
import { callMsGraph } from "./graph";
import { ProfileData } from "./components/ProfileData";
import { getUserGroups } from "./getUserGroups";
import "./App.css";

const pca = new PublicClientApplication(msalConfig);

const ProfileContent = () => {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [grupos, setGrupos] = useState([]);

  function RequestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then(setGraphData);
      });

    getUserGroups(instance, accounts[0]).then(setGrupos);
  }

  return (
    <>
      <h5 className="profileContent">Welcome {accounts[0]?.name}</h5>
      {graphData ? (
        <>
          <ProfileData graphData={graphData} />
          <h6>Grupos del usuario:</h6>
          <ul>
            {grupos.map((grupo) => (
              <li key={grupo.id}>{grupo.displayName}</li>
            ))}
          </ul>
        </>
      ) : (
        <Button variant="secondary" onClick={RequestProfileData}>
          Request Profile
        </Button>
      )}
    </>
  );
};

const AppContent = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      instance
        .ssoSilent({
          loginHint: accounts[0]?.username,
        })
        .catch(() => {
          instance.loginRedirect();
        });
    }
  }, [instance, isAuthenticated, accounts]);

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Autenticando...</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
};

export default function App() {
  return (
    <MsalProvider instance={pca}>
      <AppContent />
    </MsalProvider>
  );
}
