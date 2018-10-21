/*--------------------------------------------------------------------
| Class: Ball
---------------------------------------------------------------------*/

//const SPEED = 40; 
const SPEED = 20;
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
        this.radius = radius;
        this.speed = SPEED;
        this.angle = angle; 
        this.esfera = mesh;
        self.choques=0;
    }

    getAngle(){
        return this.angle;
    }

    getRadius(){
        return this.radius;
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


    processCollision(angleDiff,b2speed,b2angle,flag){

         
    var newvz = b2speed*Math.cos(b2angle-angleDiff)*Math.cos(angleDiff) + this.speed*Math.sin(this.angle-angleDiff)*Math.sin(angleDiff);
    var newvx = b2speed*Math.cos(b2angle-angleDiff)*Math.sin(angleDiff) + this.speed*Math.sin(this.angle-angleDiff)*Math.cos(angleDiff);

    this.angle = Math.atan2(newvx,newvz); 
    if(this.angle < 0) this.angle = 2*Math.PI + this.angle;


    }

}