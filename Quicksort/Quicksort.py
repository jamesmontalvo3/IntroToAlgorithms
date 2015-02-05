#!/usr/bin/env python 

from random import randint


def myQuicksort( sortarray=None, start = 0, end = -1 ):

	# deliberately long name for global var
	global myQuicksortArray

	# sortarray will only be used in the initial call, not recursive ones
	if ( sortarray is not None ):
		myQuicksortArray = sortarray

	if ( end == -1 ):
		end = len( myQuicksortArray ) - 1

	pivotIndex = randint( start, end )
	pivotValue = myQuicksortArray[ pivotIndex ]

	print pivotIndex
	print pivotValue

