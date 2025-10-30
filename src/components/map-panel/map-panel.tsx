import {useEffect, useRef} from "react";
import mapboxgl from 'mapbox-gl';
import {Map} from "mapbox-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './map-panel.module.css';


function MapPanel() {
    const mapRef = useRef<Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWhpbGxtYW4iLCJhIjoiY21oYjB3c3J3MDA3ZTJvcXYyam9pZmtpYyJ9.E7J0teWhy4JAwZWI4K7G_w'
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current ?? '',
            center: [-74.0060152, 40.7127281],
            zoom: 5,
        });

        return () => {
            mapRef.current?.remove()
        }
    }, [])

    return (
        <div id='map' className={styles.wrapper} ref={mapContainerRef}>
        </div>
    );
}

export default MapPanel;
