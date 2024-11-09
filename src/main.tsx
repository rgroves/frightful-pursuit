import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisteredPlayerRoute from "./routes/registered-player-route.tsx";
import Game from "./routes/game.tsx";
import Index from "./routes/index.tsx";
import Lobby from "./routes/lobby.tsx";
import Root from "./routes/root.tsx";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        { index: true, element: <Index /> },
        {
          path: "lobby",
          element: (
            <RegisteredPlayerRoute>
              <Lobby />
            </RegisteredPlayerRoute>
          ),
        },
        {
          path: "game",
          element: (
            <RegisteredPlayerRoute>
              <Game />
            </RegisteredPlayerRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  </StrictMode>,
);
