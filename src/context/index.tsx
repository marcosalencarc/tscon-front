import { createContext, useContext, useReducer, useMemo } from "react";

// Tipos para o estado do contexto
interface ControllerState {
  openSidenav: boolean;
  sidenavColor: string;
  sidenavType: string;
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
}

// Tipos para as ações do reducer
type ControllerAction =
  | { type: "OPEN_SIDENAV"; value: boolean }
  | { type: "SIDENAV_TYPE"; value: string }
  | { type: "SIDENAV_COLOR"; value: string }
  | { type: "TRANSPARENT_NAVBAR"; value: boolean }
  | { type: "FIXED_NAVBAR"; value: boolean }
  | { type: "OPEN_CONFIGURATOR"; value: boolean };

// Tipo para o contexto
type MaterialTailwindContextType = [
  ControllerState,
  React.Dispatch<ControllerAction>
];

// Criando o contexto com tipo e valor padrão
export const MaterialTailwind = createContext<MaterialTailwindContextType | null>(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

// Reducer com tipagem
export function reducer(state: ControllerState, action: ControllerAction): ControllerState {
  switch (action.type) {
    case "OPEN_SIDENAV":
      return { ...state, openSidenav: action.value };
    case "SIDENAV_TYPE":
      return { ...state, sidenavType: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    default:
      throw new Error(`Unhandled action type: ${(action as ControllerAction).type}`);
  }
}

// Props do provider
interface MaterialTailwindControllerProviderProps {
  children: React.ReactNode;
}

// Componente Provider com tipagem
export function MaterialTailwindControllerProvider({
  children,
}: MaterialTailwindControllerProviderProps) {
  const initialState: ControllerState = {
    openSidenav: false,
    sidenavColor: "blue-gray",
    sidenavType: "white",
    transparentNavbar: true,
    fixedNavbar: false,
    openConfigurator: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);
  const value = useMemo<MaterialTailwindContextType>(
    () => [controller, dispatch],
    [controller] 
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.tsx";

// Hook personalizado com tipagem
export function useMaterialTailwindController(): MaterialTailwindContextType {
  const context = useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

// Funções auxiliares com tipagem
export const setOpenSidenav = (
  dispatch: React.Dispatch<ControllerAction>,
  value: boolean
) => dispatch({ type: "OPEN_SIDENAV", value });

export const setSidenavType = (
  dispatch: React.Dispatch<ControllerAction>,
  value: string
) => dispatch({ type: "SIDENAV_TYPE", value });

export const setSidenavColor = (
  dispatch: React.Dispatch<ControllerAction>,
  value: string
) => dispatch({ type: "SIDENAV_COLOR", value });

export const setTransparentNavbar = (
  dispatch: React.Dispatch<ControllerAction>,
  value: boolean
) => dispatch({ type: "TRANSPARENT_NAVBAR", value });

export const setFixedNavbar = (
  dispatch: React.Dispatch<ControllerAction>,
  value: boolean
) => dispatch({ type: "FIXED_NAVBAR", value });

export const setOpenConfigurator = (
  dispatch: React.Dispatch<ControllerAction>,
  value: boolean
) => dispatch({ type: "OPEN_CONFIGURATOR", value });