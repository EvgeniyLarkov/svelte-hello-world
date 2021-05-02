import { LngLat } from 'mapbox-gl';
import { writable } from 'svelte/store';

interface MarkersInterface {
    position: LngLat,
    label: string,
    author: string,
}

export const markers = writable<MarkersInterface[]>([]);