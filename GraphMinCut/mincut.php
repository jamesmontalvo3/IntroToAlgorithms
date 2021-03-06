<?php

require_once __DIR__ . '/Mincut.class.php';

$rawData = file_get_contents( __DIR__ . '/Assignment3Data.txt' );
$graph = Mincut::formatAdjacencyList( $rawData );

$graph->removeParallelEdges();
$graph->buildEdgesByVertex();

$startVertices = $graph->vertices;
$startEdges = $graph->edges;
$startEdgesByVertex = $graph->edgesByVertex;

$iterations = pow( count($startVertices), 2 ) * log( count($startVertices) );

$minEdgeCount = $iterations; // massively overkill upper bound.
$minEdgeCut = null;

echo "Starting $iterations iterations\n";
echo "0% complete\r";

$start = microtime( true );

for( $i = 0; $i < $iterations; $i++ ) {

	$graph = new Mincut( $startVertices, $startEdges );
	$graph->setEdgesByVertex( $startEdgesByVertex );
	$graph->contract();

	if ( $graph->countEdges() < $minEdgeCount ) {
		$minEdgeCount = $graph->countEdges();
		$minEdgeCut = $graph->printEdges();
	}

	$duration = ( microtime( true ) - $start );
	$fractionComplete = ($i + 1) / $iterations;
	$minutesRemain = round( ( $duration / $fractionComplete ) / ( 60 ), 1 );
	$percentComplete = round( $fractionComplete * 100, 6 );

	echo "                                                                            \r";
	echo "i=$i, $percentComplete%, $minutesRemain min remain, min cut = $minEdgeCount)\r";

}

echo "$percentComplete% complete\n\n";


echo "Min edges: $minEdgeCount\nEdges:\n" . $minEdgeCut;