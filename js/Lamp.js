/*--------------------------------------------------------------------
| LAMP
---------------------------------------------------------------------*/
class Lamp{
    constructor(x, y ,z, scene){
    'use strict';

    this.object = new THREE.Object3D();
    
    this.addLampBase(0, 0, 0);
    this.addLampStick(0, 18, 0);
    this.addLampAbajour(0, 130 + 18 - 10, 0);
    this.addLampLight(0, 130 + 18, 0);

    this.object.position.set(x, y, z);
    scene.add(this.object);
    }

    // auxiliar functions
    addLampBase(x, y, z){
        'use strict';
        var geometry = new THREE.ConeGeometry(30, 20, 20, 20);
        var material = new THREE.MeshBasicMaterial({ color: "grey", wireframe: true });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y + 20/2, z);
        this.object.add(mesh);
    }
    
    
    // newwwwwww
    addLampStick(x, y, z){
        'use strict';
        var geometry = new THREE.CylinderGeometry(3, 3, 130, 10, 10, true);
        var material = new THREE.MeshBasicMaterial({ color: "green", wireframe: true });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y + 130/2, z);
        this.object.add(mesh);
    }
    
    addLampAbajour(x, y, z){
        'use strict';
        var geometryOutside = new THREE.CylinderGeometry(12, 20, 30, 20, 20, true);
		var materialOutside = new THREE.MeshBasicMaterial({ color: "orange", wireframe: true, side: THREE.DoubleSide });
        var meshOutside = new THREE.Mesh(geometryOutside, materialOutside);
        
        var geometrySupport = new THREE.ConeGeometry(12, -(20 + 20/3), 3, 1, true);
        var materialSupport = new THREE.MeshBasicMaterial({ color: "white", wireframe: true });
        var meshSupport = new THREE.Mesh(geometrySupport, materialSupport);
    
        meshOutside.position.set(x, y + 30/2, z);
        meshSupport.position.set(x, y + 30 - (20 + 20/3) + (20 + 20/3)/2, z);
        this.object.add(meshOutside);
        this.object.add(meshSupport);
    }
    
    addLampLight(x, y, z){
        'use strict';
        var geometry = new THREE.SphereGeometry(3, 60, 60);
        var material = new THREE.MeshBasicMaterial({ color: "red", wireframe: false });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        this.object.add(mesh);
    }

}
