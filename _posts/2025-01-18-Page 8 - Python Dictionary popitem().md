---
title: Python Dictionary popitem()
description: In the python dictionary, the popitem() method returns and removes the last pair of the given dictionary.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary popitem().png
 alt: Python Dictionary popitem()
---

The syntax of popitem() is:

```python
dictionary.popitem()

```

## popitem() Parameters 

The popitem() does not take any parameters as arguments.

Let see some examples of the popitem() method in dictionaries.

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
### Example 1: How to use the popitem() method in python dictionaries?

```python
cars = {"BMW" : 1,"TOYOTA" : 2,"TATA" : 3}

print("Removed items is:",cars.popitem())
print("New Dictionary is :",cars)

print("Removed items is:",cars.popitem())
print("New Dictionary is :",cars)

print("Removed items is:",cars.popitem())
print("New Dictionary is :",cars)

```

Output:

```python
Removed items is: ('TATA', 3)
New Dictionary is : {'BMW': 1, 'TOYOTA': 2}
Removed items is: ('TOYOTA', 2)
New Dictionary is : {'BMW': 1}
Removed items is: ('BMW', 1)
New Dictionary is : {}

```

### Example 2: using popitem() with only one element in dictionaries.

```python
cars = {"BMW" : 1}

print("Removed items is:",cars.popitem())
print("New Dictionary is :",cars)

print("Removed items is:",cars.popitem())
print("New Dictionary is :",cars)

```
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

Output 1:

```python
Removed items is: ('BMW', 1)
New Dictionary is : {}
Traceback (most recent call last):
  File "", line 6, in <module>
    print("Removed items is:",cars.popitem())
KeyError: 'popitem(): dictionary is empty

```

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
As you can see it throws a KeyError exception when there is no item present in the dictionary.

## Rules of popitem()

* The popitem() method works on LIFO order (Last in, First out).  
* It will remove the last key-value pair from the dictionary.  
* Throw KeyError when no item is left in the dictionary.