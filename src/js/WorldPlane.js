function WorldPlane (appScene) {

	if(!appScene) throw "WorldPlane needs a scene to bind to.";

    var planeGeometry = new THREE.PlaneGeometry(5, 50, 1, 1);
    var planeMaterial = new THREE.MeshBasicMaterial( { color: 0x091838, wireframe: false } );
	var simplePlane = new THREE.Mesh(planeGeometry, planeMaterial);

	appScene.add(simplePlane);

	return this;
}