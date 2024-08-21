// src/components/Taskbar.tsx
import { Component, createSignal } from "solid-js";
import ThemeController from "./ThemeController";
import "./Taskbar.scss";

const Taskbar: Component = () => {
    const [clockTime, setClockTime] = createSignal(new Date());

    // Function to update time every minute
    const updateTime = () => {
        const update = () => setClockTime(new Date());
        update();
        setInterval(update, 60000);
    };
    const formatTime = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const meridiem = hours >= 12 ? "PM" : "AM";
        return `${hours % 12 || 12}:${minutes} ${meridiem}`;
    };

    const toggleWindow = (windowId: string) => {
        // const target = document.getElementById(windowId);
        // if (!target) return;
        // target.classList.toggle("hidden");
        // bringWindowToTop(windowId);
    }

    return (
        <div id="taskbar" class="">
            <div class="taskbaritems rounded w-7/12 text-accent-content">
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

            <div class="flex ">

                {/* <div class="flex justify-center align-items-middle"> */}
                <div id="time" class="float">{formatTime(clockTime())}
                    {/* <ThemeController /> */}
                </div>
                <span class="size-1 px-10 ">
                    <ThemeController />
                </span>
            </div>

            {/* </div> */}
        </div>
    );
};

export default Taskbar;
