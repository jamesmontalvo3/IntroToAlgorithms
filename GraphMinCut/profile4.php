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


$graph->buildEdgesByVertex();
profile( "build edges by vertex" );

// START: $graph->contract();

$randomEdge = $graph->getRandomEdge();
profile( "get random edge" );


$edgeVertex0 = $graph->edges[ $randomEdge ][0];
$edgeVertex1 = $graph->edges[ $randomEdge ][1];
profile( "set edge vertex variables" );

$graph->fastMoveEdgesToMergedVertex( $edgeVertex0, $edgeVertex1 );
profile( "fast move edges to merged vertex" );


$graph->mergeVertices( $edgeVertex0, $edgeVertex1 );
profile( "merge vertices" );


// $graph->moveEdgesToMergedVertex( $edgeVertex0, $edgeVertex1 );
// profile( "move edges to merged vertex" );


// END: $graph->contract();

