#!/usr/bin/env python 

from random import randint
from math import floor

from sys import setrecursionlimit
setrecursionlimit(10000)

def myQuicksort2( A, start = 0, end = -1000, pivotType=None ):

	# deliberately long name for global var
	global myQuicksortComparisons

	# hackish way to check for the first (non-recursed) call of the function
	if end == -1000:
		recurse = 0
		end = len( A ) - 1
		myQuicksortComparisons = 0
	else:
		recurse = 1

	# base case (note: end - start == 1 means 2 elements in array...needs sorting)
	if ( end - start ) < 1:
		# sub = A[start:end+1]
		# print "base case start/end: " + `start` + "/" + `end`
		# print "sub: " + `sub`
		# print
		return;

	# count number of comparisons
	myQuicksortComparisons += end - start


	#
	# CHOOSING PIVOT
	#

	# FIRST element
	if pivotType == 'first':
		pivotIndex = start

	# LAST element
	elif pivotType == 'last':
		pivotIndex = end

	# MEDIAN-OF-3 element
	elif pivotType == 'median':
		first  = A[ start ]
		middleElement = start + int( floor( (end - start) / 2 ) )
		middle = A[ middleElement ]
		last   = A[ end ]

		if first > middle and middle > last:
			pivotIndex = middleElement
		elif middle > first and first > last:
			pivotIndex = start
		else:
			pivotIndex = end

	# RANDOM: the correct way to do it
	else:
		print "RANDOM METHOD"
		pivotIndex = randint( start, end )

	pivotValue = A[ pivotIndex ]

	sub = A[start:end+1]
	# print "initial: " + `A`
	# print "sub: " + `sub`
	# print "start/end: " + `start` + "/" + `end`
	# print "pivot index/value: " + `pivotIndex` + "/" + `pivotValue`

	# if pivot is not first element, swap pivot and start elements
	if pivotIndex != start:
		swapValues( A, pivotIndex, start )
		# A[ pivotIndex ] = A[ start ];
		# A[ start ] = pivotValue;
		# pivotIndex = start

	i = start # location of where the pivot should go

	for j in range( start + 1, end + 1 ):

		jValue = A[ j ]

		if jValue < pivotValue:

			# EXAMPLE:
			# assume pivot = 5 (first element)
			# i = where pivot should go at end of loop
			# j = boundary of what we've checked
			# right now i = 2 and we're in the middle of j = 6
			#    The 4 (at j=6) needs to be swapped with the 7 (at j=3)
			#    This can be thought of as j=3 or as i+1. i is going to
			#    increase, after this step, so start by increment i
			#
			#    piv      i               j
			#     |       |               |
			#     v       v               v
			# 	[ 5 , 2 , 3 , 7 , 8 , 9 , 4 , 1 ]
			#
			#     i
			#    piv  j ... -->
			#     |   |
			#     v   v
			# 	[ 1 , 2 , 3 , 7 , 8 , 9 , 4 , 5 ]
			#

			# move i (ex: to where the "7" is)
			i += 1

			# give j the new (incremented) value of i (ex: 7)
			# A[ j ] = A[ i ]
			
			# give i the previous value of j (ex: 4)
			# A[ i ] = jValue

			swapValues( A, i, j )

		# end if

	# end for loop

	# swap position of pivot (first element) and i-th element
	# A[ start ] = A[ i ]
	# A[ i ] = pivotValue
	swapValues( A, start, i )

	# print "final i position: " + `i`
	# print "value prior next recurse:" + `A`
	# print " "
	# print 'next'
	
	if i == start:
		# print A[i+1:end+1]
		myQuicksort2( A, i + 1, end, pivotType )
	elif i == end:
		# print A[start:i]
		myQuicksort2( A, start, i - 1, pivotType )
	else:
		# print A[start:i]
		# print A[i+1:end+1]
		# recursively call function on pre-pivot and post-pivot subarrays
		myQuicksort2( A, start, i - 1, pivotType )
		myQuicksort2( A, i + 1, end, pivotType )

	# print "i = " + `i`
	# print "j = " + `j`
	# print A
	# return

	# hackish way to check for the first (non-recursed) call of the function
	if recurse == 0:
		# print "final output:" + `A`
		return [ A, myQuicksortComparisons ]
	else:
		return

# end myQuicksort

def swapValues ( arr, index1, index2 ):
	val1 = arr[ index1 ]
	val2 = arr[ index2 ]
	arr[ index1 ] = val2
	arr[ index2 ] = val1


