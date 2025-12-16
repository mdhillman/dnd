import { FC, ReactNode, useState } from "react";
import SidePanel from "../side-panel/side-panel";
import { MAIN_LINKS } from "../../data/links";
import { CodeModal } from "../code-modal/code-modal";
import { NavigationBar } from "../nav-bar/nav-bar";

import styles from "./wrap-with-navigation.module.css";

interface WrapWithNavigationProps {
    children?: ReactNode;
}

/*
 * Use to wrap content across the site with standard navigation tools.
 */
const WrapWithNavigation: FC<WrapWithNavigationProps> = ({ children }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [menuOpen, setMenuOpen] = useState<boolean>(true);

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
