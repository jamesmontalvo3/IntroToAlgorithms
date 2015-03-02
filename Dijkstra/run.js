/**
 *  Dijkstra's Shortest Path Algorithm
 *  James Montalvo
 *  Feb 2015
 **/


/*

dist[s] = 0 // initially only know distance from s to itself

for all other vertices as v:
	dist[v] = infinity // initially assume distance to other vertices is infinite

visited = [] // initially visited nothing (empty set)
queue = all vertices // queue initially includes all vertices

while queue is not empty:
	u = mindistance( all queue vertices, list of vertex distances
	add u to visited
	for all neighboring vertices v to u
		if dist[v] > dist[u] + w(u,v)
			dist[v] = dist[u] + w(u,v)

return dist // all distances

*/


function load ( filepath, startVertex ) {

	var fs = require('fs');


	fs.readFile( filepath, 'utf8', function (err, data) {
		if (err) {
			throw err; 
		}
		var lines = data.split('\n');
		var edge;
		var vertices = {};

		for( var i = 0; i < lines.length; i++ ) {

			vertexLine = lines[i].split('\t');
			newVertex = vertexLine[0];

			vertices[ newVertex ] = [];

			for( var j = 1; j < vertexLine.length; j++ ) {

				edge = vertexLine[j].split(',');
				if ( parseInt( edge[0] ) ) {
					vertices[ newVertex ].push( { endpoint: edge[0], length: parseInt( edge[1] ) } );
				}
			}

		}

		// console.log( vertices );
		// console.log();
		console.log( dike( vertices, startVertex ) );

	} );

}


function dike ( vertices, s ) {

	var visitedDistances = {},
		queue = [],
		frontierEdges = [];

	visitedDistances[s] = 0;

	// all starting edges starting in the explored region come from s 
	for ( var edgekey in vertices[s] ) {

		frontierEdges.push( {
			origin: s,
			endpoint: vertices[s][edgekey].endpoint,
			length: vertices[s][edgekey].length
		} );

	}

	// remove s from queue
	// vertices.splice( s, 1 );
	// delete vertices[s];
	for ( var vkey in vertices ) {
		if ( vkey != s ) {
			queue.push( vkey );
		}
	}


	var test,
		min,
		edge,
		minEdge,
		newVertexKey,
		toVertex;

	// while queue is not empty:
	// 	u = mindistance( all queue vertices, list of vertex distances
	// 	add u to visited
	// 	for all neighboring vertices v to u
	// 		if dist[v] > dist[u] + w(u,v)
	// 			dist[v] = dist[u] + w(u,v)
	while ( queue.length > 0 ) {
	
		// console.log( "queue" );
		// console.log( queue );
		// console.log( visitedDistances );
		// console.log( frontierEdges );
		// console.log( min );
		

		min = visitedDistances[ frontierEdges[0].origin ] + frontierEdges[0].length;
		minEdge = frontierEdges[0];
	
		// console.log( min );
		for( var edgekey in frontierEdges ) {

			test = visitedDistances[ frontierEdges[edgekey].origin ] + frontierEdges[edgekey].length;
			if ( test <= min ) {
				min = test;
				minEdge = frontierEdges[edgekey];
			}

		}

		// console.log( min );
		// console.log( minEdge );
		// add shortest new distance
		newVertexKey = minEdge.endpoint;

		// console.log();
		// console.log( "new frontier vertex: " + newVertexKey + ". Frontier edges:" );
		// console.log( frontierEdges );

		newVertex = vertices[ newVertexKey ];
		visitedDistances[ newVertexKey ] = min;
		queue.splice( queue.indexOf( newVertexKey ), 1 ); // remove newVertexKey from queue

		var tempfrontier = frontierEdges;
		frontierEdges = [];

		// var removeKeys = [];
		// remove edges ending at the newly visited vertex
		// for ( var edgekey in frontierEdges ) {
		// 	toVertex = frontierEdges[edgekey].endpoint;

		// 	// if edge goes to newly added vertex, remove it from frontierEdges
		//     if ( toVertex == newVertexKey ) {
		//     	console.log( "removing edge with key " + edgekey + " going to " + toVertex );
		//         removeKeys.push( edgekey );
		//     }

		// }
		// for ( var k in removeKeys ) {
		// 	frontierEdges.splice( removeKeys[k], 1 );
		// }

		for ( var i = 0; i < tempfrontier.length; i++ ) {

			toVertex = tempfrontier[i].endpoint;

			// if edge goes to newly added vertex, remove it from frontierEdges
		    if ( toVertex != newVertexKey ) {
		        frontierEdges.push( tempfrontier[i] );
		    }
		    else {
		    	// console.log( "removing edge with key " + edgekey + " going to " + toVertex );
		    }

		}		


		// console.log( "new frontier edges after removals: " );
		// console.log( frontierEdges );

		// add edges to frontier from new vertex
		for( var edgekey in newVertex ) {

			edge = newVertex[edgekey];

		    // if edge comes from newly added vertex, and it goes to an unvisted edge,
		    // add it to frontierEdges
		    // if ( ! typeof visitedDistances[ edge.endpoint ] == 'undefined' ) {
		    
			var exists = typeof visitedDistances[ edge.endpoint ] !== 'undefined';
			
			// only add back into frontierEdges if if doesn't already exist in visitedDistances
			if ( ! exists ) {
		    	// console.log( "pushing edge with endpoint " + edge.endpoint );
		    	frontierEdges.push( {
		    		origin: newVertexKey,
		    		endpoint: edge.endpoint,
		    		length: edge.length
		    	} );
		    }

		}

		// console.log( "new frontier edges after additions: " );
		// console.log( frontierEdges );
		// console.log( "visited:" );
		// console.log( visitedDistances );


	}

	// var paths = ['10','30','50','80','90','110','130','160','180','190'];
	var paths = ['7','37','59','82','99','115','133','165','188','197'];
	var output = '';
	for ( var i = 0; i < paths.length; i++ ) {
		output += visitedDistances[ paths[i] ] + ',';
	}
	
	//return visitedDistances;
	return output;
}


var dataFile = process.argv[2];
var vertexKey = process.argv[3];

load( __dirname + '/' + dataFile, vertexKey );