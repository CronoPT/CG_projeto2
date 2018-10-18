/*--------------------------------------------------------------------
| TABLE
---------------------------------------------------------------------*/
class Table{
	constructor(x, y, z, scene){
		'use strict'

		this.total = new THREE.Object3D();
	 
		this.addTabletop(this.total, 0, (70 - 2/2), 0);
		this.addTableleg(this.total, 0, 68/2, 0);
		this.addTablefoot(this.total,  0 , 2/2,  (30/2 + 6/2), 0);
		this.addTablefoot(this.total, -(30/2 + 6/2), 2/2,  0 , Math.PI/2);
		this.addTablefoot(this.total,  0 , 2/2, -(30/2 + 6/2), Math.PI);
		this.addTablefoot(this.total,  (30/2 + 6/2), 2/2,  0 , Math.PI*(3/2));
		
		this.total.position.set(x, y, z);
	
		scene.add(this.total);
	}

	addTablefoot(obj, x, y, z, angle){
		'use strict'
	
		geometry = new THREE.CubeGeometry(6, 2 , 30);
		material = new THREE.MeshBasicMaterial({color:0x6666ff, wireframe:true});
		mesh     = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		mesh.rotation.y = angle;
		obj.add(mesh); 
	}
	
	addTableleg(obj, x, y, z){
		'use strict'
	
		geometry = new THREE.CubeGeometry(6, 68, 6);
		material = new THREE.MeshBasicMaterial({color:0x0066ff, wireframe:true});
		mesh     = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		obj.add(mesh); 
	}
	
	addTabletop(obj, x, y, z){
		'use strict';
	
		geometry = new THREE.CylinderGeometry(70, 68, 2, 70);
		material = new THREE.MeshBasicMaterial({color:0x3399ff, wireframe:true});
		mesh     = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, z);
		obj.add(mesh);
	}
};
