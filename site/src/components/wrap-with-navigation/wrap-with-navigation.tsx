import { FC, ReactNode, useEffect, useState } from "react";
import SidePanel from "../side-panel/side-panel";
import { MAIN_LINKS } from "../../data/links";
import { CodeModal } from "../code-modal/code-modal";
import { NavigationBar } from "../nav-bar/nav-bar";

import styles from "./wrap-with-navigation.module.css";
import { useWindowDimensions } from "../../hooks";
import { useLocation } from "react-router-dom";

interface WrapWithNavigationProps {
    children?: ReactNode;
}

/*
 * Use to wrap content across the site with standard navigation tools.
 */
const WrapWithNavigation: FC<WrapWithNavigationProps> = ({ children }) => {

    const { height, width } = useWindowDimensions();
    const location = useLocation();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(width > 1200);

    useEffect(() => {
        setMenuOpen(width > 1200);
    }, [location]);
    
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    }

    return (
       <>
          <CodeModal open={modalOpen} />
          <NavigationBar onModalOpen={() => setModalOpen(true)} onSidePanelToggle={toggleMenu} />

          <div className={styles.container}>

            {menuOpen && <SidePanel links={MAIN_LINKS} />}
            {children}
          </div>
        </>
    );
};

export default WrapWithNavigation;
