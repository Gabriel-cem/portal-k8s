// src/PortalApp.jsx
import React from "react";
import {
  MsalProvider,
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import Button from "react-bootstrap/Button";

const pca = new PublicClientApplication(msalConfig);

const AppLinks = () => {
  return (
    <div>
      <h2>Aplicaciones Disponibles</h2>
      <ul>
        <li>
          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noopener noreferrer"
          >
            App 1 - Perfil
          </a>
        </li>

        <li>
          <a
            href="http://localhost:3002"
            target="_blank"
            rel="noopener noreferrer"
          >
            App 2 - Reportes
          </a>
        </li>
        <li>
          <a
            href="http://localhost:3003"
            target="_blank"
            rel="noopener noreferrer"
          >
            App 3 - Dashboard
          </a>
        </li>
      </ul>
      <iframe
        src="http://localhost:3001"
        title="App 1"
        width="100%"
        height="600px"
      ></iframe>
    </div>
  );
};

const PortalContent = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect();
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <div className="portal">
      <AuthenticatedTemplate>
        <h1>Bienvenido al Portal</h1>
        <AppLinks />
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h1>Por favor inicia sesión</h1>
        <Button onClick={handleLogin}>Iniciar sesión</Button>
      </UnauthenticatedTemplate>
    </div>
  );
};

export default function PortalApp() {
  return (
    <MsalProvider instance={pca}>
      <PortalContent />
    </MsalProvider>
  );
}
