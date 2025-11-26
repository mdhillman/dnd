import { FC, useEffect, useState, useMemo } from "react";
import matter, { GrayMatterFile } from 'gray-matter';
import styles from './info-panel.module.css';
import ReactMarkdown from "react-markdown";
import { Tooltip } from "@mui/material";

export interface InfoPanelProps {
    filename: string;
}

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

interface MarkdownTags {
    [key: string]: string
} 

const InfoPanel: FC<InfoPanelProps> = ({filename}) => {
    const [mdTags, setMdTags] = useState<MarkdownTags | null>(null);
    const [mdContent, setMdContent] = useState<string | null>(null);

    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const headerImage = mdTags?.image ? `/images/${mdTags.image}` : null;

    useEffect(() => {
        setLoading(true);

        const loadMarkdown = async () => {
            const response = await fetch(`/info/${filename}.md`);
            if(response.ok) {
                const {data, content} = matter(await response.text())

                setMdTags(data);
                setMdContent(content);

                document.title = data.title ?? 'The World of Theia';
                setError(false);
            } else {
                setError(true);
            }
            setLoading(false);
        }
        
        loadMarkdown();
    }, [filename]);

    

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

    return (
        <div className={styles.container}>
            {headerImage && (
                <Tooltip title="Click to view full image" followCursor>
                    <img className={styles.headerImage} src={headerImage} onClick={openImage}/>
                </Tooltip>
            )}
            
            <div className={styles.content}>
                <ReactMarkdown>{mdContent}</ReactMarkdown>
            </div>
        </div>
    );
}

export default InfoPanel;