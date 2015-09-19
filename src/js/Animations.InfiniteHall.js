if(!Animations) var Animations = new Object();

Animations.InfiniteHall = function() {
	var hallVisibleSegments = 15,
		speed = 0.015;

	var hallSegments = Array();

	for(var i=0; i<hallVisibleSegments; i++) {
		hallSegments.push(new Objects.HallSegment(0));
	}

	var _addEdgesGeometry = function() {
		var edgesArray = Array();

		for(var i=0; i<hallVisibleSegments; i++) {
			hallSegments[i].getObject3D().traverse(function(obj){
				if(obj.geometry) {
					var newEdge = new THREE.EdgesHelper( obj, 0xe8dabe );
					newEdge.material.linewidth = 4;
					edgesArray.push(newEdge);
				}
			});
		}

		return edgesArray;
	}

	this.init = function(application) {
		for(var i=0; i<hallVisibleSegments; i++) {
			application.getScene().add(hallSegments[i].getObject3D());
			hallSegments[i].getObject3D().position.y = (0.5 * i);
		}

		this.edgeSegments = _addEdgesGeometry();
		for(i in this.edgeSegments){ 
			application.getScene().add(this.edgeSegments[i]);
		}

	}

    this.tick = function(timestamp, application) {
        for(var i=0; i<hallVisibleSegments; i++) {
        	hallSegments[i].getObject3D().position.y -= speed;
        }
        if(hallSegments[0].getObject3D().position.y<-0.5){
    		hallSegments[0].getObject3D().position.y = hallSegments[hallVisibleSegments-1].getObject3D().position.y + 0.5;//(hallVisibleSegments-1) * .5;
    		hallSegments.push(hallSegments.shift());
    	}
    }
}
