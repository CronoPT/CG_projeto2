/*--------------------------------------------------------------------
| Class: Ball
---------------------------------------------------------------------*/

const SPEED = 40; 
const INCREMENT = 5;

class Ball extends THREE.Object3D{


    constructor(radius, angle, x, y, z){
        'use strict'

        super();
        var geometry = new THREE.SphereGeometry(radius, 30, 30);
        var material = new THREE.MeshBasicMaterial( {color:0x42f453, wireframe:true});
        var mesh     = new THREE.Mesh(geometry, material);
        this.add(mesh);
        this.position.set(x, y, z);

        this.speed = SPEED;
        this.angle = angle; 
    }

    moveBall(delta){
        'use strict'

        var xSpeed = this.speed * Math.sin(this.angle);
        var zSpeed = this.speed * Math.cos(this.angle);
        this.position.x += xSpeed * delta;
        this.position.z += zSpeed * delta; 
    }

    increaseSpeed(){
        this.speed += INCREMENT; 
    }
}