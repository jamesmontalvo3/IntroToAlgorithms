<?php

require_once __DIR__ . '/Mincut.class.php';

$rawData = file_get_contents( __DIR__ . '/ClassTestData1.txt' );
$graph = Mincut::formatAdjacencyList( $rawData );



$iterations = pow( $graph->countEdges(), 2 ) * pow( $graph->countVertices(), 1 );

$minEdgeCount = $iterations; // massively overkill upper bound.
$minEdgeCut = null;

for( $i = 0; $i < $iterations; $i++ ) {

	$graph = Mincut::formatAdjacencyList( $rawData );
	$graph->removeParallelEdges();
	$graph->contract();

	if ( $graph->countEdges() < $minEdgeCount ) {
		$minEdgeCount = $graph->countEdges();
		$minEdgeCut = $graph->printEdges();
	}

}

echo "Min edges: $minEdgeCount\nEdges:\n" . $minEdgeCut;