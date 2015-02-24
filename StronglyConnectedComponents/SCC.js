function load () {

	var fs = require('fs');
	fs.readFile( __dirname + '/SCC.txt', 'utf8', function (err, data) {
		if (err) {
			throw err; 
		}
		var lines = data.split('\n');
		var edge;
		GLOBAL.vertices = {};

		for( var i = 0; i<lines.length; i++ ) {

			edge = lines[i].split(' ');

			if ( vertices[ edge[0] ] ) {
				vertices[ edge[0] ][ "outbound_links" ].push( edge[1] );
			}
			else {
				vertices[ edge[0] ] = {
					//exploredFirst: false,
					outbound_links: [ edge[1] ],
					inbound_links: []
				};
			}

			if ( vertices[ edge[1] ] ) {
				vertices[ edge[1] ][ "inbound_links" ].push( edge[0] );
			}
			else {
				vertices[ edge[1] ] = {
					//explored: false,
					outbound_links: [],
					inbound_links: [ edge[0] ]
				};
			}

		}

		// GLOBAL.vertexArray = [];
		// for( var v in vertices ) {
		// 	vertexArray.push( v );
		// }

		// start( vertices );
		// console.log( vertices );
		dfsLoop();

	});

}

function start () {



}

var t = 0;
var s;


function dfsLoop () {

	GLOBAL.finishingTimes = [];
	GLOBAL.leaders = {};

	for( var v in vertices ) {
		if ( ! vertices[v].exploredFirst ) {
			// s = n;
			dfsBackward( v );
		}
	}


	for( var i=finishingTimes.length-1; i >= 0; i-- ) {

		if ( ! vertices[ finishingTimes[i] ].exploredSecond ) {
			s = finishingTimes[i];
			leaders[s] = 0;
			dfsForward( finishingTimes[i] );
		}

	}

	var leaderArray = [];
	for ( var l in leaders ) {
		leaderArray.push( leaders[l] );
	}

	leaderArray.sort( function( a, b ) {
		return b - a;
	});

	console.log( leaderArray );

}

function dfsBackward ( n ) {
	var checkVertex;

	vertices[n].exploredFirst = true;
	// vertices[n].leader = s;
	
	for( var i = 0; i < vertices[n].inbound_links.length; i++ ) {

		checkVertext = vertices[n].inbound_links[i];

		if ( ! vertices[ checkVertext ].exploredFirst ) {
			dfsBackward( checkVertext );
		}
	}

	finishingTimes.push( n );
	// t++;
	// vertices[n].finishing_time = t;
}


function dfsForward ( n ) {

	var checkVertex;

	vertices[n].exploredSecond = true;
	vertices[n].leader = s;
	leaders[s]++;
	for( var i = 0; i < vertices[n].outbound_links.length; i++ ) {

		checkVertext = vertices[n].outbound_links[i];

		if ( ! vertices[checkVertext].exploredSecond ) {
			dfsForward( checkVertext );
		}
	}
	// t++;
	// vertices[n].finishing_time = t;
}


load();