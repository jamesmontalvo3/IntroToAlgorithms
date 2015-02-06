

var arr = [2,34,54,87,24,56,22,44,6,1,575,43];
function mergesort ( A ) {

	if ( A.length == 1 ) {
		return A;
	}

	var mid = Math.ceil( A.length / 2 );

	var first = mergesort( A.slice( 0, mid ) );
	var second = mergesort( A.slice( mid ) );

	var sorted = [];
	var smallest;

	// the merge step
	while ( first.length && second.length ) {
		smallest = first[0] > second[0] ? second.shift() : first.shift();
		sorted.push( smallest );
	}

	return sorted.concat( first ).concat( second );

}
console.log( mergesort( arr ) );