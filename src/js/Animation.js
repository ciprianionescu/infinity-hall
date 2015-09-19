/**
 * Created by ionescusilviuciprian on 11/09/15.
 */
function Animation (app) {
    console.log(app);

    if(!app) throw "Animation needs an app to bind to.";

    var tickCallbacks = new Array();
    var runTickCallbacks = function(timestamp) {

        for(i in tickCallbacks) {
            tickCallbacks[i].tick(timestamp, app);
        }
    }

    var render = function(timestamp) {

        runTickCallbacks(timestamp);
        requestAnimationFrame( render );

        app.getRenderer().render( app.getScene(), app.getCamera() );
    }

    this.addTickCallback = function(AnimationClass) {
        tickCallbacks.push(AnimationClass);
        if(AnimationClass.init) AnimationClass.init(app);
    }

    this.render = function() {
        render();
    }

    return this;
}