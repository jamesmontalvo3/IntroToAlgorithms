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

$iterations = pow( $graph->countEdges(), 2 ) * pow( $graph->countVertices(), 1 );

$minEdgeCount = $iterations; // massively overkill upper bound.
$minEdgeCut = null;

$graph->removeParallelEdges();

// START: $graph->contract();

profile( "start" );
$randomEdge = $graph->getRandomEdge();
profile( "get randome edge" );


$edgeVertex0 = $graph->edges[ $randomEdge ][0];
$edgeVertex1 = $graph->edges[ $randomEdge ][1];
profile( "set edge vertex variables" );


$graph->mergeVertices( $edgeVertex0, $edgeVertex1 );
profile( "merge vertices" );

$graph->moveEdgesToMergedVertex( $edgeVertex0, $edgeVertex1 );
profile( "move edges to merged vertex" );


// END: $graph->contract();


if ( $graph->countEdges() < $minEdgeCount ) {
	$minEdgeCount = $graph->countEdges();
	$minEdgeCut = $graph->printEdges();
}



