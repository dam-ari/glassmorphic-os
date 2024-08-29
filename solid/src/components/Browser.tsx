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
    const defaultUrl = "https://www.wikipedia.com";
    const [url, setUrl] = createSignal(defaultUrl);
    const [inputValue, setInputValue] = createSignal(defaultUrl);
    const [fullScreen, setFullScreen] = createSignal(false);

    const handleInputChange = (e: Event) => {
        setInputValue((e.target as HTMLInputElement).value);
    };

    const navigateToUrl = () => {
        setUrl(inputValue());
    };

    const goHome = () => {
        setUrl(defaultUrl);
        setInputValue(defaultUrl);
        navigateToUrl();
    }

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            navigateToUrl();
        }
    };

    const icon = (classes: string, action: (_?: any) => any) => {
        return (
            <i class={`fa-solid ${classes} hover:bg-white/20 hover:rounded hover:scale-150 hover:p-1`}
                onClick={action}></i>
        )
    }

    const content = (
        <div class="browser-window h-full">
            <div class="browserNavOutline">
                <div class="browserNavBar">
                    <div class="browserNavBarElements flex items-stretch gap-0.5">
                        <div class="browserFunctions flex items-center gap-0.5">
                            {[
                                icon("fa-home", goHome),
                                icon("fa-arrow-left", () => alert("Back"))
                            ]}
                            <i class="fa-solid fa-rotate-right"></i>
                        </div>
                        <div class="urlSearchBar flex flex-1 items-stretch px-1">
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
                        <div class="browserUtilities flex items-center gap-2.5 px-2">
                            <i class="fa-solid fa-download"></i>
                            <i class="fa-regular fa-bookmark"></i>
                            <i class="fa-solid fa-bars"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class={`flex-1 overflow-hidden relative w-full ${fullScreen() ? 'h-full' : 'h-5/6'}`}>
                <iframe
                    id="myIframe"
                    class={`absolute bg-white/95 border-none rounded w-full ${fullScreen() ? 'h-[145vh]' : 'h-5/6'}`}
                    src={url()}
                    title="Browser"
                    allow="geolocation; fullscreen; microphone; camera"
                    // add zoom out to the iframe of 60%
                    style="zoom: 50%;"

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
            onFullScreen={() => setFullScreen(!fullScreen())}
            onActivate={onActivate}
            content={content}
        />
    );
}
