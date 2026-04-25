import { FC, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import MapPage from "./pages/map/page-map";
import InfoPanel from "./components/info-panel/info-panel";
import { Buffer } from "buffer";
import { LandingPage } from "./pages/landing/landing-page";
import { getCodesFromCookie } from "./cookies";
import { CookieContext } from "./contexts";
import { createTheme, ThemeProvider } from "@mui/material";
import WrapWithNavigation from "./components/wrap-with-navigation/wrap-with-navigation";

import "./global.css";
import HistoryPage from "./pages/history/page-history";
import GodsPage from "./pages/gods/page-gods";
import InteractiveMap from "./components/interactive-map/interactive-map";
import { LocalMapsPage } from "./pages/local-maps/local-maps";

// Check if the Buffer global is defined, if not, attach the polyfill
if (typeof window !== "undefined" && typeof window.Buffer === "undefined") {
    window.Buffer = Buffer;
}

// Used to ensure Material is using the dark theme
const materialDarkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

// When visiting the root page, gates access if the cookie is not set
const CookieGate: FC = () => {
    const cookies = useContext(CookieContext).sort();
    // if (!cookies.includes("accept-cookies")) {
    //     return <LandingPage />;
    // }

    return (
        <WrapWithNavigation>
            <InfoPanel />
        </WrapWithNavigation>
    );
};

/*
 * Top level wrapper that defines routes and adds site-wide contexts.
 */
const SiteWrapper: FC = () => {
    const [cookies, setCookies] = useState<string[]>([]);

    useEffect(() => {
        setCookies(getCodesFromCookie());
    }, []);

    return (
        <CookieContext.Provider value={cookies}>
            <ThemeProvider theme={materialDarkTheme}>
                <Routes>
                    <Route
                        path=""
                        element={
                            <WrapWithNavigation>
                                <InfoPanel />
                            </WrapWithNavigation>
                        }
                    />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route
                        path="/world-map"
                        element={
                            <WrapWithNavigation>
                                <InteractiveMap mainMapUrl="/dnd/images/world-map.svg" />
                            </WrapWithNavigation>
                        }
                    />
                    <Route
                        path="/camorr-map"
                        element={
                            <WrapWithNavigation>
                                <InteractiveMap mainMapUrl="/dnd/images/camorr-map.svg" />
                            </WrapWithNavigation>
                        }
                    />
                    <Route
                        path="/local-maps"
                        element={
                            <WrapWithNavigation>
                                <LocalMapsPage />
                            </WrapWithNavigation>
                        }
                    />
                    <Route
                        path="/info"
                        element={
                            <WrapWithNavigation>
                                <InfoPanel />
                            </WrapWithNavigation>
                        }
                    />
                    <Route
                        path="/history"
                        element={
                            <WrapWithNavigation>
                                <HistoryPage />
                            </WrapWithNavigation>
                        }
                    />
                    <Route
                        path="/gods"
                        element={
                            <WrapWithNavigation>
                                <GodsPage />
                            </WrapWithNavigation>
                        }
                    />
                </Routes>
            </ThemeProvider>
        </CookieContext.Provider>
    );
};

/*
 * Render the site.
 */
const container = document.querySelector("#root");
if (container != null) {
    const root = ReactDOM.createRoot(container);
    root.render(
        <HashRouter>
            <SiteWrapper />
        </HashRouter>
    );
}
