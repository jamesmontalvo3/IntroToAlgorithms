var fs = require('fs');
var loc = '/Users/James/code/IntroToAlgorithms/DivideAndConquer';

fs.readFile(loc + '/integerArray.txt', 'utf8', function (err, data) {
	if (err) throw err;
	var inversionArray = data.split('\n');
	var newArr = [];
	for( var i = 0; i < inversionArray.length; i++ ) {
		newArr[i] = parseInt( inversionArray[i] );
	}

	// var stringOutput = inversionArray.join( '\n' );
	// var intOutput = newArr.join( '\n' );


	// fs.writeFile(loc + '/fromstring.txt', stringOutput, function(err) {
	//     if(err) {
	//         console.log(err);
	//     } else {
	//         console.log("The file was saved!");
	//     }
	// }); 

	// fs.writeFile(loc + '/fromint.txt', intOutput, function(err) {
	//     if(err) {
	//         console.log(err);
	//     } else {
	//         console.log("The file was saved!");
	//     }
	// }); 



	// console.log( "array length: " + inversionArray.length );
	// console.log( inversionArray[0] );
	// console.log( inversionArray[1] );
	// console.log( inversionArray[ inversionArray.length - 2 ] );
	// console.log( inversionArray[ inversionArray.length - 1 ] );
	console.log( countInversions( newArr ).inversions );
});


// attempted value: 2397919672

// 3 inversions
// var arr2 = [1,3,5,2,4,6];

// 2372 inversions
// var arr3 = [4, 80, 70, 23, 9, 60, 68, 27, 66, 78, 12, 40, 52, 53, 44, 8, 49, 28, 18, 46, 21, 39, 51, 7, 87, 99, 69, 62, 84, 6, 79, 67, 14, 98, 83, 0, 96, 5, 82, 10, 26, 48, 3, 2, 15, 92, 11, 55, 63, 97, 43, 45, 81, 42, 95, 20, 25, 74, 24, 72, 91, 35, 86, 19, 75, 58, 71, 47, 76, 59, 64, 93, 17, 50, 56, 94, 90, 89, 32, 37, 34, 65, 1, 73, 41, 36, 57, 77, 30, 22, 13, 29, 38, 16, 88, 61, 31, 85, 33, 54];

// 590 inversions
// var arr4 = [37, 7, 2, 14, 35, 47, 10, 24, 44, 17, 34, 11, 16, 48, 1, 39, 6, 33, 43, 26, 40, 4, 28, 5, 38, 41, 42, 12, 13, 21, 29, 18, 3, 19, 0, 32, 46, 27, 31, 25, 15, 36, 20, 8, 9, 49, 22, 23, 30, 45];

function countInversions ( A ) {

	if ( A.length == 1 ) {
		var ret = { inversions: 0, arr: A };
		return ret;
	}
	
	var mid = Math.ceil( A.length / 2 );

	var first = countInversions( A.slice( 0, mid ) );
	var second = countInversions( A.slice( mid ) );

	var sorted = [],
		inversions = first.inversions + second.inversions;

	// the merge step
	while ( first.arr.length && second.arr.length ) {

		if ( first.arr[0] <= second.arr[0] ) {

			// first element from FIRST array is smallest or equal
			// push it to sorted -- no inversions
			sorted.push( first.arr.shift() );
		}
		else {

			// first element of SECOND array is smallest
			sorted.push( second.arr.shift() );
			inversions += first.arr.length;
		}

	}

	// push remaining elements of second array to the sorted array
	sorted = sorted.concat( first.arr).concat( second.arr );

	return { inversions: inversions, arr: sorted };

}

// var a = [];
// for ( var i = 1; i < 99999; i++ ) {
// 	a.push( i );
// }
// a.push( 100000 );
// a.push( 99999 );

// console.log( countInversions( a ).inversions );

