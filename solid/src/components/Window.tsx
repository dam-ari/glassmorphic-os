import { createSignal, JSX, onCleanup, onMount } from "solid-js";
import "./Window.scss";

type WindowProps = {
    id: string;
    title: string;
    defaultTop?: string;
    defaultLeft?: string;
    defaultWidth?: string;
    defaultHeight?: string;
    zIndex: number;
    onClose: (id: string) => void;
    onFullScreen?: () => void;
    onActivate: (id: string) => void;
    content: JSX.Element;
};

export default function Window({
    id,
    title,
    defaultTop = "20%",
    defaultLeft = "45%",
    defaultWidth = "550px",
    defaultHeight = "400px",
    zIndex,
    onClose,
    onFullScreen,
    onActivate,
    content,
}: WindowProps) {
    const [isMinimized, setIsMinimized] = createSignal(false);
    const [isFullscreen, setIsFullscreen] = createSignal(false);
    const [position, setPosition] = createSignal({ top: defaultTop, left: defaultLeft });
    const [size, setSize] = createSignal({ width: defaultWidth, height: defaultHeight });

    let isDragging = false;
    let initialMousePos = { x: 0, y: 0 };

    const dragStart = (e: MouseEvent) => {
        if (isFullscreen()) return;
        isDragging = true;
        initialMousePos = { x: e.clientX, y: e.clientY };
        if (typeof window !== "undefined") {
            document.addEventListener("mousemove", dragMove);
            document.addEventListener("mouseup", dragEnd);
        }
    };

    const dragMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const dx = e.clientX - initialMousePos.x;
        const dy = e.clientY - initialMousePos.y;
        const newTop = `${parseFloat(position().top) + dy}px`;
        const newLeft = `${parseFloat(position().left) + dx}px`;
        setPosition({ top: newTop, left: newLeft });
        initialMousePos = { x: e.clientX, y: e.clientY };
    };

    const dragEnd = () => {
        isDragging = false;
        if (typeof window !== "undefined") {
            document.removeEventListener("mousemove", dragMove);
            document.removeEventListener("mouseup", dragEnd);
        }
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized());
    };

    const toggleFullscreen = () => {
        if (isFullscreen()) {
            setSize({ width: defaultWidth, height: defaultHeight });
            setPosition({ top: defaultTop, left: defaultLeft });
        } else {
            setSize({ width: "100vw", height: "100vh" });
            setPosition({ top: "0", left: "0" });

        }

        setIsFullscreen(!isFullscreen());
        if (onFullScreen) {
            onFullScreen();
        }
    };

    const handleResize = (e: MouseEvent, direction: string) => {
        const startPos = { x: e.clientX, y: e.clientY };
        const startSize = { width: parseFloat(size().width), height: parseFloat(size().height) };

        const resizeMove = (event: MouseEvent) => {
            const dx = event.clientX - startPos.x;
            const dy = event.clientY - startPos.y;
            if (direction.includes("right")) {
                setSize((prev) => ({ ...prev, width: `${startSize.width + dx}px` }));
            }
            if (direction.includes("bottom")) {
                setSize((prev) => ({ ...prev, height: `${startSize.height + dy}px` }));
            }
        };

        const resizeEnd = () => {
            if (typeof window !== "undefined") {
                document.removeEventListener("mousemove", resizeMove);
                document.removeEventListener("mouseup", resizeEnd);
            }
        };

        if (typeof window !== "undefined") {
            document.addEventListener("mousemove", resizeMove);
            document.addEventListener("mouseup", resizeEnd);
        }
    };

    onCleanup(() => {
        if (typeof window !== "undefined") {
            document.removeEventListener("mousemove", dragMove);
            document.removeEventListener("mouseup", dragEnd);
        }
    });

    return (
        <div
            id={id}
            class={`windowPositioner ${isFullscreen() ? "fullscreen" : ""}`}
            style={{ top: position().top, left: position().left, width: size().width, height: size().height, zIndex }}
            onMouseDown={() => onActivate(id)}
        >
            <div class="window">
                <div class="nav" onMouseDown={dragStart}>
                    <div class="text-accent-content">{title}</div>
                    <div class="windowActionButtons">
                        <button onClick={toggleMinimize} title="Minimize">
                            <i class="minimize fa-solid fa-trowel "></i>
                        </button>
                        <button onClick={toggleFullscreen} title="Fullscreen ">
                            <i class="windowed fa-solid fa-seedling  "></i>
                        </button>
                        <button onClick={() => onClose(id)} title="Close">
                            <i class="close fa-solid fa-trash-can  "></i>
                        </button>
                    </div>
                </div>
                <div class="resizer" onMouseDown={(e) => handleResize(e, "right-bottom")}>
                    {/* Corner Resize Element */}
                </div>
                <div class="Content text-primary-content h-full">{content}</div>
            </div>
        </div>
    );
}
