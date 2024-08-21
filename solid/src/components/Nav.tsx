import { useLocation } from "@solidjs/router";
import ThemeController from "./ThemeController";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-primary" : "border-transparent hover:border-sky-600";
  return (
    <nav class="bg-accent/55 rounded-badge max-w-fit">
      <div class="flex justify-items-center">
        <ul class="container flex items-center p-3 text-accent-100">
          <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
            <a href="/">Home</a>
          </li>
          <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
            <a href="/about">About</a>
          </li>
        </ul>
        <span class="p-3">
          <ThemeController />
        </span>
      </div >
    </nav >
  );
}
