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

var Snapshot = $.Class.create({
	// constructor
	initialize : function(element) {

		this._element = element;
		this.setSize(100, 100);
		this.setPosition(0, 0);
		this._animating = false;
		
	},
	/* Sets the size of Div */
	setSize : function(w, h) {
		this._width = w;
		this._height = h;
		this._element.css("width", w + "px");
		this._element.css("height", h + "px");
	},
	/* Sets the position of Div */
	setPosition : function(x, y) {
		var px = x - (this._width / 2);
		var py = y - (this._height / 2);
		this._x = x;
		this._y = y;
		this._element.css("left", px + "px");
		this._element.css("top", py + "px");
	},
	/* Scales the Size of Div due to coefficient of proportion */
	scale : function(sx, sy) {
		this.setSize(this._width * sx, this._height * sy);
	},
	/* Morphs aspect of Div due to coefficient */
	morphByRatio : function(ratio) {
		this.scale(ratio, ratio);
		this._element.css('opacity', this.getOpacityByRatio(ratio));
		this._element.css('font-size', this.getFontSizeByHeight(this._height) + "px");
	},
	/* Translates Ratio coefficient into opacity value */
	getOpacityByRatio : function(ratio){
		var opacity = 0;
		if(ratio ==1) {
			opacity = 1;
		} else {
			opacity = ratio / 2;
		}
		return opacity;
	},
	/* Translates Font Size due to Height value */
	getFontSizeByHeight: function(h){
		return h/5;
	},
	/* Animates current Div style to another one */
	animate : function(x, y, w, h, ratio, time, easing) {
	
		this._animating = true;
		var handle = this;
		var opacity = this.getOpacityByRatio(ratio);
		x = x-w/2;
		y = y-h/2;
		
		this._element.animate({
			width : w,
			height : h,
			left : x,
			top : y,
			opacity : opacity,
			fontSize : handle.getFontSizeByHeight(h)

		}, time, easing, function() {
			handle._x = x + w/2;
			handle._y = y +h/2;
			handle._width = w;
			handle._height = h;
			handle._animating = false;
		});
	}
}, {
	// properties
	getset : [['Element', '_element'], ['X', '_x'], ['Y', '_y'], ['Width', '_width'], ['Height', '_height']]
});
