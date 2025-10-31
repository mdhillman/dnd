import {useEffect, useRef} from "react";
import mapboxgl from 'mapbox-gl';
import {Map} from "mapbox-gl";

import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './map-panel.module.css';
import { IconButton} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import PublicIcon from '@mui/icons-material/Public';

function MapPanel() {
    const mapRef = useRef<Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoibWhpbGxtYW4iLCJhIjoiY21oYjB3c3J3MDA3ZTJvcXYyam9pZmtpYyJ9.E7J0teWhy4JAwZWI4K7G_w'
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current ?? '',
            style: 'mapbox://styles/mhillman/cmhf3gk7s007901qx4viw0q70',
            center: [-74.0060152, 40.7127281],
            zoom: 5,
        });

        return () => {
            mapRef.current?.remove()
        }
    }, [])

    const changeProjection = (projection: string) => {
        if(mapRef.current) {
            mapRef.current.setProjection(projection);
        }
    }

    return (
        <>
            <div id='map' className={styles.wrapper} ref={mapContainerRef}></div>
            <div className={styles.projectionContainer}>
                <IconButton aria-label="mercator-projection" onClick={() => changeProjection('mercator')}>
                    <MapIcon className={styles.projectionIcon}/>
                </IconButton>
                <IconButton aria-label="globe-projection" onClick={() => changeProjection('globe')}>
                    <PublicIcon />
                </IconButton>
            </div> 
        </>
       

    );
}

export default MapPanel;
