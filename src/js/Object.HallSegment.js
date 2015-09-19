if(!Objects) var Objects = new Object();

Objects.HallSegment = function(level) {
	if(level >= 4) return false;
	this.level = level;
	
	var obj3d = new THREE.Object3D();

	//var genericMaterial = new THREE.MeshBasicMaterial( { color: 0x091838, wireframe: false } );
	var genericMaterial = new THREE.LineBasicMaterial({
		color: 0x091838
	});

	/*
		Create the Arcade
	 */

	var pieces = 20;
	var angleIncrements = 180 / pieces;
	var arcadeRadius = 0.5;

	var tunnelSegmentGeometry = new THREE.Geometry();

	for (var x = 0; x <= 180; x+= angleIncrements) {
		var startAngle = x * Math.PI / 180;
		tunnelSegmentGeometry.vertices.push(
			new THREE.Vector3(arcadeRadius * Math.cos(startAngle), -0.25, 0.5 + (arcadeRadius * Math.sin(startAngle))),
			new THREE.Vector3(arcadeRadius * Math.cos(startAngle), +0.25, 0.5 + (arcadeRadius * Math.sin(startAngle)))
		);
	}

	for(var i=0; i < 20; i++) {
		tunnelSegmentGeometry.faces.push(new THREE.Face3( (i*2)+1,i*2, (i*2)+2));
		tunnelSegmentGeometry.faces.push(new THREE.Face3( (i*2)+1, (i*2)+2, (i*2)+3));
	}

	tunnelSegmentGeometry.computeBoundingSphere();

	var arcade = new THREE.Mesh(tunnelSegmentGeometry, genericMaterial);
	obj3d.add(arcade);


	/*
		Create Side Arches
	 */

	var reduceRatio = 0.7199;
	var reducedWidth = 0.5 * reduceRatio;
	var margin = (0.5 - reducedWidth) / 2;

	var archShape = new THREE.Shape();
	archShape.moveTo(0,0);
	archShape.lineTo(0,0.5);
	archShape.lineTo(0.5,0.5);
	archShape.lineTo(0.5,0);
	archShape.lineTo(margin + reducedWidth, 0);
	
	var subArcRadius = reducedWidth / 2;
	var horizontalCenter = margin + subArcRadius;
	var verticalCenter = subArcRadius;

	for (var x = 0; x <= 180; x+= angleIncrements) {
		var startAngle = x * Math.PI / 180;
		archShape.lineTo(
				horizontalCenter + (subArcRadius * Math.cos(startAngle)),
			verticalCenter + (subArcRadius * Math.sin(startAngle))
		);
	}

	archShape.lineTo(margin, 0);

	var transformMatrix = new THREE.Matrix4();
	transformMatrix.multiply(new THREE.Matrix4().makeRotationX(90 * Math.PI /180));
	transformMatrix.multiply(new THREE.Matrix4().makeRotationY(90 * Math.PI /180));
	transformMatrix.multiply(new THREE.Matrix4().makeTranslation(-0.25,0,-0.5));

	tunnelSegmentGeometry.merge(new THREE.ShapeGeometry(archShape), transformMatrix);

	var transformMatrix = new THREE.Matrix4();
	transformMatrix.multiply(new THREE.Matrix4().makeRotationX(90 * Math.PI /180));
	transformMatrix.multiply(new THREE.Matrix4().makeRotationY(-90 * Math.PI /180));
	transformMatrix.multiply(new THREE.Matrix4().makeTranslation(-0.25,0,-0.5));

	tunnelSegmentGeometry.merge(new THREE.ShapeGeometry(archShape), transformMatrix);

	this.geometry = tunnelSegmentGeometry;

	/*
		Create ground plane
	 */

	var groundShape = new THREE.Shape();
	groundShape.moveTo(-0.499,-0.25);groundShape.moveTo(-0.499,0.25);
	groundShape.moveTo(0.001,0.25);groundShape.moveTo(0.001,-0.25);
	tunnelSegmentGeometry.merge(new THREE.ShapeGeometry(groundShape));

	var groundShape = new THREE.Shape();
	groundShape.moveTo(0,-0.25);groundShape.moveTo(0,0.25);
	groundShape.moveTo(0.499,0.25);groundShape.moveTo(0.499,-0.25);
	tunnelSegmentGeometry.merge(new THREE.ShapeGeometry(groundShape));


	/*
		Create Subarc Segments
	 */

	var segments = 1;
	if(level == 0) segments = 3;

	for(var i=1; i<=segments; i++) {
		var nextLevelSegmentLeft = new Objects.HallSegment(level + 1);
		if(nextLevelSegmentLeft.level) {

			if(nextLevelSegmentLeft.geometry) {
				var transformMatrix = new THREE.Matrix4();
				var subSegmentRatio = .5 * reduceRatio;
				var displaceValue = (0.5 + (0.5 / 2 * subSegmentRatio)) + (0.5 * subSegmentRatio * (i-1));

				transformMatrix.multiply(new THREE.Matrix4().makeRotationZ(90 * Math.PI /180));
				transformMatrix.multiply(new THREE.Matrix4().makeTranslation(0,displaceValue,0));
				transformMatrix.multiply(new THREE.Matrix4().makeScale(subSegmentRatio, subSegmentRatio, subSegmentRatio));

				tunnelSegmentGeometry.merge(nextLevelSegmentLeft.geometry, transformMatrix);
			}

		}

		var nextLevelSegmentRight = new Objects.HallSegment(level + 1);
		if(nextLevelSegmentRight.level) {
			if(nextLevelSegmentLeft.geometry) {

				var transformMatrix = new THREE.Matrix4();
				var subSegmentRatio = .5 * reduceRatio;
				var displaceValue = (0.5 + (0.5 / 2 * subSegmentRatio)) + (0.5 * subSegmentRatio * (i-1));

				transformMatrix.multiply(new THREE.Matrix4().makeRotationZ(90 * Math.PI /180));
				transformMatrix.multiply(new THREE.Matrix4().makeTranslation(0,-displaceValue,0));
				transformMatrix.multiply(new THREE.Matrix4().makeScale(subSegmentRatio, subSegmentRatio, subSegmentRatio));

				tunnelSegmentGeometry.merge(nextLevelSegmentRight.geometry, transformMatrix);
			}
		}
	}

	this.obj3d = obj3d;
	return this;
}

Objects.HallSegment.prototype.getObject3D = function(){
	return this.obj3d;
}

