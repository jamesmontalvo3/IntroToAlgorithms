#!/usr/bin/env python

# import sys
# sys.path.append( "./")

# from Quicksort import sort
from Quicksort import *
# import Quicksort

from random import randint

assertTrue = 0
assertFalse = 0

for arrLength in range(100000, 1000000, 500000):

	arr = [randint(0,1000000) for i in range(arrLength)]
	
	if myQuicksort( arr ) == sorted( arr ):
		assertTrue += 1
	else:
		assertFalse += 1


print "{0} tests passed, {1} tests failed".format( assertTrue, assertFalse )



#
#	to test the speed of this implementation...from minimal tests it 
#	appears to be about 6 times slower than the built in function
#

# import time

# time.clock()
# sorted( [randint(0,1000000) for i in range(1000000)] )
# # myQuicksort( [randint(0,1000000) for i in range(1000000)] )

# print time.clock()