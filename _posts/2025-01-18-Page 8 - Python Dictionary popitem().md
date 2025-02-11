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

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The syntax of popitem() is:

```python
dictionary.popitem()

```

## popitem() Parameters 

The popitem() does not take any parameters as arguments.

Let see some examples of the popitem() method in dictionaries.

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
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
As you can see it throws a KeyError exception when there is no item present in the dictionary.

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
## Rules of popitem()

* The popitem() method works on LIFO order (Last in, First out).  
* It will remove the last key-value pair from the dictionary.  
* Throw KeyError when no item is left in the dictionary.