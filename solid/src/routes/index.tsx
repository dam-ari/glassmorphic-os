// src/routes/index.tsx
import { createSignal } from "solid-js";
import Window from "~/components/Window";

export default function Home() {
  const [windows, setWindows] = createSignal([
    { id: 1, title: "First Window", isOpen: true },
    { id: 2, title: "Second Window", isOpen: false },
  ]);

  const toggleWindow = (id: number) => {
    setWindows((prev) =>
      prev.map((win) =>
        win.id === id ? { ...win, isOpen: !win.isOpen } : win
      )
    );
  };

  return (
    <div class="min-h-screen bg-base-200 flex items-center justify-center">
      <div class="space-y-4">
        {windows().map((window) => (
          <Window
            title={window.title}
            isOpen={window.isOpen}
            onClose={() => toggleWindow(window.id)}
          >
            <p>This is content for {window.title}.</p>
          </Window>
        ))}
        <button
          class="btn btn-primary"
          onClick={() => toggleWindow(2)}
        >
          Toggle Second Window
        </button>
      </div>
    </div>
  );
}
