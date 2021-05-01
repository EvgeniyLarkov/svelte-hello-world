import * as THREE from 'three';

export const PlanetConfig = {
    surface: {
      size: 0.6,
      material: {
        bumpScale: 0.05,
        specular: new THREE.Color('grey'),
        shininess: 10
      },
      textures: {
        map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg',
        bumpMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthbump1k.jpg',
        specularMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthspec1k.jpg'
      }
    },
    atmosphere: {
      size: 0.003,
      material: {
        opacity: 0.8
      },
      textures: {
        map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg',
        alphaMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg'
      },
      glow: {
        size: 0.02,
        intensity: 0.7,
        fade: 7,
        color: 0x93cfef
      }
    },
    camera: {
      surfaceRotationSpeed: 1 / 16 * 0.03,
      atmosphereRotationSpeed: 1 / 16 * 0.06,
      spotlightDistance: 200,
      spotlightPosMultiplier: 50,
    }
  }

export type PlanetConfigInterface = typeof PlanetConfig;
