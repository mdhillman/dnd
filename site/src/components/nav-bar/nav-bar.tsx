import { FC } from "react";
import styles from './nav-bar.module.css';
import { Icon, Tooltip } from "@mui/material";

export interface NavigationBarProps {
    onModalOpen: () => void;
}

export const NavigationBar: FC<NavigationBarProps> = ({onModalOpen}) => {
    return (
        <div className={styles.container}>
            <Tooltip title='Search for content'>
                <div className={styles.navItem}>
                    <Icon>search</Icon>
                </div>
            </Tooltip>

            <Tooltip title='Enter a new code'>
                <div className={styles.navItem} onClick={onModalOpen}>
                    <Icon>vpn_key</Icon>
                </div>
            </Tooltip>
        </div>
    );
}