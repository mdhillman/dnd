import { SourceSpecification } from "mapbox-gl";

export interface SourceDefinition {
    name: string,
    settings: SourceSpecification;
};


    export const TERRAIN: SourceDefinition = {
        name: 'terrain',
        settings: {
            type: 'raster-dem',
            url: 'mapbox://mhillman.8sbeaa57',
            tileSize: 512,
            maxzoom: 2,
            encoding: 'mapbox',
        }
    };