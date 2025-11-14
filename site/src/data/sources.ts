import { SourceSpecification } from "mapbox-gl";

export interface SourceDefinition {
    name: string,
    settings: SourceSpecification;
};


export const TERRAIN: SourceDefinition = {
    name: 'terrain',
    settings: {
        type: 'raster-dem',
        url: 'mapbox://mhillman.b9nr98m8',
        tileSize: 512,
        maxzoom: 2,
        encoding: 'mapbox',
    }
};