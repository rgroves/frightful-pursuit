import { ConvexProvider, ConvexReactClient } from "convex/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameWithPlayerInfo from "./routes/game.tsx";
import IndexWithPlayerInfo from "./routes/index.tsx";
import LobbyWithPlayerInfo from "./routes/lobby.tsx";
import Root from "./routes/root.tsx";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <IndexWithPlayerInfo />,
        },
        {
          path: "lobby",
          element: <LobbyWithPlayerInfo />,
        },
        {
          path: "game",
          element: <GameWithPlayerInfo />,
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

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </ConvexProvider>
  </StrictMode>,
);
