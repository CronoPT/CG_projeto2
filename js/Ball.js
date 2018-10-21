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
        

        this.radius = radius;
        this.speed = SPEED;
        this.rotation.y = angle;
        this.meshSphere = mesh;
        this.add(new THREE.AxesHelper(35));

        this.add(mesh);
        this.position.set(x, y, z);
    }

    getAngle(){
        return this.rotation.y;
    }

    getRadius(){
        return this.radius;
    }

    getSpeed(){
        return this.speed;
    }
    moveBall(delta){
        'use strict'

        var xSpeed = this.speed * Math.sin(this.rotation.y);
        var zSpeed = this.speed * Math.cos(this.rotation.y);
        this.position.x += xSpeed * delta;  
        this.position.z += zSpeed * delta;

        this.meshSphere.rotateX(delta * this.speed/this.radius); 
    }

    increaseSpeed(){
        'use strict';

        this.speed += INCREMENT; 
    }


    processCollision(angleDiff, ball){      //angleDiff,b2speed,b2angle){
        'use strict';

        var newSpeedz = ball.getSpeed()*Math.cos(ball.getAngle()-angleDiff)*Math.cos(angleDiff)
                    + this.speed*Math.sin(this.rotation.y-angleDiff)*Math.sin(angleDiff);
        
        var newSpeedx = ball.getSpeed()*Math.cos(ball.getAngle()-angleDiff)*Math.sin(angleDiff) 
                    + this.speed*Math.sin(this.rotation.y-angleDiff)*Math.cos(angleDiff);

        this.setAngleNotMesh(Math.atan2(newSpeedx,newSpeedz)); 
        
        if(this.angle < 0) this.rotation = 2*Math.PI + this.angle;

    }

    setAngleNotMesh(alpha){
        'use strict';

        var aux = this.rotation.y;
        this.rotation.y = alpha;
        this.meshSphere.rotateY(aux - alpha);
    }

}