import * as THREE from "three";
import { MeshSurfaceSampler } from "three/addons/math/MeshSurfaceSampler.js";

export class HeroParticles {

    constructor(scene){

        this.scene = scene;

        this.group = new THREE.Group();

        this.points = null;

        this.uniforms = {

            uTime:{value:0},
            uHover:{value:0}

        };

        scene.add(this.group);

    }

async build(root) {

    const meshes = [];

    root.traverse((obj) => {
        if (obj.isMesh && obj.geometry) {
            meshes.push(obj);
        }
    });

    console.log("Meshes:", meshes.length);

    const positions = [];

    const temp = new THREE.Vector3();

    for (const mesh of meshes) {

        mesh.updateWorldMatrix(true, false);

        const sampler = new MeshSurfaceSampler(mesh).build();

        for (let i = 0; i < 15000; i++) {

            sampler.sample(temp);

            positions.push(
                temp.x,
                temp.y,
                temp.z
            );

        }

    }

    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            positions,
            3
        )
    );

    const material = new THREE.ShaderMaterial({

        uniforms: this.uniforms,

        transparent: true,

        depthWrite: false,

        blending: THREE.AdditiveBlending,

        vertexShader: `

uniform float uTime;
uniform float uHover;

void main(){

    vec3 p = position;

    float n = sin(
        p.x*5.0+
        p.y*6.0+
        p.z*4.0+
        uTime*2.0
    );

    p += normalize(position)*n*uHover*0.06;

    vec4 mv =
        modelViewMatrix*
        vec4(p,1.0);

    gl_PointSize =
        2.2*(350.0/-mv.z);

    gl_Position =
        projectionMatrix*
        mv;

}

`,

        fragmentShader: `

void main(){

    float d=
        length(gl_PointCoord-0.5);

    if(d>0.5) discard;

    gl_FragColor=
        vec4(
            0.93,
            0.82,
            0.58,
            1.0
        );

}

`

    });

    this.points = new THREE.Points(
        geometry,
        material
    );

    this.group.add(this.points);

}

    update(dt){

        this.uniforms.uTime.value += dt;

    }

}