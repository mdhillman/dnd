import {useEffect, useRef, useState} from "react";
import mapboxgl from 'mapbox-gl';
import {Map} from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { IconButton} from "@mui/material";
import MapIcon from '@mui/icons-material/Map';
import PublicIcon from '@mui/icons-material/Public';
import LandscapeIcon from '@mui/icons-material/Landscape';
import * as Sources from '../../data/sources';

import styles from './page-map.module.css';

type MapProjection = 'mercator' | 'globe';


function MapPage() {
    const mapRef = useRef<Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null);

    const [terrainOn, setTerrainOn] = useState<boolean>(true);
    const [currentZoom, setCurrentZoom] = useState<number | undefined>(undefined);
    
    useEffect(() => {
        console.info("Initialised mapboxgl object.");
        mapboxgl.accessToken = 'pk.eyJ1IjoibWhpbGxtYW4iLCJhIjoiY21oYjB3c3J3MDA3ZTJvcXYyam9pZmtpYyJ9.E7J0teWhy4JAwZWI4K7G_w'
        
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current ?? '',
            style: 'mapbox://styles/mhillman/cmhqra10x002b01s6460l115u/draft',
        });

        mapRef.current.on('zoomend', () => {
            setCurrentZoom(mapRef.current?.getZoom());
        });

        mapRef.current.on("load", () => {
            console.info("Map has loaded.");
            
            mapRef.current?.addSource(Sources.TERRAIN.name, Sources.TERRAIN.settings);
            mapRef.current?.setTerrain({ source: Sources.TERRAIN.name, exaggeration: 0.25 });
        })

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
                    <PublicIcon className={styles.projectionIcon}/>
                </IconButton>
                  <IconButton aria-label="enabled-terrain" onClick={() => changeProjection('globe')}>
                    <LandscapeIcon className={styles.projectionIcon}/>
                </IconButton>
                <p>
                    Zoom: {currentZoom ?? '?'}
                </p>
            </div> 
        </>
       

    );
}

export default MapPage;