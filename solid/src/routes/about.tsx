import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

export default function About() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">About Page</h1>

      <textarea class="textarea textarea-primary w-10/12 text-base-content" placeholder="text"></textarea>
    </main>
  );
}
