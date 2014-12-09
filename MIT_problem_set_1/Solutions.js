/**
 *  Problem 1-3(b): Give an algorithm to find the vertex with the maximum
 *  x-coordinate in O( lg n ) time, where A[0] is the minimum x-coordinate
 */

// example data
var coords = [
	{ x: 0, y: 0 },
	{ x: 10, y: -20 },
	{ x: 20, y: -25 },
	{ x: 40, y: -22 },
	{ x: 50, y: -10 },
	{ x: 55, y: 5 },
	{ x: 35, y: 20 },
	{ x: 30, y: 25 },
	{ x: 15, y: 15 }
];

var getLargestX = function ( coords, start, end ) {

	if ( end - start === 1 ) {
		if ( coords[ start ].x > coords[ end ].x ) {
			return coords[ start ];
		}
		else {
			return coords[ end ];
		}
	}

	var mid = Math.floor( ( end + start ) / 2 );
	
	var firstMax  = Math.max( coords[ start ].x, coords[ mid ].x );
	var secondMax = Math.max( coords[ mid + 1 ].x, coords[ end ].x );
	
	if ( firstMax > secondMax ) {
		return getLargestX( coords, start, mid );
	}
	else {
		return getLargestX( coords, mid + 1, end );
	}

}

var test = getLargestX( coords, 0, coords.length - 1 );

if ( test.x == 55 ) {
	console.log( "getLargestX: pass" );
}
else {
	console.log( "getLargestX: fail" );
}



/**
 *  Problem 1-3(c): Give an algorithm to find the vertex with the maximum
 *  y-coordinate in O( lg n ) time (where A[0] could be any y-coordinate)
 */


// example data
var testCoords = [
	{ x: 0, y: 0 },
	{ x: 10, y: -20 },
	{ x: 20, y: -25 },
	{ x: 40, y: -22 },
	{ x: 50, y: -10 },
	{ x: 55, y: 5 },
	{ x: 45, y: 20 },
	{ x: 30, y: 25 },
	{ x: 15, y: 15 }
];

var getLargestY = function ( coords, start, end ) {

	// not really a "length" since subArrayLength == 2 means there are three
	// elements
	var subArrayLength = end - start;

	// base cases where there are 2 or 3 elements in the sub-array
	if ( subArrayLength < 3 ) {

		var guess = coords[ start ]; // initially assume start is larger

		if ( coords[ end ].y > guess.y ) {
			guess = coords[ end ];
		}

		if ( subArrayLength == 2 && coords[ start + 1 ].y > guess.y ) {
			guess = coords[ start + 1 ];
		}

		return guess;
		
	}

	// get midpoint
	var mid = Math.floor( ( end + start ) / 2 );
		
	// using Math.max is sort of cheating...but I would have just created my
	// own max function which would have done the same thing.
	var firstMax  = Math.max( coords[ start ].y, coords[ mid ].y );
	var secondMax = Math.max( coords[ mid + 1 ].y, coords[ end ].y );
	
	if ( firstMax > secondMax ) {
		return getLargestY( coords, start, mid );
	}
	else {
		return getLargestY( coords, mid + 1, end );
	}

};


// run the tests
var testCoordsLast = testCoords.length - 1;
for ( var i = 0; i < testCoords.length; i++ ) {

	var test = getLargestY( testCoords, 0, testCoordsLast );
	if ( test.y == 25 ) {
		console.log( "getLargestY shifted " + i + ": pass" );
	}
	else {
		console.log( "getLargestY shifted " + i + ": fail" );
		console.log( test );
	}

	// remove element from beginning of array and put it at the end
	testCoords.push( testCoords.shift() );

}

testCoords.reverse();

for ( var i = 0; i < testCoords.length; i++ ) {

	var test = getLargestY( testCoords, 0, testCoordsLast );
	if ( test.y == 25 ) {
		console.log( "getLargestY reversed/shifted " + i + ": pass" );
	}
	else {
		console.log( "getLargestY reversed/shifted " + i + ": fail" );
		console.log( test );
	}

	// remove element from beginning of array and put it at the end
	testCoords.push( testCoords.shift() );

}


