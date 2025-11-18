import { FC, PropsWithChildren } from "react";
import SidePanel, { SidePanelLink } from "../side-panel/side-panel";
import NavigationBar from "../nav-bar/nav-bar";

import styles from './page-wrapper.module.css';

/**
 * 
 * @returns 
 */
const PageWrapper: FC = ({children}: PropsWithChildren) => {

    const sidePanelLinks: SidePanelLink[] = [
        {
            name: "Alpha",
            link: "google.com/1",
            tooltip: "Alpha tooltip"
        },
          {
            name: "Beta",
            link: "google.com/2",
            tooltip: "Beta tooltip"
        },
          {
            name: "Charlie",
            link: "google.com/3",
            tooltip: "Charlie tooltip"
        },
    ];

    return (
        <div className={styles.outer}>
            <NavigationBar/>

            <div className={styles.inner}>
                <SidePanel links={sidePanelLinks}/>
                {children}
            </div>           
        </div>
    );

}

export default PageWrapper;