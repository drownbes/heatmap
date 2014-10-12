/*	jshint evil: true */
/* global lib */

(function() {
	'use strict';

	console.log(lib);
	function SVG() {
		/* const */
		console.log(lib);
		var svgNS = "http://www.w3.org/2000/svg";
		var xmlNS = "http://www.w3.org/2000/xmlns/";
		var xlink = "http://www.w3.org/1999/xlink";


		var el = lib.byid('svg_container');

		function Create(tag_name, attr) {
			var _attr = lib.def(attr,{}),
				el = document.createElementNS(svgNS, tag_name);
			if(tag_name === 'svg') {
				el.setAttributeNS(xmlNS,'xmlns', svgNS);
				el.setAttributeNS(xmlNS,'xmlns:xlink', xlink);
			}
			for(var prop in _attr) {
				if(hasOwnProperty.call(_attr,prop)) {
					el.setAttributeNS(null, prop, _attr[prop]);
				}
			}
			return el;
		}

		var root_svg = Create('svg'),
			defs = Create('defs'),
			fig = Create('g',{
				x:0,
				y:0,
			   	'filter':'url(#blur)'
			});
		el.appendChild(root_svg);
		root_svg.appendChild(defs);
		root_svg.appendChild(fig);

		//filter
		var filter = Create('filter', {id:'blur'});
		var gauss = Create('feGaussianBlur', {
			'in':'SourceGraphic',
			'stdDeviation':'15'
		});
		/*var hue_rot = Create('feColorMatrix', {
			type:'hueRotate',
			values:'56'
		});*/
		filter.appendChild(gauss);
		//filter.appendChild(hue_rot);
		defs.appendChild(filter);


		var circle;
		for(var i = 0; i < 50; i++) {
			circle = Create('circle',{
				cx: lib.get_random_int(0,500),
				cy: lib.get_random_int(0,500),
				r: 40,
				fill: 'rgba(255,0,0,0.4)'
			});
			fig.appendChild(circle);
		}
	}

	SVG();


})();
