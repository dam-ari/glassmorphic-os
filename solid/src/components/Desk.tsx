import { createSignal, createEffect, onMount } from "solid-js";
import "../style.scss"; // Import your styles here
import Taskbar from "./Taskbar";
import Window from "./Window";
import Browser from "./Browser";

const Desk = () => {
    // Signal to track which windows are open
    const [openWindows, setOpenWindows] = createSignal<string[]>(["Browser", "Terminal"]);
    const [zIndexMap, setZIndexMap] = createSignal<{ [key: string]: number }>({});

    const toggleWindow = (windowId: string) => {
        if (openWindows().includes(windowId)) {
            setOpenWindows(openWindows().filter((win) => win !== windowId));
        } else {
            setOpenWindows([...openWindows(), windowId]);
        }
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

    return (
        <div id="windowsOverlay">


            {/* Windows */}
            {openWindows().includes("Browser") && (
                <Browser
                    id="Browser"
                    title="Browser Rock"
                    defaultTop="10%"
                    defaultLeft="10%"
                    onClose={() => toggleWindow("Browser")}
                    onActivate={() => bringWindowToTop("Browser")}
                    zIndex={zIndexMap().Browser || 0}


                />
                // <Window
                //     id="Browser"
                //     title="Browser Rock"
                //     defaultTop="10%"
                //     defaultLeft="10%"
                //     onClose={() => toggleWindow("Browser")}
                //     onActivate={() => bringWindowToTop("Browser")}
                //     zIndex={zIndexMap().Browser || 0}
                //     content={
                //         <>

                //         </>

                //     }
                // />
            )}

            {openWindows().includes("Terminal") && (
                <Window
                    id="Terminal"
                    title="Terminal"
                    onClose={() => toggleWindow("Terminal")}
                    onActivate={() => bringWindowToTop("Terminal")}
                    zIndex={zIndexMap().Terminal || 0}
                    content={
                        <div class="terminalContent">
                            <div id="terminalPrefix">user@blossomOS:~$</div>
                            <input id="terminalInput" type="text" class="terminalInput urlSearchBar" placeholder="Enter command..." />
                        </div>
                    }
                />
            )}


            {/* Taskbar */}
            <div class="fixed bottom-10 left-0 w-full flex justify-center p-4">

                <Taskbar toggleWindow={toggleWindow} />
            </div>
        </div>
    );
};

export default Desk;
