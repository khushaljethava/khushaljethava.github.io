---
title: Python Dictionary copy()
description: The copy() method returns a copy of the given dictionary.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary copy().png
 alt: Python Dictionary copy()
---

The syntax of copy() is:

```python
dictionary.copy()

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

## copy() Parameters 

The copy() method does not take any parameters as arguments.
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

### Example 1: How to use copy() method in python dictionary?

```python
cars = {1 : "TATA",2 : "BMW", 3 : "TOYOTA"}
print("First Dictionary is:",cars)

# coping dictionary using copy() method
new_cars = cars.copy()

print("Second Dictionary is:",new_cars)

```

Output:

```python
First Dictionary is: {1: 'TATA', 2: 'BMW', 3: 'TOYOTA'}
Second Dictionary is: {1: 'TATA', 2: 'BMW', 3: 'TOYOTA'}

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

Note: The copy() method is entirely different from \= operator, as \= operator is used for creating a new reference to the original dictionary  and copy() method is used to create a new dictionary from the reference from the original dictionary that is filled with the same items as the original dictionary.

### Example 2: How \= operator is different from copy() method in python dictionaries?

```python
cars = {1 : "TATA",2 : "BMW", 3 : "TOYOTA"}
print("First Dictionary is:",cars)

new_cars = cars

# clearing dictionary using clear() method
new_cars.clear()

print("First Dictionary is:",cars)
print("Second Dictionary is:",new_cars)

```

Output:

```python
First Dictionary is: {1: 'TATA', 2: 'BMW', 3: 'TOYOTA'}
First Dictionary is: {}
Second Dictionary is: {}

```
Here, when the new\_cars dictionary is cleared, the cars dictionary is also cleared.

## Rules of copy()

* Given object must be a dictionary, else returns an AttributeError exception.