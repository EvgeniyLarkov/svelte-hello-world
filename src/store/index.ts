import { LngLat } from 'mapbox-gl';
import { writable } from 'svelte/store';

export interface MarkersInterface {
    position: LngLat,
    text: string,
    author: string,
}

export const markers = writable<MarkersInterface[]>([]);