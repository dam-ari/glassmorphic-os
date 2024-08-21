import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";
import Taskbar from "./components/Taskbar";
import "./style.scss";
import Desk from "./components/desk";


export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Desk />
          {/* <Suspense>{props.children}</Suspense>
          <Nav />
          <Taskbar /> */}
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
