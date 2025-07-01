import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { getUserGroups } from "./getUserGroups";

const GruposUsuario = () => {
  const { instance, accounts } = useMsal();
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    if (accounts.length > 0) {
      getUserGroups(instance, accounts[0]).then(setGrupos);
    }
  }, [accounts, instance]);

  return (
    <div>
      <h2>Grupos del usuario</h2>
      <ul>
        {grupos.map(grupo => (
          <li key={grupo.id}>{grupo.displayName}</li>
        ))}
      </ul>
    </div>
  );
};

export default GruposUsuario;
