import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="app-container">
      <header>
        <div className="logo fade-in">
          <span className="logo-text creepy">Frightful Pursuit</span>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>
          Made with ❤️, 🧠, and ☕ in Chicago, IL, USA - using Astro, React,
          TypeScript, and Convex.
        </p>
      </footer>
    </div>
  );
}
