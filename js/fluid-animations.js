var path1 = new Wave();
path1.color = '#cf8d47';
path1.width = 10;
path1.init();

function Wave(){
	
	this.color = '#cf8d47';
	this.amount = 10;
	this.width = 10;
	this.offsetY = (view.size.width - 100);
	this.waveSpeed = 3;
	this.selected = false;
	
	this._path = new Path({ fillColor: this.color });
	
	this.init = function(){
		
		this._path.fillColor = this.color;
		this._path.selected = this.selected;
		
		this._path.segments = [];
		this._path.add(new Point( view.size.width, 0));
		this._path.add(new Point( view.size.width, 0));
		for(var i = 0; i <= this.amount; i++){
			this._path.add(new Point(1, i / this.amount) * view.size);
		}
		this._path.add(new Point(view.size.width, view.size.height));
		
	}
	
	this.update = function(_event){
		
		var w_sinus = (Math.sin(_event.count/500) + 1) * view.size.width;
		
		// Loop through every secound point of the path to make waves:
		for (var i = 1; i <= this.amount+2; i = i+2){
			var segment = this._path.segments[i];
			// Make a sinus wave
			var sinus = Math.sin(_event.time * this.waveSpeed + i);
			// Change the y position of the point:
           // segment.point.x = sinus * this.width + (this.width * 2);
            segment.point.x = sinus * this.width + (this.width * 2);
		}
		
		// Same as over (but on the "left over" segments) to make it look more random
		for (var i = 2; i <= this.amount+2; i = i+2){
			var segment = this._path.segments[i];
			var sinus = Math.sin(_event.time * (this.waveSpeed * .8) + i);
			segment.point.x = sinus * this.width + (this.width * 2);
		}
		
		// Water "tide" (makes alle the waves go up and down):
		for(var i = 1; i <= this.amount+2; i++){
           // this._path.segments[i].point.x += w_sinus/30 + this.offsetY;
            var newValue = this._path.segments[i].point.x + this.offsetY + w_sinus/30
            this._path.segments[i].point.x = newValue >= view.size.width ? view.size.width - (newValue - view.size.width) : newValue; 
		}
		
		// Smooth the waves:
		this._path.smooth({ from: 2, to: this.amount+2 });
		
	}
}

function onFrame(event) {
	path1.update(event);
}

function onResize(event) {
	path1.init();
}

function onMouseDown(event) {
   /* while(path1.offsetY > 0){
        setTimeout(function(){
            path1.offsetY = 0;
        }, 20);
    }*/
	/*for (var i = (view.size.width - 120); i >= -100; i = i-2){
		path1.offsetY = i;
    }*/
    path1.offsetY = 0
	//path1._path.tween({'position.x': 0}, {easing: 'easeInOutCubic',    duration: 2000});
	path1.waveSpeed = 5;
}

function onMenuClick(event){
    path1.offsetY = 0
	//path1._path.tween({'position.x': 0}, {easing: 'easeInOutCubic',    duration: 2000});
    path1.waveSpeed = 5;
    alert("clicked");
}