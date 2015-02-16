// SCC.cpp: James Montalvo
// Description: Calculate Strongly Connected Components of a graph

#include <iostream>
using namespace std;



/*

DFS:
  mark i as explored
  set leader[i] = current S vertex
  foreach( edge ):
    if endpoint vertex j not explored:
      DFS( graph, j )


 */
int dfs( int graph, int vertex )
{


  return graph + vertex;
}




/**

main() is a function that will perform DFS loops as required to get through the graph

// graph of nodes labelled 1 to n
DFS-Loop( graph ):
  global var t = 0
  global var s = NULL; //
  for i=n downto 1:
    if i not yet explored:
      s = i
      DFS( graph, i )




 */
int main()
{
  int t = 0;
  int s = 0;
  int myDfs = 10000;

  if ( ! t && ! s ) {
    myDfs = dfs( 1, 2 );
  }

  if ( myDfs > 0 ) {
    cout << "This is a test: " << to_string( myDfs ) << endl;
  }
  else {
    cout << "also a test: " << to_string( myDfs ) << endl;
  }
  return 0;
}



