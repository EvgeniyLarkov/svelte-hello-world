import * as THREE from 'three';

const markerProto = {
  latLongToVector3: function latLongToVector3(
    latitude: number,
    longitude: number,
    radius: number,
    height: number
  ) {
    const phi = (latitude * Math.PI) / 180;
    const theta = ((longitude - 180) * Math.PI) / 180;

    const x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
    const y = (radius + height) * Math.sin(phi);
    const z = (radius + height) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
  },
  marker: function marker(size: number, color: string, vector3Position: THREE.Vector3) {
    const markerGeometry = new THREE.SphereGeometry(size);
    const markerMaterial = new THREE.MeshLambertMaterial({
      color: color,
    });
    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);
    markerMesh.position.copy(vector3Position);

    return markerMesh;
  },
};

export interface MarkerOptions {
    latitude: number,
    longitude: number,
    radius: number,
    height: number,
    size: number,
    color: string,
}

// Place Marker
export const placeMarker = (object: THREE.Object3D, options: MarkerOptions) => {
  const position = markerProto.latLongToVector3(
    options.latitude,
    options.longitude,
    options.radius,
    options.height
  );
  console.log(position);
  const marker = markerProto.marker(options.size, options.color, position);
  object.add(marker);
};
