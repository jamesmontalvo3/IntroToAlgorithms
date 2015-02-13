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


profile( "start" );
$rawData = file_get_contents( __DIR__ . '/Assignment3Data.txt' );
profile( "file loaded" );

$graph = Mincut::formatAdjacencyList( $rawData );
profile( "formatted adjacency list first time" );

$iterations = pow( $graph->countEdges(), 2 ) * pow( $graph->countVertices(), 1 );
profile( "determined iterations" );

$minEdgeCount = $iterations; // massively overkill upper bound.
$minEdgeCut = null;

profile( "misc setup" );
$graph->removeParallelEdges();
profile( "removed parallel edges" );

$graph->contract();
profile( "performed contraction" );

if ( $graph->countEdges() < $minEdgeCount ) {
	$minEdgeCount = $graph->countEdges();
	$minEdgeCut = $graph->printEdges();
}

profile( "determine if new min cut" );


