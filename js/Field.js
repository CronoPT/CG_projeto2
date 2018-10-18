/*--------------------------------------------------------------------
| Class: Field
---------------------------------------------------------------------*/

const WALL  = 2;
const BALLS = 10;
const NEARWIDTH = 1;
const FARWIDTH  = 2;
const NEARDEPTH = 3;
const FARDEPTH  = 4;

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

        var i;
        for(i=0; i<BALLS; i++){
            this.balls[i].moveBall(delta);
        }
    }

    wallColisions(){
        'use strict';

        var i, ball;
        for(i = 0; i<BALLS; i++){
            ball = this.balls[i];

            if(ball.position.x - this.height/2 < 0){
            //near width wall
                ball.angle = -ball.angle;
                ball.position.x = this.height/2;

            }else if(ball.position.x + this.height/2 > this.width){
            //far width wall
                ball.angle = -ball.angle;
                ball.position.x = this.width-this.height/2;

            }else if(ball.position.z - this.height/2 < 0){
            //near depth wall
                ball.angle = Math.PI-ball.angle;
                ball.position.z = this.height/2;

            }else if(ball.position.z + this.height/2 > this.depth){
            //far depth wall
                ball.angle = Math.PI-ball.angle;
                ball.position.z = this.depth-this.height/2;

            }
        }
    }

    increaseSpeed(){
        'use strict';

        var i;
        for(i=0; i<BALLS; i++){
            this.balls[i].increaseSpeed();
        }
    }

}

