import React, { useEffect, useRef, useState, useMemo } from "react";
import { SVG, Svg } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.panzoom.js";

import styles from './interactive-map.module.css';
import { Tooltip } from "@mui/material";

interface InteractiveMapProps {
    /** The URL to the .svg file (e.g., /assets/map.svg) */
    url: string;
    onGroupClick?: (id: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
    url,
    onGroupClick,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);

    const [currentGroupId, setCurrentGroupId] = useState<string | undefined>(undefined);
    const [tooltip, setTooltip] = useState<string | undefined>(undefined);

    useEffect(() => {
        const sheet = document.styleSheets[document.styleSheets.length - 1] as CSSStyleSheet;

        if (currentGroupId) {
            const highlightRule = `#${currentGroupId}`;
            sheet.insertRule(`${highlightRule} { opacity: 1.0; cursor: pointer; }`, sheet.cssRules.length);
            setTooltip(`Hovered over: ${currentGroupId}`);
        } else {
            for (var i = 0; i < sheet.cssRules.length; i++) {
                const rule = sheet.cssRules[i];
                if (rule instanceof CSSStyleRule && rule.selectorText.startsWith("#highlight")) {
                    sheet.deleteRule(i);
                    break;
                }
            }
            setTooltip(undefined);
        }

    }, [currentGroupId]);

    useEffect(() => {
        let isMounted = true;

        const loadAndInit = async () => {
            try {
                setLoading(true);
                // 1. Fetch the raw SVG text
                const response = await fetch(url);
                if (!response.ok) throw new Error("Failed to load SVG file");

                const svgText = await response.text();

                if (!isMounted || !containerRef.current) return;

                // 2. Clear container and inject SVG directly into DOM
                containerRef.current.innerHTML = svgText;

                // 3. Get the SVG element and wrap it with SVG.js
                const svgElement = containerRef.current.querySelector('svg');
                if (!svgElement) throw new Error("No SVG element found in loaded content");

                const canvas: Svg = SVG(svgElement).size("100%", "100%");

                // 4. Initialize pan/zoom
                canvas.panZoom();

                // 5. Attach Event Listener
                canvas.on("click", (e: Event) => {
                    const target = e.target as HTMLElement;
                    const group = target.closest("g");
                    if (group && group.id && onGroupClick) {
                        onGroupClick(group.id);
                    }
                });

                // 6. Attach mousemove listener to log closest <g> element id
                canvas.on("mousemove", (e: Event) => {
                    const target = e.target as HTMLElement;
                    const group = target.closest("g");

                    if (group?.id.startsWith("highlight")) {
                        setCurrentGroupId(group?.id);
                    } else {
                        setCurrentGroupId(undefined);
                    }
                });

                setLoading(false);
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error ? err.message : "Unknown error",
                    );
                    setLoading(false);
                }
            }
        };

        loadAndInit();

        return () => {
            isMounted = false;
            if (containerRef.current) containerRef.current.innerHTML = "";
        };
    }, [url, onGroupClick]);

    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            {loading && (
                <div style={{ position: "absolute" }}>Loading Map...</div>
            )}

            <div
                className={styles.map}
                ref={containerRef}
            />

        </div>
    );
};

export default InteractiveMap;
