/*--------------------------------------------------------------------
| Class: Ball
---------------------------------------------------------------------*/

const MIN_INCREMENT_SPEED = 5;
const MAX_INCREMENT_SPEED = 20;

class Ball extends THREE.Object3D{


    constructor(radius, angle, speedValue, x, y, z){
        'use strict';

        super();
        var geometry = new THREE.SphereGeometry(radius, 15, 15);
        var material = new THREE.MeshBasicMaterial( {color:0x42f453, wireframe:true});
        this.mesh     = new THREE.Mesh(geometry, material);
        
        this.axisHelper = new THREE.AxesHelper(35);
        this.axisHelper.visible = false;
        this.radius = radius;
        this.speedValue = speedValue;
        this.speedAngle = angle;
        
        this.add(this.mesh);
        this.add(this.axisHelper);
        this.position.set(x, y, z);
    }

    getAngle(){
        'use strict';
        return this.speedAngle;
    }

    getRadius(){
        'use strict';
        return this.radius;
    }

    getSpeed(){
        'use strict';
        return this.speedValue;
    }

    moveBall(delta){
        'use strict';

        // MOVE
        //

        // v = ( xSpeed, 0, zSpeed)
        var xSpeed = this.speedValue * Math.sin(this.speedAngle);
        var zSpeed = this.speedValue * Math.cos(this.speedAngle);
        this.position.x += xSpeed * delta;  
        this.position.z += zSpeed * delta;

        // ROTATE
        //

        // speed axis = v normalized
        var axis = new THREE.Vector3(xSpeed/this.speedValue, 0, zSpeed/this.speedValue);

        // vector (no mundo) sobre o qual a bola roda => roda na direccao de movimento
        axis.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI/2);

        this.rotateOnWorldAxis(axis ,delta * this.speedValue/this.radius); 
    }

    increaseSpeed(){
        'use strict';

        this.speedValue += Math.random()*(MAX_INCREMENT_SPEED - MIN_INCREMENT_SPEED) + MIN_INCREMENT_SPEED; 
    }


    processCollision(angleDiff, b2SpeedValue, b2SpeedAngle){
        'use strict';

        var new_zSpeed = b2SpeedValue*Math.cos(b2SpeedAngle-angleDiff)*Math.cos(angleDiff)
                    + this.speedValue*Math.sin(this.speedAngle-angleDiff)*Math.sin(angleDiff);
        
        var new_xSpeed = b2SpeedValue*Math.cos(b2SpeedAngle-angleDiff)*Math.sin(angleDiff) 
                    + this.speedValue*Math.sin(this.speedAngle-angleDiff)*Math.cos(angleDiff);

        this.speedAngle = Math.atan2(new_xSpeed,new_zSpeed); 
    }

}
