import { FC } from "react";
import styles from './side-panel.module.css';
import { Tooltip } from "@mui/material";


export interface SidePanelProps {
    links: SidePanelLink[],
}

export interface SidePanelLink {
    name: string,
    link: string,
    tooltip: string,
}

const SidePanelItem: FC<SidePanelLink> = ({name, link, tooltip}: SidePanelLink) => {
    return (
        <Tooltip title={tooltip} placement={"right"} arrow>
            <div className={styles.linkItem}>
                <span>{name}</span>
            </div>
        </Tooltip>
    )
}

/**
 * 
 * @returns 
 */
const SidePanel: FC<SidePanelProps> = ({links}: SidePanelProps) => {

    return (
        <div className={styles.container}>
            {links.map(link => 
                <SidePanelItem name={link.name} link={link.link} tooltip={link.tooltip}/>
            )}
        </div>
    );
}



export default SidePanel;