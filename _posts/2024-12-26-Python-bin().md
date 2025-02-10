---
title: Python bin() Method
description: The bin() is a built-in method in python that will take an integer and return the given integer’s binary representation into a string format.
date: 2024-12-26 21:15:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python bin() Method.png
  alt: Python bin() Method

---


<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The syntax of the bin() method is:

```python
bin(number)
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
```

## Python bin() Parameters 

The bin() method will take only a single parameter as an integer.

Let's see an example of the bin() python method.

Example 1: Convert integer to binary using bin() method.

```python
number = 4
print("The binary equivalent of 4 is:", bin(number))
```
Output:

```python
The binary equivalent of 4 is: 0b100
```

We can see that the bin() method is returning the binary equivalent of the given number, and the **0b** is the prefix representation of the binary string, which will remain the same with all the integer numbers.

If the given value is not an integer, the bin() method has to implement \_\_index\_\_() method to return an integer.

Example 2: Convert an object to binary using \_\_index\_\_() method with bin() method.

```python
class Sum:
    def __init__(self,number1,number2):
        self.number1 = number1
        self.number2 = number2
    def __index__(self):
        return self.number1 + self.number2


Total_Sum = Sum(2,2)
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 300,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
print("The binary equivalent of class Sum is:", bin(Total_Sum))
```

When we execute the above program, we will get the following results.

```python
The binary equivalent of class Sum is: 0b100
```

Here, we are giving an object of class Sum as a parameter to the bin() method.

When we give the non-integer value of the bin() method, it will throw an error because the bin() method only takes an integer value as a parameter.

But in the above program, the bin() method will not raise an error even when we are giving an object of the Sum class that is not an integer.

This is because we have implemented the \_\_index\_\_() method, which returns an integer. This integer is then supplied to the bin() method.