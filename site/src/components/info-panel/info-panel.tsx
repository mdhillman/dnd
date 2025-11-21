import { FC, useEffect, useState, useMemo } from "react";
import matter, { GrayMatterFile } from 'gray-matter';
import styles from './info-panel.module.css';
import ReactMarkdown from "react-markdown";

export interface InfoPanelProps {
    filename: string;
}

const InfoPanel: FC<InfoPanelProps> = ({filename}) => {
    const [markdown, setMarkdown] = useState<string | null>(null);

    const {data, content} = useMemo(() => {
        return markdown ? matter(markdown) : { data: null, content: null};
    }, [markdown]);

    useEffect(() => {
        if(content) return;
    
        fetch(`/info/${filename}.md`)
            .then(response => response.text())
            .then(result => setMarkdown(result));
    }, []);


    return (
        <div className={styles.container}>
            <h1>{data?.["author"]}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}

export default InfoPanel;