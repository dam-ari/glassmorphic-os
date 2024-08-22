import { createSignal, onMount, onCleanup } from "solid-js";
import Window from "./Window";

export default function BrowserWindow({
    id,
    title,
    defaultTop = "5%",
    defaultLeft = "10%",
    defaultWidth = "800px",
    defaultHeight = "600px",
    zIndex,
    onClose,
    onActivate,
}: {
    id: string;
    title: string;
    defaultTop?: string;
    defaultLeft?: string;
    defaultWidth?: string;
    defaultHeight?: string;
    zIndex: number;
    onClose: (id: string) => void;
    onActivate: (id: string) => void;
}) {
    const [url, setUrl] = createSignal("https://www.wikipedia.com");
    const [inputValue, setInputValue] = createSignal("https://www.wikipedia.com");

    const handleInputChange = (e: Event) => {
        setInputValue((e.target as HTMLInputElement).value);
    };

    const navigateToUrl = () => {
        setUrl(inputValue());
    };

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            navigateToUrl();
        }
    };

    const content = (
        <div class="browser-window h-full">
            <div class="browserNavOutline">
                <div class="browserNavBar">
                    <div class="browserNavBarElements flex items-center gap-2">
                        <div class="browserFunctions flex items-center gap-2">
                            <i class="fa-solid fa-vihara"></i>
                            <i class="fa-solid fa-rotate-right"></i>
                        </div>
                        <div class="urlSearchBar flex flex-1 items-center gap-2 px-2">
                            <input
                                type="text"
                                value={inputValue()}
                                onInput={handleInputChange}
                                onKeyPress={handleKeyPress}
                                class="flex-1 p-2 rounded bg-glass text-white placeholder-gray-300"
                                placeholder="Enter URL"
                            />
                            <button
                                class="p-2 rounded bg-glass text-white hover:bg-white/20"
                                onClick={navigateToUrl}
                            >
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                        <div class="browserUtilities flex items-center gap-2">
                            <i class="fa-solid fa-download"></i>
                            <i class="fa-regular fa-bookmark"></i>
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 overflow-hidden relative w-full h-5/6">
                <iframe
                    id="myIframe"
                    class="absolute bg-white/95 border-none h-5/6 rounded w-full"
                    src={url()}
                    title="Browser"
                    allow="geolocation; fullscreen; microphone; camera"

                />
            </div>
        </div>
    );

    return (
        <Window
            id={id}
            title={title}
            defaultTop={defaultTop}
            defaultLeft={defaultLeft}
            defaultWidth={defaultWidth}
            defaultHeight={defaultHeight}
            zIndex={zIndex}
            onClose={onClose}
            onActivate={onActivate}
            content={content}
        />
    );
}
