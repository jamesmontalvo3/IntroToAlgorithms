#!/usr/bin/env python

# import sys
# sys.path.append( "./")

from Quicksort2 import *

# arr = map( int, open( './AlgProg2.txt', 'r' ).read().split('\r\n') )
arr = map( int, open( './test1000.txt', 'r' ).read().split('\r\n') )

print 'first'
print myQuicksort2( list(arr), 0, -1000, 'first' )[1]

print 'last'
print myQuicksort2( list(arr), 0, -1000, 'last' )[1]

print 'median'
print myQuicksort2( list(arr), 0, -1000, 'median' )[1]