function App() {

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer({ 
		antialias: true,
		alpha: true,
		precision: 'highp',
		devicePixelRatio: window.devicePixelRatio || 1
    });

	var self = this;

	pixelRatio = window.devicePixelRatio || 1;

	renderer.setSize( window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
	document.getElementById('content').appendChild( renderer.domElement );
	renderer.domElement.style.width = window.innerWidth + 'px';
	renderer.domElement.style.height = window.innerHeight + 'px';

	scene.fog = new THREE.Fog(0xffffff, 0, 15);
	scene.fog.color.setHex( 0xe8dabe );

	//var controls = new THREE.OrbitControls( camera, renderer.domElement );
	//controls.enableDamping = true;
	//controls.dampingFactor = 0.25;
	//controls.enableZoom = true;

	this.getScene = function() {return scene;}
	this.getCamera = function() {return camera;}
	this.getRenderer = function() {return renderer;}
	this.getApp = function() {return self;}


	return self;
}


App.prototype.renderWorldPlane = function() {
	var earth = new WorldPlane(this.getScene());
	var lighingSystem = new WorldLight(this.getScene());
	var animation = new Animation(this.getApp());

	animation.addTickCallback(new Animations.InfiniteHall());
	animation.render();
}

App.prototype.initWorld = function() {
	this.renderWorldPlane();
	this.getCamera().position.set(.2,1,0.15);
	this.getCamera().lookAt(new THREE.Vector3( -.2, 15, 0.5 ));
	this.getCamera().rotation.z = (5*Math.PI/180);
}
