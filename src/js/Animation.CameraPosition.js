/**
 * Created by ionescusilviuciprian on 11/09/15.
 */
if(!Animations) var Animations = new Object();

Animations.CameraPosition = function() {
    this.tick = function(timestamp, application) {
        application.getCamera().position.set(opts.cameraX, opts.cameraY, opts.cameraZ);
        application.getCamera().lookAt(new THREE.Vector3( opts.lookAtX, opts.lookAtY, opts.lookAtZ ));
    }
}
