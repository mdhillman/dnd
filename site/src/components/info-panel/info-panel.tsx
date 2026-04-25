import { FC, useEffect, useState, useContext } from "react";
import matter from 'gray-matter';
import ReactMarkdown, { Components } from "react-markdown";
import { Button, Tooltip } from "@mui/material";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { InfoTable, InfoTableProps } from "./info-table";
import { removeCookie } from "../../cookies";
import { CookieContext } from "../../contexts";
import { Link, useSearchParams } from "react-router-dom";

import styles from './info-panel.module.css';

const ErrorPanel: FC = () => {
    return (
        <div className={styles.error}>
            <h1>404</h1>
            <p>Looks like this content has been hit with a spell of Banishment!</p>
            <p>We couldn't find this information; if you feel that it's missing, please contact your friendly neighbourhood Dungeon Master.</p>
        </div>
    )
};

const LoadingPanel: FC = () => {
    return (
        <div className={styles.error}>
            <h1>Loading...</h1>
            <p>Please wait whilst we roll for Perception.</p>
        </div>
    )
};



interface GrayMatterData {
    title: string,
    header: string,
    table: InfoTableProps,
    headerClass?: string,
} 


const InfoPanel: FC = () => {
    const [mdTags, setMdTags] = useState<GrayMatterData | null>(null);
    const [mdContent, setMdContent] = useState<string | null>(null);

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const cookies = useContext(CookieContext).sort();
    const [params] = useSearchParams();

    const filename = params.get("content") ?? 'home';
    const headerImage = mdTags?.header ? `/dnd/images/${mdTags.header}` : null;

    useEffect(() => {
        setLoading(true);

        const loadMarkdown = async () => {
            const response = await fetch(`https://raw.githubusercontent.com/mdhillman/dnd/refs/heads/initial-dev/site/public/info/${filename}.md`);
            if(response.ok) {
                let {data, content} = matter(await response.text())

                if(content.includes("COOKIECONTENT")) {
                    content = content.replaceAll("COOKIECONTENT", "[" + cookies.join(", ") + "]");
                }

                setMdTags(data as GrayMatterData);
                setMdContent(content);

                document.title = data.title ?? 'The World of Theia';
                setError(false);
            } else {
                setError(true);
            }
            setLoading(false);
        }
        
        loadMarkdown();
    }, [filename, cookies]);

    // Loading element
    if(loading) {
        return (
            <LoadingPanel/>
        );
    }

    // Error element (when couldn't find/read markdown file)
    if(error || !mdTags || Object.keys(mdTags).length === 0) {
        return (
            <ErrorPanel/>
        );
    }

    const openImage = () => {
        if(!headerImage) return;
        window.open(headerImage, '_blank');
    };

    const components: Components = {
        a: ({ href, children }) => {
            return <Link to={href?.toString() ?? '/'}>{children}</Link>;
        }
    };

    return (
        <div className={styles.container}>
            {headerImage && (
                <Tooltip title="Click to view full image" followCursor>
                    <img className={`${styles.headerImage} ${mdTags.headerClass ?? ''}`} src={headerImage} alt={headerImage} onClick={openImage}/>
                </Tooltip>
            )}
            
            <div className={styles.content}>
                <InfoTable {...mdTags.table}/>
                <ReactMarkdown
                    components={components}
                    remarkPlugins={[[remarkGfm, { singleTilde: false }], [remarkToc]]}
                    >
                        {mdContent}
                    </ReactMarkdown>

                {filename === 'privacy' && (
                    <div className={styles.buttonContainer}>
                        <Tooltip title="Click to remove all stored Cookies">
                            <Button variant="contained" onClick={removeCookie}>
                                Remove all Cookies
                            </Button>
                        </Tooltip>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoPanel;