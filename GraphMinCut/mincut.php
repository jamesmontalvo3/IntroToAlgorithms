<?php

$data = file_get_contents( __DIR__ . '/data.txt' );
$dataRows = explode( "\n", $data );

$vertices = array();
$edges = array();

foreach( $dataRows as $row ) {

	$rowArray = explode( "\t", $row );

	$connectedVertices = array();

	$vertices[ $rowArray[0] ] = array();

	for( $i = 1; $i < count( $rowArray ); $i++ ) {

		// make vertices an array which holds a list of linked vertices?
		// $vertices[ $rowArray[0] ][] = $rowArray[$i];

		$edges[] = array( $rowArray[0], $rowArray[$i] );

	}

}

$trialV = $vertices;
$trialE = $edges;


while( count( $trialV ) > 2 ) {

	$rand = rand( 0, count( $trialE ) - 1 );

	$v1 = $trialE[ $rand ][0];
	$v2 = $trialE[ $rand ][1];

	$trialV[ $v1 ][] = $v2; // add v2 as a sub-vertex
	$trialV[ $v1 ] = array_merge( $trialV[ $v1 ], $trialV[ $v2 ] ); // add all of v2's sub-vertices as v1 sub-vertices
	unset( $trialV[ $v2 ] ); // remove v2 from vertices array

	// remove edge
	unset( $trialE[ $rand ] );

	for( $j = 0; $j < count( $trialE ); $++ ) {

		$forwardCheck = $trialE[ $j ][0] == $v1 && $trialE[ $j ][1] = $v2;
		$backwardCheck = $trialE[ $j ][0] == $v2 && $trialE[ $j ][1] = $v1;

		if( $forwardCheck || $backwardCheck ) {

			// remove any edges connecting the merged nodes
			unset( $trialE[ $j ];
		}

	}

}

echo 
print_r( $