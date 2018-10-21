/*--------------------------------------------------------------------
| Class: Field
---------------------------------------------------------------------*/

const WALL  = 2;
const BALLS = 2;

class Field extends THREE.Object3D{

    constructor(width, height, depth){  
        'use strict';

        super();
        this.addBase(width, depth, (width+WALL*2)/2 - WALL, -WALL/2, (depth+WALL*2)/2 - WALL);
        this.addWidthWall(width, height, (width+WALL*2)/2 - WALL, height/2, -WALL/2); //closest to the X axis
        this.addWidthWall(width, height, (width+WALL*2)/2 - WALL, height/2, depth+WALL/2);
        this.addDepthWall(depth, height, -WALL/2, height/2, depth/2); //closest to the Z axis
        this.addDepthWall(depth, height, width+WALL/2, height/2, depth/2);
        

        this.balls = [];

        
        var i, ball, x, z, angle;
        for(i=0; i<BALLS; i++){
            x = Math.random()*(width-height/2 - height/2) + height/2;
            z = Math.random()*(depth-height/2 - height/2) + height/2;
            angle = Math.random()*2*Math.PI; 
            ball = new Ball(height/2, angle, x, height/2, z);
            this.balls.push(ball);
        }

        this.width  = width;
        this.height = height;
        this.depth  = depth; 

   


        this.balls[0].meshSphere.material.color.setHex(0xff0000);


    }

    getBall(number){
        return this.balls[number];
    }

    addBase(width, depth, x, y, z){
        'use strict';

        var geometry = new THREE.BoxGeometry(width+WALL*2,  WALL, depth+WALL*2);
        var material = new THREE.MeshBasicMaterial( {color:0x42adf4, wireframe:true});
        var mesh     = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addWidthWall(width, height, x, y, z){
        'use strict';

        var geometry = new THREE.BoxGeometry(width+WALL*2, height, WALL);
        var material = new THREE.MeshBasicMaterial( {color:0x42adf4, wireframe:true});
        var mesh     = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addDepthWall(depth, height, x, y, z){
        'use strict';

        var geometry = new THREE.BoxGeometry(WALL, height, depth);
        var material = new THREE.MeshBasicMaterial( {color:0x42adf4, wireframe:true});
        var mesh     = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.add(mesh);
    }

    addToScene(scene){
        'use strict';

        scene.add(this);

        var i;
        for(i=0; i<BALLS; i++){
            scene.add(this.balls[i]);
        }
    }

    moveBalls(delta){
        'use strict';
            //
        var i;
        for(i=0; i<BALLS; i++){
            this.balls[i].moveBall(delta);
        }
    }


    processCollisions(){
    	this.wallColisions();
    	this.allBallColisions();
    }

    processGame(delta){
   		this.moveBalls(delta);
		this.processCollisions();
    }

	
    wallColisions(){
        'use strict';

        var i, ball;      	

        for(i = 0; i<BALLS; i++){
            ball = this.balls[i];

            if(ball.position.x - this.height/2 < 0){
            //near width wall
                ball.setAngleNotMesh(-ball.rotation.y);
                ball.position.x = this.height/2;
                
            }else if(ball.position.x + this.height/2 > this.width){
            //far width wall
                ball.setAngleNotMesh(-ball.rotation.y);
                ball.position.x = this.width-this.height/2;

            }else if(ball.position.z - this.height/2 < 0){
            //near depth wall
                ball.setAngleNotMesh(Math.PI-ball.rotation.y);
                ball.position.z = this.height/2;

            }else if(ball.position.z + this.height/2 > this.depth){
            //far depth wall
                ball.setAngleNotMesh(Math.PI-ball.rotation.y);
                ball.position.z = this.depth-this.height/2;

            }

            // if(ball.angle > Math.PI*2) ball.rotation.y = 2*Math.PI - ball.rotation.y;
            // else if(ball.rotation.y < 0)    ball.rotation.y = 2*Math.PI + ball.rotation.y;

         
        }
    


    }

	allBallColisions(){
		
		var i,o;
		for(i=0; i<BALLS; i++){
			for(o=i+1;o<BALLS;o++){
				this.ballCollision(this.balls[i],this.balls[o]);
			}
		}

	}



    ballCollision(ball1,ball2,n){
        'use strict';     

        var vecChoqueX = (ball2.position.x - ball1.position.x);
        var vecChoqueZ = (ball2.position.z - ball1.position.z);
        var dist = Math.sqrt(vecChoqueX*vecChoqueX + vecChoqueZ*vecChoqueZ);
        
        var centerVectorX = vecChoqueX/2;
        var centerVectorZ = vecChoqueZ/2;

        var radiusNormVecX = ball1.radius*vecChoqueX/dist;
        var radiusNormVecZ = ball1.radius*vecChoqueZ/dist;

        var offsetx = radiusNormVecX - centerVectorX;
        var offsetz = radiusNormVecZ - centerVectorZ;
    
        if(dist > (ball2.radius + ball1.radius) )return;
    
        var angleDiff = Math.atan2(vecChoqueX,vecChoqueZ);
  
        if(angleDiff < 0) angleDiff = 2*Math.PI + angleDiff;

        //nao substituir as igualdades nas funçoes ĺá em baixo (deixar isto aqui!)

        ball1.processCollision(angleDiff,ball2);
        ball2.processCollision(angleDiff,ball1);

        ball1.position.x = ball1.position.x - offsetx;
        ball1.position.z = ball1.position.z - offsetz;

        ball2.position.x = ball2.position.x + offsetx;
        ball2.position.z = ball2.position.z + offsetz;

        vecChoqueX = (ball2.position.x - ball1.position.x);
        vecChoqueZ = (ball2.position.z - ball1.position.z);
        dist = Math.sqrt(vecChoqueX*vecChoqueX + vecChoqueZ*vecChoqueZ);
    }



    increaseSpeed(){
        'use strict';

        var i;
        for(i=0; i<BALLS; i++){
            this.balls[i].increaseSpeed();
        }
    }

}
