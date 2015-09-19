/**
 * Created by ionescusilviuciprian on 11/09/15.
 */
if(!Animations) var Animations = new Object();

Animations.CameraWiggle = function() {

	var cameraDefaultPosition = {
			x:.2,
			y:1,
			z:0.25
		},
		min = - Math.PI,
		max = Math.PI;

	var camera;

	this.init = function(application) {
        camera = application.getCamera();
	}

    this.tick = function(timestamp, application) {
        var percent = (timestamp % 100 / 10);
        if(camera && camera.position) {
        	camera.position.z = cameraDefaultPosition.z + Math.sin(timestamp/200)/20; 
        	camera.position.x = cameraDefaultPosition.x + Math.cos(timestamp/400)/10; 
        }

    }
}
