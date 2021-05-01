import * as THREE from 'three';
import { PlanetConfig, PlanetConfigInterface } from './config';
import controls from './controls';

const renderer = new THREE.WebGLRenderer({ alpha: true });
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1500);
const cameraCtrl = controls(camera, renderer.domElement);

const spotLight = new THREE.SpotLight(0xffffff, 1, 0, 1, 1, 1);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

const atmosphereMaterialDefaults = {
  side: THREE.DoubleSide,
  transparent: true
}

const planetProto = {
  sphere: function (size: number) {
    const sphere = new THREE.SphereGeometry(size, 32, 32);

    return sphere;
  },
  material: function (options: PlanetConfigInterface['surface']['material'] | typeof atmosphereMaterialDefaults) {
    const material = new THREE.MeshPhongMaterial();
    if (options) {
      for (const property in options) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        material[property] = options[property];
      }
    }

    return material;
  },
  glowMaterial: function (intensity: number, fade: number, color: number) {
    // Custom glow shader from https://github.com/stemkoski/stemkoski.github.com/tree/master/Three.js
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        'c': {
          value: intensity
        },
        'p': {
          value: fade
        },
        glowColor: {
          value: new THREE.Color(color)
        },
        viewVector: {
          value: camera.position
        }
      },
      vertexShader: `
          uniform vec3 viewVector;
          uniform float c;
          uniform float p;
          varying float intensity;
          void main() {
            vec3 vNormal = normalize( normalMatrix * normal );
            vec3 vNormel = normalize( normalMatrix * viewVector );
            intensity = pow( c - dot(vNormal, vNormel), p );
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`
      ,
      fragmentShader: `
          uniform vec3 glowColor;
          varying float intensity;
          void main() 
          {
            vec3 glow = glowColor * intensity;
            gl_FragColor = vec4( glow, 0.3 );
          }`
      ,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    return glowMaterial;
  },
  texture: function (material: THREE.MeshPhongMaterial, property: string, uri: string) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      uri,
      function (texture) {
        material[property] = texture;
        material.needsUpdate = true;
      }
    );
  }
};

const createPlanet = function (options: typeof PlanetConfig) {
  // Create the planet's Surface
  const surfaceGeometry = planetProto.sphere(options.surface.size);
  const surfaceMaterial = planetProto.material(options.surface.material);
  const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

  // Create the planet's Atmosphere
  const atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);

  const atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
  const atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

  // Create the planet's Atmospheric glow
  const atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
  const atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
  const atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);

  // Nest the planet's Surface and Atmosphere into a planet object
  const planet = new THREE.Object3D();
  surface.name = 'surface';
  atmosphere.name = 'atmosphere';
  atmosphericGlow.name = 'atmosphericGlow';
  planet.add(surface);
  planet.add(atmosphere);
  planet.add(atmosphericGlow);

  type surfaceTextures = keyof PlanetConfigInterface['surface']['textures'];
  type atmosphereTextures = keyof PlanetConfigInterface['atmosphere']['textures'];
  // Load the Surface's textures
  for (const textureProperty in options.surface.textures) {
    planetProto.texture(
      surfaceMaterial,
      textureProperty,
      options.surface.textures[textureProperty as surfaceTextures]
    );
  }

  // Load the Atmosphere's texture
  for (const textureProperty in options.atmosphere.textures) {
    planetProto.texture(
      atmosphereMaterial,
      textureProperty,
      options.atmosphere.textures[textureProperty as atmosphereTextures]
    );
  }

  return planet;
};

const earth = createPlanet(PlanetConfig);

const render = function (height: number, width: number, root: HTMLElement): (x: boolean) => void {
  let controlEnabled = false;

  const setControl = (ctrl: boolean) => { controlEnabled = ctrl };

  renderer.setSize(width, height);

  scene.add(camera);
  scene.add(spotLight);
  scene.add(ambientLight);
  scene.add(earth);
  scene.background = null;

  camera.aspect = height / width;
  camera.position.set(0, 0, 1.7);
  camera.lookAt(earth.position);
  camera.updateProjectionMatrix();

  const atmosphere = earth.getObjectByName('atmosphere');
  const surface = earth.getObjectByName('surface');

  const loop = () => {
    if (controlEnabled) {
      atmosphere.rotation.y += PlanetConfig.camera.atmosphereRotationSpeed;
      cameraCtrl.update();
    } else {
      surface.rotation.y += PlanetConfig.camera.surfaceRotationSpeed;
      atmosphere.rotation.y += PlanetConfig.camera.atmosphereRotationSpeed;
    }
    const pos = camera.position;
    const multiplier = PlanetConfig.camera.spotlightPosMultiplier;
    spotLight.position.set(pos.x*multiplier, pos.y*multiplier, pos.z*multiplier);
    spotLight.distance = PlanetConfig.camera.spotlightDistance;

    requestAnimationFrame(loop);
    renderer.render(scene, camera);
  }

  root.appendChild(renderer.domElement);
  requestAnimationFrame(loop);

  return setControl;
};

export default render;
