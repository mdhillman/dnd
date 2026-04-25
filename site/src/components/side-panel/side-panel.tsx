import { FC, ReactNode, useState } from "react";
import styles from './side-panel.module.css';
import { Icon, Tooltip } from "@mui/material";
import { SidePanelLink } from "../../data/links";
import { useNavigate } from "react-router-dom";

export interface SidePanelProps {
    links: SidePanelLink[],
}

/**
 * 
 * @returns 
 */
const SidePanel: FC<SidePanelProps> = ({ links }: SidePanelProps) => {
    const organisedLinks = useBuildLinks(links);

    return (
        <div className={styles.container}>
            {organisedLinks.map(link => link)}
        </div>
    );
}


const useBuildLinks = (links: SidePanelLink[]): ReactNode[] => {
    const [collapsedNodes, setCollapsedNodes] = useState<string[]>([]);
    const results: ReactNode[] = [];
    const navigate = useNavigate();

    const routeChange = (path: string, hasChildren: boolean) => {
        if(hasChildren) return;
        console.log("NAVIGATING TO: " + path);
        navigate(path);
    }

    const collapseOrExpand = (name: string) => {
        if (collapsedNodes.includes(name)) {
            setCollapsedNodes(prev => prev.filter(n => n != name));
        } else {
            setCollapsedNodes(prev => [...prev, name]);
        }
    }

    const recurse = (link: SidePanelLink, depth: number) => {
        const inlineStyle = {
            marginLeft: `calc(${depth} * var(--spacingXL))`,
        };

        const iconName = link.icon ?? "star";
        const collapserIcon = collapsedNodes.includes(link.name) ? "arrow_drop_down" : "arrow_drop_up";

        const hasChildren = link.sublinks && link.sublinks.length > 0;

        results.push(
            <Tooltip title={link.tooltip} placement={"right"} key={link.name} arrow>
                <div style={inlineStyle} className={!hasChildren ? styles.linkItem : styles.groupItem} onClick={() => routeChange(link.link, !!hasChildren)}>
                    <Icon className={styles.linkIcon}>{iconName}</Icon>
                    <span>{link.name}</span>

                    {link.sublinks && (
                        <Icon
                            className={styles.linkCollapser}
                            onClick={(e) => {
                                e.stopPropagation();
                                collapseOrExpand(link.name);
                            }}>{collapserIcon}</Icon>
                    )}
                </div>
            </Tooltip>
        );

        if (!collapsedNodes.includes(link.name)) {
            link.sublinks?.forEach(sublink => recurse(sublink, depth + 1));
        }
    }

    links.forEach(link => recurse(link, 0));
    return results;
}


export default SidePanel;