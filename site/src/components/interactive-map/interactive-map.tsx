import React, { useEffect, useRef, useState, useMemo } from "react";
import { SVG, Svg } from "@svgdotjs/svg.js";
import "@svgdotjs/svg.panzoom.js";
import styles from './interactive-map.module.css';
import { MAP_LINKS } from "./map-links";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    const containerRef = useRef<HTMLDivElement | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const [currentGroupId, setCurrentGroupId] = useState<string | undefined>(undefined);
    const [previousGroupId, setPreviousGroupId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (previousGroupId && previousGroupId !== currentGroupId) {
            const previous = document.getElementById(previousGroupId);
            if (previous) {
                previous.style.visibility = "hidden";
            }
        }

        if (currentGroupId) {
            const element = document.getElementById(currentGroupId);
            if (element) {
                element.style.visibility = "visible";
            }
            setPreviousGroupId(currentGroupId);
        } else {
            setPreviousGroupId(undefined);
        }

    }, [currentGroupId]);

    useEffect(() => {
        let isMounted = true;

        const loadAndInit = async () => {
            try {
                setLoading(true);
                // 1. Fetch both SVG files
                const [mainResponse, overlayResponse] = await Promise.all([
                    fetch(mainMapUrl),
                    fetch(overlayMapUrl)
                ]);

                if (!mainResponse.ok) throw new Error("Failed to load main SVG file");
                if (!overlayResponse.ok) throw new Error("Failed to load overlay SVG file");

                const [mainSvgText, overlaySvgText] = await Promise.all([
                    mainResponse.text(),
                    overlayResponse.text()
                ]);

                if (!isMounted || !containerRef.current) return;

                // 2. Clear container and create a wrapper SVG
                containerRef.current.innerHTML = '';

                // 3. Create a main SVG canvas that will contain both maps
                const canvas: Svg = SVG().addTo(containerRef.current).size("100%", "100%");

                // 4. Parse and inject the main map
                const tempMainDiv = document.createElement('div');
                tempMainDiv.classList.add(styles.mainMap);
                tempMainDiv.innerHTML = mainSvgText;
                const mainSvgElement = tempMainDiv.querySelector('svg');
                if (!mainSvgElement) throw new Error("No SVG element found in main map");

                // Get the viewBox from the main SVG to set up the canvas
                const viewBoxAttr = mainSvgElement.getAttribute('viewBox');
                if (viewBoxAttr) {
                    canvas.viewbox(viewBoxAttr);
                }

                // Import all children from main SVG into canvas
                while (mainSvgElement.firstChild) {
                    canvas.node.appendChild(mainSvgElement.firstChild);
                }

                // 5. Parse and inject the overlay map on top
                const tempOverlayDiv = document.createElement('div');
                tempOverlayDiv.classList.add(styles.overlayMap);
                tempOverlayDiv.innerHTML = overlaySvgText;
                const overlaySvgElement = tempOverlayDiv.querySelector('svg');

                if (!overlaySvgElement) throw new Error("No SVG element found in overlay map");
                overlaySvgElement.style.mixBlendMode = "overlay";

                // Import all children from overlay SVG into canvas
                while (overlaySvgElement.firstChild) {
                    canvas.node.appendChild(overlaySvgElement.firstChild);
                }

                const svgElement = canvas.node;

                // Function to constrain panning boundaries
                const constrainPanning = () => {
                    const viewbox = canvas.viewbox();
                    const svgBox = canvas.bbox();

                    // Minimum visible amount in viewbox coordinates (not pixels)
                    // This ensures consistent behavior at all zoom levels
                    const minVisibleFraction = 0.10; // 10% of viewport must contain SVG content
                    const minVisibleX = viewbox.width * minVisibleFraction;
                    const minVisibleY = viewbox.height * minVisibleFraction;

                    let newX = viewbox.x;
                    let newY = viewbox.y;
                    let corrected = false;

                    // X-axis: Ensure right edge of SVG doesn't go too far left
                    // Right edge of SVG must be at least minVisibleX inside the left edge of viewbox
                    const maxX = svgBox.x + svgBox.width - minVisibleX;
                    if (viewbox.x > maxX) {
                        newX = maxX;
                        corrected = true;
                    }

                    // X-axis: Ensure left edge of SVG doesn't go too far right
                    // Left edge of SVG must be at least minVisibleX inside the right edge of viewbox
                    const minX = svgBox.x - viewbox.width + minVisibleX;
                    if (viewbox.x < minX) {
                        newX = minX;
                        corrected = true;
                    }

                    // Y-axis: Ensure bottom edge of SVG doesn't go too far up
                    // Bottom edge of SVG must be at least minVisibleY inside the top edge of viewbox
                    const maxY = svgBox.y + svgBox.height - minVisibleY;
                    if (viewbox.y > maxY) {
                        newY = maxY;
                        corrected = true;
                    }

                    // Y-axis: Ensure top edge of SVG doesn't go too far down
                    // Top edge of SVG must be at least minVisibleY inside the bottom edge of viewbox
                    const minY = svgBox.y - viewbox.height + minVisibleY;
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
                canvas.on('zoom', () => {
                    // Use setTimeout to ensure zoom completes before constraining
                    setTimeout(constrainPanning, 0);
                });
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
                    const adjustedId = group?.id.replaceAll('hotspot', 'highlight') ?? '';

                    if (adjustedId.startsWith("highlight")) {
                        setCurrentGroupId(adjustedId);
                    } else if (adjustedId !== currentGroupId) {
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
    }, [mainMapUrl, overlayMapUrl, onGroupClick]);

    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

    return (
        <div className={styles.container}>         
            <div
                className={styles.map}
                ref={containerRef}
                onClick={() => {
                    const url = MAP_LINKS[currentGroupId ?? ''];
                    if(url) {
                        navigate(url);
                    }
                }}
            />
        </div>
    );
};

export default InteractiveMap;
