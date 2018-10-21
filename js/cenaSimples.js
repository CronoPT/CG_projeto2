

var camera, scene, renderer, clock;

var lateralCamera;
var frontCamera;
var upCamera;
var prespCamera;

var field;

var mobilePerspectiveCamera;

var hasAxisHelper = false;
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

	createPrespCamera();
	createUpCamera();
	mobilePerspectiveCamera = new MobilePerspectiveCamera(
		field.getBall(0), 40, 80, 120, window.innerWidth / window.innerHeight,
		1, 500);

	camera = prespCamera;

	render();

	window.addEventListener("resize", onResize);
	window.addEventListener("keydown", onKeyDown);
	var numSec = Math.random()*(120000-30000) + 30000;
	setInterval(function(){ field.increaseSpeed(); }, numSec);
}

/*--------------------------------------------------------------------
| Function: animate - onde toda a magia acontece - todas as 
| atualizações de posições acontecem nesta funcao
---------------------------------------------------------------------*/
function animate(){
	'use strict';

	var delta = clock.getDelta();
	field.moveBalls(delta);
	field.processCollisions(); 
	if(camera == mobilePerspectiveCamera){
		camera.moveCamera();
	}

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
	prespCamera.lookAt(field.width/2, 0, field.depth/2);
}

function createUpCamera(){
	'use strict';

	var viewHeight = 300;
	var aspectratio = window.innerWidth / window.innerHeight;
	upCamera = new THREE.OrthographicCamera(aspectratio*viewHeight/2,
										   -aspectratio*viewHeight/2,
										   -viewHeight/2,
	   									    viewHeight/2,
	   									   -1000, 1000);
	
	upCamera.position.set(field.width/2, 200, field.depth/2);
	upCamera.lookAt(field.width/2, 0, field.depth/2);
}

/*--------------------------------------------------------------------
| PRESS KEYS
---------------------------------------------------------------------*/
function onKeyDown(e){
	'use strict';
	//console.log(e.keyCode);
	switch(e.keyCode){
		case 49: //1
			camera = upCamera;
			break;

		case 50: //2
			camera = prespCamera;
			break;

		case 51: //3
			camera = mobilePerspectiveCamera;
			camera.setBall(field.getBall(0));
			break;
	

		case 65://A
		case 97://a
			scene.traverse(function(node){
				if(node instanceof THREE.Mesh){
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;

		case 69://E
		case 102://e
			for( var i = 0; i < BALLS; i++){
				field.getBall(i).axisHelper.visible = !hasAxisHelper;
			}
			hasAxisHelper = !hasAxisHelper;
			break;
	}
}
