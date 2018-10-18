/*--------------------------------------------------------------------
| CHAIR
---------------------------------------------------------------------*/
class Chair {

	constructor(x,y,z, scene){
		'use strict';
		this.rodaFrente = null;
		this.rodaTras = null;
		this.rodaEsq  = null;
		this.rodaDir  = null;
		this.total    = new THREE.Object3D();
		this.material = new THREE.MeshBasicMaterial( {color:0xff0000, wireframe:true});
		this.parteCima  = this.addAbstractTop(this.total);
		this.parteBaixo = this.addAbstractBot(this.total);

		this.speed0 = 0;
		this.speed  = 0;
		this.angle0 = 0;
		this.angle  = 0;

		this.acceleratingFor = false;
		this.acceleratingBak = false;
		this.turningRight = false;
		this.turningLeft  = false;

		this.acceleration = 0;
		this.angularSpeed = 0;

		this.total.position.set(x,y+(30 + 6 + 8/2),z);
		

		scene.add(this.total);	
	}

	addAbstractTop(obj){
		'use strict';

		var one = new THREE.Object3D();
		this.addConcreteEnconsto(one);
		this.addConcreteSit(one);
		one.position.set(0,0,0);
		obj.add(one);
		return one;

	}

	addConcreteEnconsto(obj){
		'use strict';

		geometry = new THREE.CubeGeometry(48,66,10);
		material = new THREE.MeshBasicMaterial( {color:"blue",wireframe:true});
		mesh     = new THREE.Mesh(geometry,material);
		obj.add(mesh);
		mesh.position.set(0, 37,-19);

	}

	addConcreteSit(obj){	
		'use strict';

		geometry = new THREE.CubeGeometry(48,8,48);
		material = new THREE.MeshBasicMaterial( {color:"blue",wireframe:true});
		mesh     = new THREE.Mesh(geometry,material);
		obj.add(mesh);

		mesh.position.set(0,0,0);
	}

 	addAbstractBot(obj){
		'use strict';

		var one = new THREE.Object3D();
		this.addConcretePilar(one);
		this.addConcreteSuporte(one, 0, -(30/2 - 2/2),  (20/2 + 6/2), 0);
		this.addConcreteSuporte(one, 0, -(30/2 - 2/2), -(20/2 + 6/2), 0);
		this.addConcreteSuporte(one,  (20/2 + 6/2), -(30/2 - 2/2), 0, Math.PI/2);
		this.addConcreteSuporte(one, -(20/2 + 6/2), -(30/2 - 2/2), 0, Math.PI/2);

		//FIXME ver os desvios em relaçao a X e Z
		this.rodaTras   = this.addConcreteRoda(one,  20, -(30/2 + 6/2),  0,  Math.PI/2);
		this.rodaFrente = this.addConcreteRoda(one, -20, -(30/2 + 6/2),  0,  Math.PI/2);
		this.rodaEsq    = this.addConcreteRoda(one,  0,  -(30/2 + 6/2),  20, Math.PI/2);
		this.rodaDir    = this.addConcreteRoda(one,  0,  -(30/2 + 6/2), -20, Math.PI/2);
		one.position.set(0, -(30/2 + 8/2), 0);
		obj.add(one);

		this.parteBaixo = one;

		return one;	
	}

	addConcretePilar(obj){
		'use strict';

		geometry = new THREE.CubeGeometry(6,30,6);
		material = new THREE.MeshBasicMaterial({color:"green",wireframe:true});
		mesh     = new THREE.Mesh(geometry,material);
		obj.add(mesh);
		mesh.position.set(0,0,0);
		
	}

	addConcreteSuporte(obj, x, y, z, angle){
		'use strict';

		geometry = new THREE.CubeGeometry(6,2,20);
		material = new THREE.MeshBasicMaterial({color:"green",wireframe:true});
		mesh     = new THREE.Mesh(geometry,material);
		obj.add(mesh);

		mesh.rotateY(angle);
		mesh.position.set(x,y,z);
	}

	addConcreteRoda(obj, x, y, z, angle){
		'use strict';

		geometry = new THREE.TorusGeometry(2, 1, 10, 10);
		material = new THREE.MeshBasicMaterial({color:"red", wireframe:true});
		mesh     = new THREE.Mesh(geometry,material);


		mesh.position.set(x, y, z);
		mesh.rotateY(angle); 

		obj.add(mesh);

		return mesh;
	}
  /******************************************************|
  |*              MOVEMENT OF CHAIR                     *|
  |******************************************************/
	moveChair(tBtweenFrames){
		'use strict';
		this.solveAngle(tBtweenFrames);
		this.solvePosition(tBtweenFrames);
	}

    solveAngle(tBtweenFrames){
		'use strict';
		if(this.angularSpeed != 0){
			this.angle = this.angle + this.angularSpeed * tBtweenFrames;
			this.parteCima.rotation.y = this.angle;

		}	
	}

	solvePosition(tBtweenFrames){
		'use strict';

		var elapsed = tBtweenFrames;

		var atrito = 0;
		var acc;
		var xSpeed = 0; 
		var zSpeed = 0;

		this.speed0 = this.speed;

		if(this.speed0 > 0)    atrito = -1*FRICTION;
		else if(this.speed0<0) atrito = 1*FRICTION;

		acc = this.acceleration + atrito;
		this.speed  = this.speed + acc *elapsed;
		zSpeed = this.speed*Math.cos(this.angle);
		xSpeed = this.speed*Math.sin(this.angle);
		this.total.position.x += xSpeed*elapsed; 
		this.total.position.z += zSpeed*elapsed;


		if(xSpeed || zSpeed) {		
			
			this.rodaFrente.rotation.y = this.angle + Math.PI/2 ;
			this.rodaTras.rotation.y = this.angle  + Math.PI/2;
			this.rodaEsq.rotation.y = this.angle + Math.PI/2;
			this.rodaDir.rotation.y = this.angle + Math.PI/2;
		}

		if(this.speed0 < 0 && this.speed > 0)    this.speed = 0;
		else if(this.speed0 >0 && this.speed< 0) this.speed = 0;
 
	}

 /*************************************************************
 |					    SETTERS                              *
 |************************************************************/
	
	pressDown(){
		'use strict';
		if(!this.acceleratingBak){
			this.acceleration -= ACCEL;
			this.acceleratingBak = true;
		}
	}

	pressRight(){
		'use strict';
		if(!this.turningRight){
			this.angle0  = this.angle;
			this.angularSpeed -= OMEGA;
			this.turningRight = true;
		}
	}

	pressUp(){
		'use strict';
		if(!this.acceleratingFor){
			this.acceleration += ACCEL;
			this.acceleratingFor = true;
		}
	}

	pressLeft(){
		'use strict';
		if(!this.turningLeft){
			this.angle0  = this.angle;
			this.angularSpeed += OMEGA;
			this.turningLeft = true;
		}
	}

	releaseDown(){
		'use strict';
		this.speed0  = this.speed;
		this.acceleration += ACCEL;
		this.acceleratingBak = false;
	}

	releaseRight(){
		'use strict';
		this.angle0  = this.angle;
		this.angularSpeed += OMEGA;
		this.turningRight = false;
	}

	releaseUp(){
		'use strict';
		this.speed0  = this.speed;
		this.acceleration -= ACCEL;
		this.acceleratingFor = false;
	}

	releaseLeft(){
		'use strict';
		this.angle0  = this.angle;
		this.angularSpeed -= OMEGA;
		this.turningLeft = false;
	}
};	