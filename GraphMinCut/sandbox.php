<?php

require_once __DIR__ . '/Mincut.class.php';

$graph = Mincut::formatAdjacencyList( file_get_contents( __DIR__ . '/TestData.txt' ) );

// print_r( $graph->vertices );

// $graph->mergeVertices( 1, 3 );

// print_r( $graph->vertices );

print_r( $graph );


// foreach( array(1,2,3,4,5,6,7,8) as $phase ) {

// 	echo "\n\nPre-$phase\n\n";

// 	$graph->contract();
// 	// print_r( $graph->vertices );

// }

$graph->contract();

echo "\nRemaining Edges: " . count( $graph->edges ) . "\n";
print_r( $graph->vertices );