#!/usr/bin/env python 

from random import randint
from math import floor

from sys import setrecursionlimit
setrecursionlimit(10000)

def myQuicksort( sortarray=None, start = 0, end = -1, pivotType=None ):

	# deliberately long name for global var
	global myQuicksortArray
	global myQuicksortComparisons

	# sortarray will only be used in the initial call, not recursive ones
	if ( sortarray is not None ):
		myQuicksortArray = sortarray
		myQuicksortComparisons = 0

	if ( end == -1 ):
		end = len( myQuicksortArray ) - 1

	# base case (note: end - start == 1 means 2 elements in array...needs sorting)
	if ( end - start ) < 1:
		# print "base case start/end: " + `start` + "/" + `end`
		# print
		return;

	# count number of comparisons
	myQuicksortComparisons += end - start


	#
	# CHOOSING PIVOT
	#

	# RANDOM: the correct way to do it
	if pivotType is None:
		pivotIndex = randint( start, end )

	# FIRST element
	elif pivotType == 'first':
		pivotIndex = start

	# LAST element
	elif pivotType == 'last':
		pivotIndex = end

	# MEDIAN-OF-3 element
	else:
		first  = myQuicksortArray[ start ]
		middleElement = start + int( floor( (end - start) / 2 ) )
		middle = myQuicksortArray[ middleElement ]
		last   = myQuicksortArray[ end ]

		if first > middle and middle > last:
			pivotIndex = middleElement
		elif middle > first and first > last:
			pivotIndex = start
		else:
			pivotIndex = end


	pivotValue = myQuicksortArray[ pivotIndex ]

	# print "initial: " + `myQuicksortArray`
	# print "start/end: " + `start` + "/" + `end`
	# print "pivot index/value: " + `pivotIndex` + "/" + `pivotValue`

	# if pivot is not first element, swap pivot and start elements
	if pivotIndex != start:
		swapValues( myQuicksortArray, pivotIndex, start )
		# myQuicksortArray[ pivotIndex ] = myQuicksortArray[ start ];
		# myQuicksortArray[ start ] = pivotValue;
		# pivotIndex = start

	i = start # location of where the pivot should go

	for j in range( start + 1, end + 1 ):

		jValue = myQuicksortArray[ j ]

		if jValue > pivotValue:
			continue # just advance j
		else:

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

			# move i (ex: to where the "7" is)
			i += 1

			# give j the new (incremented) value of i (ex: 7)
			# myQuicksortArray[ j ] = myQuicksortArray[ i ]
			
			# give i the previous value of j (ex: 4)
			# myQuicksortArray[ i ] = jValue

			swapValues( myQuicksortArray, i, j )

	# end for loop

	# swap position of pivot (first element) and i-th element
	# myQuicksortArray[ start ] = myQuicksortArray[ i ]
	# myQuicksortArray[ i ] = pivotValue
	swapValues( myQuicksortArray, start, i )

	# print "final i position: " + `i`
	# print "value prior next recurse:" + `myQuicksortArray`
	# print " "

	print 'next'
	if i == start:
		print myQuicksortArray[i+1:end+1]
		myQuicksort( None, i + 1, end )
	elif i == end:
		print myQuicksortArray[start:i]
		myQuicksort( None, start, i - 1 )
	else:
		print myQuicksortArray[start:i]
		print myQuicksortArray[i+1:end+1]
		# recursively call function on pre-pivot and post-pivot subarrays
		myQuicksort( None, start, i - 1 )
		myQuicksort( None, i + 1, end )

	# print "i = " + `i`
	# print "j = " + `j`
	# print myQuicksortArray
	# return

	if ( sortarray is not None ):
		# print "final output:" + `myQuicksortArray`
		return [ myQuicksortArray, myQuicksortComparisons ]
	else:
		return

# end myQuicksort

def swapValues ( arr, index1, index2 ):
	val1 = arr[ index1 ]
	val2 = arr[ index2 ]
	arr[ index1 ] = val2
	arr[ index2 ] = val1


