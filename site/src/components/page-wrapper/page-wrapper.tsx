import { FC, ReactNode } from "react";
import SidePanel from "../side-panel/side-panel";
import NavigationBar from "../nav-bar/nav-bar";

import styles from './page-wrapper.module.css';
import { MAIN_LINKS } from "../../data/links";

export interface PageWrapperProps {
    children?: ReactNode;
}
/**
 * 
 * @returns 
 */
const PageWrapper: FC<PageWrapperProps> = ({children}) => {

    return (
        <div className={styles.outer}>
            <NavigationBar/>

            <div className={styles.inner}>
                <SidePanel links={MAIN_LINKS}/>
                {children}
            </div>           
        </div>
    );

}

export default PageWrapper;