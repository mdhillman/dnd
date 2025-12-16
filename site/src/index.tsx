import { FC, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapPage from "./pages/map/page-map";
import InfoPanel from "./components/info-panel/info-panel";
import { Buffer } from "buffer";
import { LandingPage } from "./components/landing-page/landing-page";
import { getCodesFromCookie } from "./utilties";
import { CookieContext } from "./contexts";
import { createTheme, ThemeProvider } from "@mui/material";
import WrapWithNavigation from "./components/wrap-with-navigation/wrap-with-navigation";

import "./global.css";

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
    if (!cookies.includes("accept-cookies")) {
        return <LandingPage />;
    }

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
                    <Route path="/" element={<CookieGate />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route
                        path="/map"
                        element={
                            <WrapWithNavigation>
                                <MapPage />
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
        <BrowserRouter>
            <SiteWrapper />
        </BrowserRouter>,
    );
}
