import React, { useEffect, useRef, useState, useMemo } from "react";
import { SVG, Svg } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.panzoom.js";

import styles from './interactive-map.module.css';
import { Tooltip } from "@mui/material";

interface InteractiveMapProps {
    /** The URL to the .svg file (e.g., /assets/map.svg) */
    mainMapUrl: string;
    overlayMapUrl: string;
    onGroupClick?: (id: string) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
    mainMapUrl,
    overlayMapUrl,
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
                const response = await fetch(mainMapUrl);
                if (!response.ok) throw new Error("Failed to load SVG file");

                const svgText = await response.text();

                if (!isMounted || !containerRef.current) return;

                // 2. Clear container and inject SVG directly into DOM
                containerRef.current.innerHTML = svgText;

                // 3. Get the SVG element and wrap it with SVG.js
                const svgElement = containerRef.current.querySelector('svg');
                if (!svgElement) throw new Error("No SVG element found in loaded content");

                const canvas: Svg = SVG(svgElement).size("100%", "100%");

                // Function to constrain panning boundaries
                const constrainPanning = () => {
                    const viewbox = canvas.viewbox();
                    const svgBox = canvas.bbox();
                    
                    // Calculate visible boundaries (ensure at least 100px of content is visible)
                    const minVisiblePx = 100;
                    const minVisible = minVisiblePx / canvas.zoom();
                    
                    let newX = viewbox.x;
                    let newY = viewbox.y;
                    let corrected = false;
                    
                    // X-axis: Ensure right edge of SVG stays visible
                    const maxX = svgBox.x + svgBox.width - minVisible;
                    if (viewbox.x > maxX) {
                        newX = maxX;
                        corrected = true;
                    }
                    
                    // X-axis: Ensure left edge of SVG stays visible
                    const minX = svgBox.x - viewbox.width + minVisible;
                    if (viewbox.x < minX) {
                        newX = minX;
                        corrected = true;
                    }
                    
                    // Y-axis: Ensure bottom edge of SVG stays visible
                    const maxY = svgBox.y + svgBox.height - minVisible;
                    if (viewbox.y > maxY) {
                        newY = maxY;
                        corrected = true;
                    }
                    
                    // Y-axis: Ensure top edge of SVG stays visible
                    const minY = svgBox.y - viewbox.height + minVisible;
                    if (viewbox.y < minY) {
                        newY = minY;
                        corrected = true;
                    }
                    
                    // Apply corrected viewbox if needed
                    if (corrected) {
                        canvas.viewbox(newX, newY, viewbox.width, viewbox.height);
                    }
                };

                // 4. Initialize pan/zoom with panning constraints
                canvas.panZoom({
                    zoomFactor: 0.1,
                    zoomMin: 0.43,
                    zoomMax: 10,
                    panning: true,
                    panButton: 0,
                    oneFingerPan: false,
                });

                // Apply constraints continuously during all viewport changes
                canvas.on('zoom', constrainPanning);
                canvas.on('panning', constrainPanning);
                canvas.on('panEnd', constrainPanning);
                
                // Also use requestAnimationFrame to continuously check during mouse interaction
                let isPanning = false;
                let rafId: number | null = null;
                
                const continuousConstrain = () => {
                    if (isPanning) {
                        constrainPanning();
                        rafId = requestAnimationFrame(continuousConstrain);
                    }
                };
                
                svgElement.addEventListener('mousedown', () => {
                    isPanning = true;
                    continuousConstrain();
                });
                
                window.addEventListener('mouseup', () => {
                    isPanning = false;
                    if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = null;
                    }
                    constrainPanning();
                });

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
    }, [mainMapUrl, onGroupClick]);

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
