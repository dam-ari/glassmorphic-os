import { createSignal, createEffect, onMount } from "solid-js";
import "../style.scss"; // Import your styles here
import Taskbar from "./Taskbar";
import Window from "./Window";

const Desk = () => {
    // Signal to track which windows are open
    const [openWindows, setOpenWindows] = createSignal<string[]>(["Browser", "Terminal"]);
    const [blossomWindow, setBlossomWindow] = createSignal<string | null>(null);
    const [clockTime, setClockTime] = createSignal(new Date());

    // Function to update time every minute
    const updateTime = () => {
        const update = () => setClockTime(new Date());
        update();
        setInterval(update, 60000);
    };

    // Draggable and resizable window behavior
    let activeWindow: HTMLElement | null = null;

    const dragStart = (e: MouseEvent, windowId: string) => {
        const target = document.getElementById(windowId);
        if (!target || target.classList.contains("fullscreen")) return;
        activeWindow = target;
    };

    const dragMove = (e: MouseEvent) => {
        if (!activeWindow) return;
        if (activeWindow.classList.contains("fullscreen")) return;

        const { movementX, movementY } = e;
        const rect = activeWindow.getBoundingClientRect();
        activeWindow.style.top = `${rect.top + movementY}px`;
        activeWindow.style.left = `${rect.left + movementX}px`;
    };

    const dragEnd = () => {
        activeWindow = null;
    };

    const toggleWindow = (windowId: string) => {
        if (openWindows().includes(windowId)) {
            setOpenWindows(openWindows().filter((win) => win !== windowId));
        } else {
            setOpenWindows([...openWindows(), windowId]);
        }
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const meridiem = hours >= 12 ? "PM" : "AM";
        return `${hours % 12 || 12}:${minutes} ${meridiem}`;
    };

    // Function to bring a window to the top
    const bringWindowToTop = (windowId: string) => {
        const windows = document.querySelectorAll(".windowPositioner");
        windows.forEach((w) => {
            if (w instanceof HTMLElement) {
                w.style.zIndex = "0";
            }
        });
        const target = document.getElementById(windowId);
        if (target instanceof HTMLElement) {
            target.style.zIndex = "10";
        }
    };

    // Effect to manage time updates
    createEffect(updateTime);

    // Mouse event listeners for dragging
    onMount(() => {
        document.addEventListener("mousemove", dragMove);
        document.addEventListener("mouseup", dragEnd);
    });


    return (
        <div id="windowsOverlay">
            {/* Taskbar */}
            <div id="taskbar" class="">
                <div class="taskbaritems rounded w-7/12 text-gray-600">
                    <button id="startMenu">
                        <i class="fa-solid fa-vihara"></i>
                    </button>
                    <button id="BrowserToolbar" onClick={() => toggleWindow("Browser")}>
                        <i class="fa-solid fa-globe"></i>
                    </button>
                    <button id="TerminalToolbar" onClick={() => toggleWindow("Terminal")}>
                        <i class="fa-solid fa-terminal"></i>
                    </button>
                    <a class="exited" href="https://github.com/dam-ari" target="_blank">
                        <i class="fa-brands fa-github"></i>
                    </a>
                </div>
                <div id="time">{formatTime(clockTime())}</div>
            </div>

            {/* Windows */}
            {openWindows().includes("Browser") && (
                <div
                    id="Browser"
                    class="windowPositioner"
                    style={{ top: "10%", left: "10%" }}
                    onMouseDown={() => bringWindowToTop("Browser")}
                >
                    <div class="window  text-gray-600">
                        <div class="nav" onMouseDown={(e) => dragStart(e, "Browser")}>
                            <div>Browser</div>
                            <div class="windowActionButtons">
                                <button onClick={() => toggleWindow("Browser")}>
                                    <i class="close fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                        <div class="browserContent  text-gray-600">
                            <h1>BlossomOS - The glassmorphic operating system.</h1>
                            <div class="callToAction">
                                <button>Download</button>
                                <button>Learn More</button>
                            </div>
                            <div class="cards  text-gray-600">
                                <div>
                                    <h3>Glass</h3>
                                    <p>BlossomOS embraces and immortalizes new trends in UI design.</p>
                                </div>
                                <div>
                                    <h3>Blossom</h3>
                                    <p>BlossomOS keeps a calm, soothing cherry blossom aesthetic.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {openWindows().includes("Terminal") && (
                <Window
                    id={"id"}
                    title="Terminal"
                    onClose={() => toggleWindow("Terminal")}
                    content={
                        <>
                            <div id="terminalPrefix">user@blossomOS:~$</div>
                            <input type="text" class="terminalInput" />
                        </>
                    }
                />
            )}
            <div class="fixed bottom-10 left-0 w-full flex justify-center p-4">
                <Taskbar />
            </div>

        </div>
    );
};

export default Desk;
