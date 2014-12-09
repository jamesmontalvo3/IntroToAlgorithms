/**
 *  Algorithms.js
 *
 *
 */

/*
	var coords = [
		{ x: x0, y: y0 },
		{ x: x1, y: y1 },
		...
	];
*/

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

var count = 0;

var getLargestX = function ( coords, start, end ) {

	if ( count > 20 ) {
		console.log( "too much recursion" );
		return { x: null, y: null }
	} else {
		count++;
	}

	if ( end - start === 1 ) {
		console.log( "base case" );
		if ( coords[ start ].x > coords[ end ].x ) {
			return coords[ start ];
		}
		else {
			return coords[ end ];
		}
		
	}



	var mid = Math.floor( ( end + start ) / 2 );
	console.log( "mid = " + mid );
	
	var firstMax  = Math.max( coords[ start ].x, coords[ mid ].x );
	var secondMax = Math.max( coords[ mid + 1 ].x, coords[ end ].x );
	
	if ( firstMax > secondMax ) {
		return getLargestX( coords, start, mid );
	}
	else {
		return getLargestX( coords, mid + 1, end );
	}

}

getLargestX( coords, 0, coords.length - 1 );




/** GET largest Y **/



var testCoords1 = [
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

var testCoords2 = [
	{ x: 40, y: -22 },
	{ x: 50, y: -10 },
	{ x: 55, y: 5 },
	{ x: 45, y: 20 },
	{ x: 30, y: 25 },
	{ x: 15, y: 15 },
	{ x: 0, y: 0 },
	{ x: 10, y: -20 },
	{ x: 20, y: -25 }
];





var count = 0;

var getLargestX = function ( coords, start, end ) {

	if ( count > 20 ) {
		console.log( "too much recursion" );
		return { x: null, y: null }
	} else {
		count++;
	}
	
	var subArrayLength = end - start;
	if ( subArrayLength < 3 ) {
		console.log( "base case #1" );

		var guess = coords[ start ];

		if ( coords[ end ].x > guess.x ) {
			guess = coords[ end ];
		}

		if ( subArrayLength == 2 && coords[ start + 1 ].x > guess.x ) {
			guess = coords[ start + 1 ].x;
		}

		return guess;
		
	}


	// get mid, quart1, quart3
	var mid = Math.floor( ( end + start ) / 2 );
	var quart1 = getQuarterPoint( start, end );
	var quart3 = getThreeQuarterPoint( start, end );


	console.log(
		"start: " + start
		+ "\nquart1: " + quart1
		+ "\nmid: " + mid
		+ "\nquart3: " + quart3
		+ "\nend: " + end
	);
	
	var firstMax  = Math.max( coords[ start ].x, coords[ quart1 ].x, coords[ mid ].x );
	var secondMax = Math.max( coords[ mid + 1 ].x, coords[ quart3 ].x, coords[ end ].x );
	
	if ( firstMax > secondMax ) {
		return getLargestX( coords, start, mid );
	}
	else {
		return getLargestX( coords, mid + 1, end );
	}

};

var getQuarterPoint = function ( s, e ) {
	return s + 1;
	//return Math.floor( ( 3 * s + e ) / 4 );
};

var getThreeQuarterPoint = function ( s, e ) {
	return e - 1;
	// return Math.floor( ( s + 3 * e ) / 4 );
};

getLargestX( testCoords2, 0, testCoords2.length - 1 );


