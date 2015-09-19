function WorldLight (appScene) {

    if(!appScene) throw "WorldLight needs a scene to bind to.";

    //add a simple ambient light
    var ambientLight = new THREE.AmbientLight( 0x404040 );

    //appScene.add(ambientLight);

    return this;
}