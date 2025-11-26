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
        <div className={styles.container}>
            <SidePanel links={MAIN_LINKS}/>
            {children}
        </div>           
    );

}

export default PageWrapper;