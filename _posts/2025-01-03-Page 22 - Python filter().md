---
title: Python filter() Method
description: In this tutorial we will learn about python filter method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
 path: /commons/Python filter() Method.png
 alt: Python filter() Method
---

## What is Python filter() Method?

The filter() method returns an iterator where the items are filtered through a method to test if the item is true or not.

The syntax of filter() method is:

```python
filter(method, iterable)

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
## Python filter() Method Parameters

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
filter() method takes two parameters:

* method \- it will take a method that tests if elements of an iterable return true or false.  
* iterable \- iterable which will be filtered, can be sets, lists, tuples, or containers of any iterators


Let us see some examples of filter() method.

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
### Example 1: How filter() method works for the iterable list?

```python
# list of letters
letters = ['a', 'b', 'd', 'e', 'i', 'j', 'o']

# function that filters vowels
def filter_vowels(letter):
    vowels = ['a', 'e', 'i', 'o', 'u']

    if(letter in vowels):
        return True
    else:
        return False

filtered_vowels = filter(filter_vowels, letters)

print('The filtered vowels are:')
for vowel in filtered_vowels:
    print(vowel)

```

The output will be as follow:

```python
The filtered vowels are:
a
e
i
o

```

## Rules of filter() method

filter() method can take only an iterator as an input which can be passed in method to check for each element in the iterable.