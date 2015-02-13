<?php


class Mincut {

	public $edges;
	public $vertices;

	public function __construct( $vertices, $edges ) {

		$this->vertices = $vertices;
		$this->edges = $edges;

	}

	static public function formatAdjacencyList ( $adjacencyList ) {

		$adjacencyStrings = explode( "\n", $adjacencyList );

		$vertices = array();
		$edges = array();

		foreach( $adjacencyStrings as $adjacencyString ) {

			$adjacencyArray = explode( "\t", trim( $adjacencyString ) );

			// make each vertex an index of of the $vertices array, with an empty
			// array as key. This empty array will be filled with merged vertices
			// during the contraction phase.
			$vertices[ $adjacencyArray[0] ] = array();

			// loop through all vertices (besides first) in this $adjacencyArray 
			for( $i = 1; $i < count( $adjacencyArray ); $i++ ) {

				// make vertices an array which holds a list of linked vertices?
				// $vertices[ $adjacencyArray[0] ][] = $adjacencyArray[$i];

				// create an edge between the first vertex and the i-th
				$edges[] = array(
					$adjacencyArray[0], // current zeroth vertex
					$adjacencyArray[$i], // current first vertex
					$adjacencyArray[0], // original zeroth vertex
					$adjacencyArray[$i], // original first vertex					
				);

			}

		}

		return new self( $vertices, $edges );

	}

	public function removeParallelEdges () {

		$edgesByFirstVertex = array();
		$edgesToRemove = array();

		foreach ( $this->edges as $key => $edgeVertices ) {
			$v0 = $edgeVertices[0];
			$v1 = $edgeVertices[1];
			if ( $v0 < $v1 ) {
				$smaller = $v0;
				$larger = $v1;
			}
			else {
				$smaller = $v1;
				$larger = $v0;
			}

			if ( ! isset( $edgesByFirstVertex[ $smaller ] ) ) {
				$edgesByFirstVertex[ $smaller ] = array( $larger );
			}
			else if ( ! in_array( $larger, $edgesByFirstVertex[ $smaller ] ) ) {
				$edgesByFirstVertex[ $smaller ][] = $larger;
			}
			else {

				// parallel edge exists, plan to remove this key
				$edgesToRemove[] = $key;
			}

		}

		foreach( $edgesToRemove as $edgeKey ) {
			unset( $this->edges[ $edgeKey ] );
		}

	}

	public function contract () {

		while( count( $this->vertices ) > 2 ) {

			$collapseEdge = $this->getRandomEdge();

			// echo "\nrandom collapse edge: $collapseEdge\n";
			// print_r( $this );
			// echo "Edges (" . count( $this->edges ) . "):\n" . $this->printEdges();
			$this->contractEdge( $collapseEdge );

		}
	}

	public function getRandomEdge() {
		// $rand = rand( 0, count( $edges ) - 1 );

		// return key of a random edge
		return array_rand( $this->edges, 1 );
	}

	public function contractEdge ( $edge ) {

		$edgeVertex0 = $this->edges[ $edge ][0];
		$edgeVertex1 = $this->edges[ $edge ][1];

		$this->mergeVertices( $edgeVertex0, $edgeVertex1 );
		$this->moveEdgesToMergedVertex( $edgeVertex0, $edgeVertex1 );

	}

	public function mergeVertices ( $v0, $v1 ) {
		
		// echo "\nvertex0: $v0, vertex1: $v1";

		// add v1 as a sub-vertex to v0
		$this->vertices[ $v0 ][] = $v1;

		// add all of v1's sub-vertices as v0 sub-vertices
		$this->vertices[ $v0 ] = array_merge(
			$this->vertices[ $v0 ],
			$this->vertices[ $v1 ]
		);
		
		// remove v1 from vertices array
		unset( $this->vertices[ $v1 ] );

	}

	public function moveEdgesToMergedVertex( $v0, $v1 ) {

		$edgesToRemove = array();

		foreach( $this->edges as $key => $edgeVertices ) {

			// if an edge has both v0 and v1 as vertices, then moving the v1 end
			// to v0 would make a self-loop. The edge should thus be removed.
			if ( in_array( $v0, $edgeVertices ) && in_array( $v1, $edgeVertices ) ) {
				$edgesToRemove[] = $key;
			}

			else if ( $edgeVertices[0] == $v1 ) {
				$this->edges[$key][0] = $v0;
				// $edgeVertices[0] = $v0;
			}

			else if ( $edgeVertices[1] == $v1 ) {
				$this->edges[$key][1] = $v0;
				// $edgeVertices[1] = $v0;
			}

		}

		foreach( $edgesToRemove as $keyToRemove ) {
			unset( $this->edges[ $keyToRemove ] );
		}

	}

	public function printEdges () {

		$output = '';

		foreach( $this->edges as $edge ) {

			$output .= '(' . $edge[0] . ',' . $edge[1] . ') [was (' . $edge[2] . ',' . $edge[3] . ')]' . "\n";

		}

		return $output;

	}

	public function countEdges () {
		return count( $this->edges );
	}

	public function countVertices () {
		return count( $this->vertices );
	}
}