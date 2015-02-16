// SCC.cpp: James Montalvo
// Description: Calculate Strongly Connected Components of a graph

#include <iostream>
#include <fstream>
#include <string>
using namespace std;






int load() {

  ifstream sccTextFile;
  sccTextFile.open("SCC.txt");
  string line;
  int firstSpace;
  string intOne;
  string intTwo;
  int int1 = 0;
  int int2 = 0;
  if (sccTextFile.is_open()) {
    
    for ( int x = 0; x < 5; x++ ) {
    //while ( ! sccTextFile.eof() ) {
    
      getline( sccTextFile, line );
      cout << line << endl;


      firstSpace = line.find( ' ' );
      intOne = line.substr( 0, firstSpace );
      intTwo = line.substr( firstSpace + 1, line.find( ' ', firstSpace + 1 ) );

      cout << "First int: " << intOne << endl;
      cout << "Second int: " << intTwo << endl;

      int1 = atoi( intOne.c_str() );
      int2 = atoi( intTwo.c_str() );
    }
  }
  sccTextFile.close();
  return int1 + int2;
}



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

  load();

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



