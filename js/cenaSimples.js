

var camera, scene, renderer, clock;

var lateralCamera;
var frontCamera;
var upCamera;
var prespCamera;

var field;

/*--------------------------------------------------------------------
| Function: init
---------------------------------------------------------------------*/
function init(){
	'use strict';

	clock = new THREE.Clock(true);

	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	createScene();

	createFrontCamera();
	createLateralCamera();
	createPrespCamera();
	createUpCamera();

	camera = prespCamera;
	camera.lookAt(scene.position);

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	setTimeout(function(){ field.increaseSpeed(); }, 5000);
}

/*--------------------------------------------------------------------
| Function: animate - onde toda a magia acontece - todas as 
| atualizações de posições acontecem nesta funcao
---------------------------------------------------------------------*/
function animate(){
	'use strict';

	var delta = clock.getDelta();
	field.moveBalls(delta);
	field.wallColisions();

	render();
	requestAnimationFrame(animate);
}

/*--------------------------------------------------------------------
| Function: render
---------------------------------------------------------------------*/
function render(){
	'use strict';
	 renderer.render(scene,camera);
}

/*--------------------------------------------------------------------
| Function: createScene
---------------------------------------------------------------------*/
function createScene(){
	'use strict';

	scene = new THREE.Scene();
	scene.add(new THREE.AxesHelper(210));

	field = new Field(100, Math.sqrt(Math.pow(100, 2)+Math.pow(200, 2))/10, 200);
	
	field.addToScene(scene);
}

/*--------------------------------------------------------------------
| Function: onResize - called when the window is resized, makes
| sure the scene has the same aspect ratio as the window
---------------------------------------------------------------------*/
function onResize(){
	'use strict'

	renderer.setSize(window.innerWidth, window.innerHeight);

	if(window.innerHeight>0 && window.innerWidth>0){
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}

}

/*--------------------------------------------------------------------
| CAMERAS
---------------------------------------------------------------------*/
function createPrespCamera(){
	'use strict';
	prespCamera = new THREE.PerspectiveCamera(80,
											  window.innerWidth / window.innerHeight,
											  1,1000);

	prespCamera.position.set(200, 200, 200);
}

function createFrontCamera(){
	'use strict';

	var viewHeight = 400;
	var aspectratio = window.innerWidth / window.innerHeight;
	frontCamera = new THREE.OrthographicCamera(-aspectratio*viewHeight/2,
											    aspectratio*viewHeight/2,
											    viewHeight/2,
											   -viewHeight/2,
											   -1000, 1000);
	
	frontCamera.position.set(0, 70, 400);
}

function createLateralCamera(){
	'use strict';

	var viewHeight = 700;
	var aspectratio = window.innerWidth / window.innerHeight;
	lateralCamera = new THREE.OrthographicCamera(-aspectratio*viewHeight/2,
												  aspectratio*viewHeight/2,
												  viewHeight/2,
	   										     -viewHeight/2,
	   										     -1000, 1000);

	lateralCamera.position.set(400, 70, 0);
}

function createUpCamera(){
	'use strict';

	var viewHeight = 800;
	var aspectratio = window.innerWidth / window.innerHeight;
	upCamera = new THREE.OrthographicCamera(aspectratio*viewHeight/2,
										   -aspectratio*viewHeight/2,
										   -viewHeight/2,
	   									    viewHeight/2,
	   									   -1000, 1000);
	
	upCamera.position.set(0, 400, 0);
}

/*--------------------------------------------------------------------
| PRESS KEYS
---------------------------------------------------------------------*/
function onKeyDown(e){
	'use strict';

	switch(e.keyCode){
		case 49: //1
			camera = frontCamera;
			camera.lookAt(0, 70, 0);
			break;

		case 50: //2
			camera = lateralCamera;
			camera.lookAt(0, 70, 0);
			break;

		case 51: //3
			camera = prespCamera;
			camera.lookAt(scene.position);
			break;

		case 52: //4
			camera = upCamera;
			camera.lookAt(scene.position);
			break;

		case 65://A
		case 97://a
			scene.traverse(function(node){
				if(node instanceof THREE.Mesh){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
	}
}
