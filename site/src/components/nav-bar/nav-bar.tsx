import { FC } from "react";
import { Icon, Tooltip } from "@mui/material";

import styles from './nav-bar.module.css';

export interface NavigationBarProps {
    onModalOpen: () => void;
    onSidePanelToggle: () => void;
}

export const NavigationBar: FC<NavigationBarProps> = ({onModalOpen, onSidePanelToggle}) => {
    return (
        <div className={styles.container}>
             <Tooltip title='Show/hide navigation menu'>
                <div className={`${styles.navItem} ${styles.left}`} onClick={onSidePanelToggle}>
                    <Icon>menu</Icon>
                </div>
            </Tooltip>

            {/* <Tooltip title='Search for content'>
                <div className={styles.navItem}>
                    <Icon>search</Icon>
                </div>
            </Tooltip>

            <Tooltip title='Enter a new code'>
                <div className={styles.navItem} onClick={onModalOpen}>
                    <Icon>vpn_key</Icon>
                </div>
            </Tooltip> */}
        </div>
    );
}