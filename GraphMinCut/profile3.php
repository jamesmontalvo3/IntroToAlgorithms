<?php

function profile ( $msg ) {

	if ( ! isset( $GLOBALS['lastProfile'] ) ) {
		$GLOBALS['lastProfile'] = microtime( true );
		echo "$msg (profile initiated)\n";
	}
	else {
		$duration = microtime( true ) - $GLOBALS['lastProfile'];
		$GLOBALS['lastProfile'] = microtime( true );
		echo "$msg (duration = $duration seconds)\n";
	}

}




require_once __DIR__ . '/Mincut.class.php';

$rawData = file_get_contents( __DIR__ . '/Assignment3Data.txt' );
$graph = Mincut::formatAdjacencyList( $rawData );

$graph->removeParallelEdges();

$startVertices = $graph->vertices;
$startEdges = $graph->edges;

$iterations = pow( count($startVertices), 2 ) * pow( count($startEdges), 1 );

$minEdgeCount = $iterations; // massively overkill upper bound.
$minEdgeCut = null;

profile( "Starting $iterations iterations\n" );


for( $i = 0; $i < $iterations; $i++ ) {

	$graph = new Mincut( $startVertices, $startEdges );
	$graph->contract();

	if ( $graph->countEdges() < $minEdgeCount ) {
		$minEdgeCount = $graph->countEdges();
		$minEdgeCut = $graph->printEdges();
	}

	profile( "iteration $i" );

}

echo "$percentComplete% complete\n\n";


echo "Min edges: $minEdgeCount\nEdges:\n" . $minEdgeCut;