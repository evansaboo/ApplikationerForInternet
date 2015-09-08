/* Copyright 2011 B4rc0ll0

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
 
var CoverFlow = $.Class.create({
	// constructor
	initialize : function(element) {

		/* Initialization */
		var handle = this;
		this._element = element;
		this._width = element.width();
		this._height = element.height();
	
		/* Parameters */
		this._snapshotClass = ".snapshot";
		this._snapshotDistance = this._width / 7;
		this._smoothness = 1;
		this._timeAnimation = 300;

		/* Finds & Binds snapshots */
		var list = []
		this._element.children(this._snapshotClass).each(function(index, value) {
			var snap = new Snapshot($(this));
			snap.getElement().attr('cindex', index);
			list[index] = snap;
		});
		this._snapshotList = list;
		this._selectedSnapshot = null;
	
		/* Setup */
		this.dispose();
		var middle = Math.floor(this._snapshotList.length / 2);
		this.centerSnapshot(middle);
		this.bindsMouseEvents();
	},
	/* Binds Mouse Dragging */
	bindsMouseEvents : function() {
	
		var handle = this;
		this._dragging = false;
		this._lastPageX = 0;
		this._element.mousedown(function(event) {
			handle._dragging = true;
		});
		this._element.mouseup(function(event) {
			handle._dragging = false;
			handle.stopDragging();
		});
		this._element.mouseleave(function(event) {
			if(handle._dragging) {
				handle._dragging = false;
				handle.stopDragging();
			}
		});
		this._element.mousemove(function(event) {
			if(handle._dragging) {
				var dx = event.pageX - handle._lastPageX;
				handle.rotate(dx);
			}
			handle._lastPageX = event.pageX;
		});
		console.log("binded");
	},
	/* Gets middle Y point of CoverFlow */
	middleY : function() {
		return this._height / 2;
	},
	/* Gets middle X point of CoverFlow */
	middleX : function() {
		return this._width / 2;
	},
	/* Gets a number between [0,1] by distance from middleX */
	getRatio : function(x) {
		var distance = Math.abs(x - this.middleX());
		var smooth = this._smoothness;
		var bound = (this._width / 2) * smooth;
		var ratio = 1 - (distance / bound);
		
		return ratio;
	},
	/* Handles stop dragging event, centering nearest snapshot on screen */
	stopDragging : function(vx) {
		var index = this.nearestSnapshot();
		this.centerSnapshot(index);
	},
	/* Finds index of nearest snapshot to center */
	nearestSnapshot : function() {
		var handle = this;
		var nearest = null;
		var minDistance = this._width;
		var distance = 0;
		$.each(this._snapshotList, function(index, value) {
			distance = Math.abs(value.getX() - handle.middleX());
			if(distance < minDistance) {
				minDistance = distance;
				nearest = index;
			}
		});
		return nearest;
	},
	/* Puts Snapshot in X location modifying its style*/
	placeSnapshot : function(snapshot, x) {
		var ratio = this.getRatio(x);
		var y = this.middleY();
		var h = this._height;
		var w = h;
		snapshot.setSize(w, h);
		snapshot.morphByRatio(ratio);
		snapshot.setPosition(x, y);
	},
	/* Moves all snapshots */
	rotate : function(dx) {
		var handle = this;
		$.each(this._snapshotList, function(index, value) {
			var x = value.getX();
			handle.placeSnapshot(value, (x + dx));
		});
	},
	/* Center selected Snapshot with animation */
	centerSnapshot : function(index) {
		var handle = this;
		this._selectedSnapshot = index;
		var snapshot = this._snapshotList[index];
		snapshot.getElement().css('z-index', 100);
		var x = snapshot.getX();
		var distance = handle.middleX() - x;
		var y = this.middleY();
		
		$.each(this._snapshotList, function(i, value) {
			
			var nx = value.getX() + distance;
			var ratio = handle.getRatio(nx);
			var w = handle._height * ratio;
			var h = handle._height * ratio;
		
			if(index != i) {
				value.getElement().css('z-index', 1);
			}
			value.animate(nx, y, w, h, ratio, handle._timeAnimation, 'easeOutBack');
			
		});
	},
	/* Disposes snapshot in container */
	dispose : function() {
		var px = 0;
		var handle = this;
		$.each(this._snapshotList, function(index, value) {
			handle.placeSnapshot(value, px);
			px += handle._snapshotDistance;
			// value.getElement().mousedown(function(){
			// handle.centerSnapshot(value.getElement().attr('cindex'));
			// });
		});
	}
}, {
	// properties
	getset : [['Width', '_width'], ['Height', '_height'], ['Element', '_element']]
});
