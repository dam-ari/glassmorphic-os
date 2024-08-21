import { createSignal } from "solid-js";

type WindowProps = {
    id: string;
    title: string;
    defaultTop?: string;
    defaultLeft?: string;
    onClose: (id: string) => void;
    content: JSX.Element;
};

export default function Window({
    id,
    title,
    defaultTop = "20%",
    defaultLeft = "45%",
    onClose,
    content,
}: WindowProps) {
    const [isMinimized, setIsMinimized] = createSignal(false);
    const [isFullscreen, setIsFullscreen] = createSignal(false);

    const bringWindowToTop = () => {
        // Implement bring to top logic here
    };

    const dragStart = (e: MouseEvent, windowId: string) => {
        const target = document.getElementById(windowId);
        if (!target || target.classList.contains("fullscreen")) return;
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized());
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen());
    };

    return (
        !isMinimized() && (
            <div
                id={id}
                class={`windowPositioner ${isFullscreen() ? "fullscreen t" : ""}`}
                style={{ top: defaultTop, left: defaultLeft }}
                onMouseDown={bringWindowToTop}
            >
                <div class="window ">
                    <div class="nav" onMouseDown={(e) => dragStart(e, id)}>
                        <div>{title}</div>
                        <div class="windowActionButtons">
                            <button onClick={toggleMinimize} title="Minimize">
                                <i class="minimize fa-solid fa-trowel"></i>
                            </button>
                            <button onClick={toggleFullscreen} title="Fullscreen">
                                <i class="windowed fa-solid fa-seedling"></i>
                            </button>
                            <button onClick={() => onClose(id)} title="Close">
                                <i class="close fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                    <div class="terminalContent">{content}</div>
                </div>
            </div>
        )
    );
}