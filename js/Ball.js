/*--------------------------------------------------------------------
| Class: Ball
---------------------------------------------------------------------*/

const SPEED = 30;
const INCREMENT = 0;

class Ball extends THREE.Object3D{


    constructor(radius, angle, x, y, z){
        'use strict'

        super();
        var geometry = new THREE.SphereGeometry(radius, 15, 15);
        var material = new THREE.MeshBasicMaterial( {color:0x42f453, wireframe:true});
        var mesh     = new THREE.Mesh(geometry, material);
        this.add(mesh);
        this.position.set(x, y, z);
        this.radius = radius;
        this.speed = SPEED; // modulus of speed vector. NOTE: Vy = 0
        this.angle = angle; // angle on Y, starting Z non-direct 
        this.esfera = mesh;
        mesh.add(new THREE.AxesHelper(35));
        //this.add(new THREE.AxesHelper(50));
    }

    getAngle(){
        return this.angle;
    }

    getRadius(){
        return this.radius;
    }


    moveBall(delta){
        'use strict'

        // move ball
        var xSpeed = this.speed * Math.sin(this.angle);
        var zSpeed = this.speed * Math.cos(this.angle);
        this.position.x += xSpeed * delta;
        this.position.z += zSpeed * delta; 
        
        var axis = new THREE.Vector3(xSpeed/this.speed, 0, zSpeed/this.speed);

        axis.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI/2);

        this.rotateOnWorldAxis(axis ,delta * this.speed/this.radius);
    }


    increaseSpeed(){
        this.speed += INCREMENT; 
    }


    processCollision(angleDiff,b2speed,b2angle,flag){

        var newvz = b2speed*Math.cos(b2angle-angleDiff)*Math.cos(angleDiff) + this.speed*Math.sin(this.angle-angleDiff)*Math.sin(angleDiff);
        var newvx = b2speed*Math.cos(b2angle-angleDiff)*Math.sin(angleDiff) + this.speed*Math.sin(this.angle-angleDiff)*Math.cos(angleDiff);

        this.setAngleNotMesh(Math.atan2(newvx,newvz)); 
        if(this.angle < 0) this.angle = 2*Math.PI + this.angle;
    }

    setAngleNotMesh(alpha){
        // var aux = this.angle;
        this.angle = alpha;
        // this.rotation.y = alpha;
        // this.esfera.rotateOnWorldAxis(aux - alpha);
    }

}