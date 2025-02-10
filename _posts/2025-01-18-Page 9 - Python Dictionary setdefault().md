---
title: Python Dictionary setdefault()
description: In Python dictionary, setdefault() method returns the value of the given key, if the key is present in the dictionary and if not present it will inserts a key with a value to the dictionary.
date: 2025-01-18 21:38:03 +0800
categories: [Python Dictionary Reference]
tags: [Python Dictionary Reference]
image:
 path: /commons/Python Dictionary setdefault().png
 alt: Python Dictionary setdefault()
---

The syntax of setdefault() is:

```python
dictionary.setdefault(key, default_value)
```

## setdefault() Parameters

The python setdefault() method takes two parameters as arguments:

* **key** \- Key to being searched in the dictionary.  
* **default\_value** \- The value to be returned in case the key is not found. If not provided, the defalut\_value will be None.

Let see some examples of python dictionaries setdefault() method.

### Example 1: How to use setdefault() method on python dictionary?

```python
Dogs = {'name' : 'Coco', 'age' : 4}

dog_age = Dogs.setdefault('age')
print('Age of Dog is:', dog_age)

```

Output:

```python
Age of Dog is: 4

```

### Example 2: How setdefault() works when a key is not in the dictionary?

```python
Dogs = {'name': 'Coco'}

# key is not in the dictionary
color = Dogs.setdefault('color')
print('Dogs = ',Dogs)
print('color = ',color)

# key is not in the dictionary
# default_value is provided
age = Dogs.setdefault('age', 4)
print('Dogs = ',Dogs)
print('age = ',age)

```

Output:

```python
Dogs =  {'name': 'Coco', 'color': None}
color =  None
Dogs =  {'name': 'Coco', 'color': None, 'age': 4}
age =  4

```

## Rules of setdefault() 

* Only returns a result if the given key is present in the dictionary.  
* Will return None when the key is not present in the dictionary and default value is not specified.