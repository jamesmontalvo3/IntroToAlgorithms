
; maxSubarray ( A ):

; 	var max = { sum: -1, start: -1, end: -1 };
; 	var current = { sum: A[0], start: 0, end: 0 }

; 	for ( var i=1; i < A.length; i++ ):
; 		if A[i] > 0:
; 			if A[i-1] < 0 AND current.sum < 0:
; 				current.start = i
; 				current.sum = 0 // sum dropped below zero, so restart
; 			current.sum += A[i]  // add to sum
; 			current.end = i
; 		else if A[i] < 0
; 			if A[i-1] > 0 AND current.sum > max.sum:
; 				max = { sum: current.sum, start: current.start, end: current.end }
; 			current.sum += A[i]
; 			current.end = i


(define (fibonacci n)
	(if (< n 2) n
		(+ (fibonacci (- n 1))
			(fibonacci (- n 2)))))

(fibonacci 2)

(fibonacci 5)

(fibonacci 10)