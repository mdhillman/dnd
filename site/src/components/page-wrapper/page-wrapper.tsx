import { FC, ReactNode, useEffect, useState } from "react";
import SidePanel from "../side-panel/side-panel";

import styles from './page-wrapper.module.css';
import { MAIN_LINKS } from "../../data/links";
import { CookieContext } from "../../contexts";
import { getCodesFromCookie } from "../../utilties";
import { CodeModal } from "../code-modal/code-modal";
import { NavigationBar } from "../nav-bar/nav-bar";
import { createTheme, ThemeProvider } from "@mui/material";

export interface PageWrapperProps {
    children?: ReactNode;
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

/**
 * 
 * @returns 
 */
const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
    const [cookies, setCookies] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setCookies(getCodesFromCookie());
    }, []);

    return (
        <ThemeProvider theme={darkTheme}>
            <CookieContext.Provider value={cookies}>
                <CodeModal open={modalOpen} />

                <NavigationBar onModalOpen={() => setModalOpen(true)} />
                <div className={styles.container}>
                    <SidePanel links={MAIN_LINKS} />
                    {children}
                </div>
            </CookieContext.Provider>
        </ThemeProvider>
    );

}

export default PageWrapper;