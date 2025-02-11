---
title: Python Dictionary
description: In this tutorial, we will learn about python dictionary and how to create dictionary, and it’s all their methods.
date: 2024-12-19 11:35:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Dictionary.png
  alt: Python Dictionary
---

## What is Python Dictionary?

Python Dictionary is a built-in data structure, and it is also used to store sequential data but in an unordered collection of key and value pairs. Dictionary store values within the curly braces { } and separate with a comma (,).

Syntax of Python Dictionary

```python
Dictionary = {'key1' : 'value1','key2' : 'value2'}
```

Dictionaries are mutable, which means we can change, add or delete an element from the dictionary after we create it. 

As Python dictionaries store data in key-values, it should be in the following format.

                                  X: 21  
                                  Key-value   

## How to Create a dictionary in python?

Let see an python dictionary example.  
Example:

```python
mydict = {'X':2, 'Y':3 , 'Z':4}

print(mydict)
```

Output:

```python
{'X': 2, 'Y': 3, 'Z': 4}
```

Values in a dictionary can be of any data type and can be duplicated. Still, the keys can't be repeated, and we also cannot change the key as python is case sensitive, so dictionaries with the same keys as X and x will be treated distinctly.

While the values can be of any data type and can repeat, keys must be immutable ([string](https://www.programiz.com/python-programming/string), [number](https://www.programiz.com/python-programming/numbers), or [tuple](https://www.programiz.com/python-programming/tuple) with immutable elements) and must be unique.

Let us take another example of a python dictionary.

```python
House = { 'Door':2, 'Windows':4, 'Garden': 'Yes'}

print(House)

print(type(House))
```

Output:

```python
{'Door': 2, 'Windows': 4, 'Garden': 'Yes'}
<class 'dict'>
```

Note that in the previous version of python, like 3.5 and 3.6, dictionaries used to be unordered, but after python version 3.7, they become ordered. 

When we say that tuples are ordered, the items have a defined order, and that order will not change, and Unordered means that the items do not have a defined order; you cannot refer to an item by using an index.

In a dictionary, we cannot add any duplicate elements with the same key, we can add duplicate values, but keys are not allowed in the Python dictionary.

So when we use a duplicate key in a python.

Example:

```python
cars =  {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,
  "year": 2020
}

print(cars)
```

The output will be as follows.

```python
{'brand': 'Ford', 'model': 'Mustang', 'year': 2020}
```

As we can see in the output, python overwrites the existing value.

## Python Nested Dictionary

A nested dictionary is a dictionary inside a dictionary.

Syntax of nested dictionary

```python
nested_dict = { 'dictA': {'key_1': 'value_1'},
                'dictB': {'key_2': 'value_2'}}
```

### How to create a nested dictionary?

Example:

```python
cars = { 1 : {  "brand": "Ford",  "model": "Mustang",  "year": 1964},
	 2 : {  "brand": "Ferrari",  "model": "166MM",  "year":1948}
        }

print(cars)
```

The output will be as follow:

```python
{1: {'brand': 'Ford', 'model': 'Mustang', 'year': 1964}, 2: {'brand': 'Ferrari', 'model': '166MM', 'year': 1948}}
```

## Accessing Elements from Python Dictionary

We can access the dictionary elements in many ways by referring to its key name inside the square brackets and using the get() method.

Example of accessing an element from python dictionary by referring to its key.

```python
cars =  {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,

}

print(cars["model"])
```

And the output will be as follows.

Output:

```python
Mustang
```

Here we are printing the element model’s value so that the output will be only value, not the key.

Example 2 :

```python
numbers = {
    1 : 'one',
    2 : 'two',
    3 : 'three'}

print(numbers[2])

```

Output:

```python
Two

```

### Using get() method

Syntax

```python
dict_name.keys()

```

We can do the same thing as above to print the element’s value in a python dictionary.

Example of using get() method

```python
cars =  {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,

}

print(cars.get("model"))

```
Output:

```python
Mustang

```

### How to print Keys of python dictionary?

We can print the keys inside the python dictionary using the key() method.

Syntax

```python
dict_name.keys()

```

Example of the key() method to print keys of python dictionary.

```python
cars =  {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,

}

print(cars.keys())


```

When we run this program we will get the following output:

```python
dict_keys(['brand', 'model', 'year'])

```

### How to print Values of python dictionary?

Like keys, we can also print only values of a dictionary using the values() method.

Syntax

```python
dict_name.values()
```

Let's check an example of the values method.

Example:

```python
cars =  {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,
}

print(cars.values())

```

Output:

```python
dict_values(['Ford', 'Mustang', ])

```

As you can see in the output, it is only printing an element’s values, not keys.

## Adding an element in Dictionary

As the dictionary is mutable, we can elements and also change the value of existing elements.

### How to add a new element in the python dictionary?

We can add new elements by referring to new elements in square brackets \[ \] followed by \= operator to the value or use the update() method to add new elements in a dictionary.

If the key is already present, then the existing value gets updated. In case the key is not present, a new pair is added to the dictionary.

Let see an example of adding an element.

```python
cars =  {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,
}

print(cars)

cars["color"] = "Blue"

print(cars)

cars.update({"Fuel Type" : "Petrol"})

print(cars)

```

When we run the above program, we will get the following output:

```python
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964}
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'Blue'}
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'Blue', 'Fuel Type': 'Petrol'}
```

## Change an element of the Dictionary in Python.

Like above, we have added a new element in a dictionary, the same way we can change the value of an element in a dictionary.

We can change an element’s value by referring to the key inside square brackets \[ \] or using the update() method. This method will update the dictionary with the items from a given argument. If the item does not exist, the item will be added.  
Let us see an example of how to change values in a python dictionary.

Example:

```python
cars =  {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,
  "color": "Blue"
}

print(cars)

cars["color"] = "red"

print(cars)

cars.update({"color" : "Green"})

print(cars)
```

The output will be as follow.

```python
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'Blue'}
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'red'}
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'Green'}
```

## Deleting an element from the dictionary

We can delete an entire element with a key and pair using the pop() method in the python dictionary.  
When we use the pop() method, it will return the value of that element which we are deleting.

Example of how to remove the element from the dictionary in python.

```python
cars =  {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964,
}

print(cars.pop("year"))

print(cars)
```
Output:

```python
1964
{'brand': 'Ford', 'model': 'Mustang'}
```

As we can see first, we are deleting element year with the pop() method, and it is returning its value. Then, we are print a whole dictionary, and we can see that the year element is not present in the dictionary.

## Concatenation python dictionaries

Concatenation of python dictionaries means merging two or more python dictionaries into one.

We can merge more of the two dictionaries using the update() method.

Example of a concatenation of python dictionaries.

```python
cars = {  "brand": "Ford",  "model": "Mustang",  "year": 1964}

Ford = {  "color": "Blue",  "Fuel Type": "Petrol"}
        
print(cars)
print(Ford)

cars.update(Ford)
print(cars)

```

When we execute the above code, we will get the following output:

```python
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964}
{'color': 'Blue', 'Fuel Type': 'Petrol'}
{'brand': 'Ford', 'model': 'Mustang', 'year': 1964, 'color': 'Blue', 'Fuel Type': 'Petrol'}
```

## Membership Test in Python Dictionary

The membership test is used to find whether the specified element is present in a dictionary or not.

We can do a membership test using a conditional statement and **in** keyword to find specific elements present in a dictionary.

Let us check an example on the membership test of the python dictionary.

Example:

```python
cars = {  "brand": "Ford",  "model": "Mustang",  "year": 1964}

if "Ford" in cars.values():
    print("Yes, Ford is present.")

if "model" in cars.keys():
    print("Yes, the model is present.")

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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
The output will be as follows.

```python
Yes, Ford is present.
Yes, the model is present.
```

We are using values() to check whether the specified value is present in the dictionary, and for checking keys, we are using the keys() method.

## Looping in Python Dictionary

You can loop through a dictionary by using a for a loop.

When looping through a dictionary, the return value is the dictionary’s key, but there are methods to return the *values*.

Example to print all keys in the dictionary one by one using for loop.

```python

cars = {  "brand": "Ford",  "model": "Mustang",  "year": 1964}
for car in cars:
    print(car)

```

Output:

```python

brand
model
year

```

The above program will only print the keys because dictionaries in python are different from other sequence data types.

To print the values, we can use the values() method to return the dictionary values.

Example to print only values in a python dictionary.

```python

cars = {  "brand": "Ford",  "model": "Mustang",  "year": 1964}
for car in cars.values():
    print(car)

```

Output:

```python

Ford
Mustang
1964

```

If we want to print both keys and values through the loop we can use items() method.

Let see an example of python items() method.

```python

cars = {  "brand": "Ford",  "model": "Mustang",  "year": 1964}
for car in cars.items():
    print(car)

```

The output will be:

```python

('brand', 'Ford')
('model', 'Mustang')
('year', 1964)

```

## how to increment value in dictionary python?

We can also increase the values in the dictionary in many different ways that we are going on learn in the below examples, and increment values are very useful when we work with data structures and algorithms kind of stuff.

Example increment the all value of the python dictionary by one.

```python
numbers = { "A" : 1, "B" : 2, "C" : 3}

for keyname in numbers:  
    numbers\keyname] = numbers[keyname]  + 1

print(numbers)

```

Output will be as follow

```python

{'A': 2, 'B': 3, 'C': 4}
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
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
## Dictionary Methods

Python has a set of built-in methods that can be used in python dictionaries.

| Method | Description |
| ----- | ----- |
| clear() | Removes all the elements from the dictionary |
| copy() | Returns a copy of the dictionary |
<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
| fromkeys() | Returns a dictionary with the specified keys and value |
| get() | Returns the value of the specified key |
| items() | Returns a list containing a tuple for each key-value pair |
| keys() | Returns a list containing the dictionary's keys |
| pop() | Removes the element with the specified key |
| popitem() | Removes the last inserted key-value pair |
| setdefault() | Returns the value of the specified key. If the key does not exist: insert the key with the specified value |
| update() | Updates the dictionary with the specified key-value pairs |
| values() | Returns a list of all the values in the dictionary  |

