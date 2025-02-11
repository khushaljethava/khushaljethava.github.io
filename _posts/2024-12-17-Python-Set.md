---
title: Python Set
description: In this tutorial, you'll learn everything about Python sets; how they are created, adding or removing elements from them, and all operations performed on sets in Python.
date: 2024-12-17 09:01:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Set.png
  alt: Python Set
---

## What is Python Set?

Python set is one of 4 built-in data types in python used to store multiple items in a single variable. A set is a collection of unordered, unchangeable, and unindexed elements. Every element in a python set operations must be unique. We cannot add duplicate elements.

The set is immutable, so we cannot change an element in the set.so Once a set is created, you cannot change its items, but you can add new items.

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
### How to make a set in python? 

Sets are written with curly brackets { }  and elements are separated by comma ( , ) Or we can create a set using built-in function set(). Like Python list and tuple, we cannot add all the data types in a set. We can only add integer, float, tuple, and string in it as an element we cannot add   
datatypes like boolean and mutable elements like lists, sets of dictionaries as its elements.

python set syntax:

```python
Set_Name = { Value1, Value2, Value3}
```

Let see some examples of python set.

Example:

```python
my_set = { 1 , "Two", 3 ,"Four" }
print(my_set)
print(type(my_set))
```

Output:

```python
{1, 'Two', 3, 'Four'}
<class 'set'>
```

Note: As Set is unordered, whenever we run this program, we will get an unordered result.

Example of set() functions

```python
set_1 = set([1,2,4,5])
print(my_set)


set_2 = set([1,2,2,3])
print(my_set)
```

When we run this program, we will get the following output:

```python
{1, 2, 4, 5}
{1, 2, 3}
```

We can see in the above program we are using the set() function to convert the list into a set, and in set\_2 in the list, we have a duplicate item, but as we are converting it into a set, we are not getting any duplicate items as in set we cannot use duplicated items.

## Access Elements in Python Set

We cannot access elements in a set by referring to an index as we learn that python is an unindex.

But we can iterate through the elements using for loop, or we can ask for the specified value in a set by using if conditional statement with in keyword.

### Using for loop:

```python
my_set = {'Dog','Cat','Bird','Fish','Frog'}

for val in my_set:
	print(val)
```

The output of the above program will be as follows.

Output:

```python
Fish
Frog
Cat
Bird
Dog
```

As we can see, the program is printing elements one by one. Every time we run this program, we will get the different ordered output as the set is an unordered data type.

## Membership test in Python Set

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
A membership test is used to find whether the specified element is present in a python set function or not.

We can do a membership test using whether a conditional statement and in keyword to find specific elements present in the set.

Let's check an example using if conditional statement:

```python
my_set = {'Dog','Cat','Bird','Fish','Frog'}

if 'Bird' in my_set:
    print("It is Present in a set.")
```

Let see the output:

```python
It is Present in a set.

```

Example using only **in** keyword:

```python
my_set = {'Dog','Cat','Bird','Fish','Frog'}

print('Cat' in my_set)
```

Output:

```python
True
```

Example using Not keyword.

```python
my_set = {'Dog','Cat','Bird','Fish','Frog'}

print('Dog' not in my_set)
```

Output:

```python
False

```

## Adding elements in Python Set

We have learned that a set is unchangeable, we cannot change any element’s value, but we can add new elements in the python set using add() method. 

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
How to Add an element to the set?

Here we will use add() method to add a new element to a set. Add() method can only add one element at a time. We cannot add multiple elements together using add() method.  
   
Let see and example:

```python
my_set = {'Dog','Cat','Bird','Fish','Frog'}

print(my_set)

my_set.add("Snake")

print(my_set)
```

Output:

```python
{'Bird', 'Dog', 'Frog', 'Fish', 'Cat'}
{'Bird', 'Dog', 'Snake', 'Frog', 'Fish', 'Cat'}
```

We cannot add multiple elements together, but we can add elements from another set into the current set using the update() method.

Let check an example on how to use the update() method in the set.

Example:

```python
set_1 = {'Dog','Cat','Bird'}

set_2 = {'Fish','Frog'}

print(set_1)

print(set_2)
set_1.update(set_2)

print(set_1)
```

Output:

```python
{'Bird', 'Dog', 'Cat'}
{'Frog', 'Fish'}
{'Dog', 'Bird', 'Fish', 'Frog', 'Cat'}
```

## Delete an element in a python list

We can delete an element in a set using a remove() method or discard() method.

Here we are using the remove() method.  
Example:

```python
my_set = {'Dog','Cat','Bird','Fish','Frog'}

my_set.remove('Fish')

print(my_set)
```

Output:

```python
{'Bird', 'Dog', 'Cat', 'Frog'}

```

Here we are using the remove() method to remove Fish from the set, and please note that if the element we are deleting is not present in the set, we get an error as a result.

Let delete an element using the discard() method.

Example

```python
my_set = {'Dog','Cat','Bird','Fish','Frog'}

my_set.discard('Fish')

print(my_set)

my_set.discard('Snake')

print(my_set)
```

When we run the above program, we will get the following output.

Output:

```python
{'Dog', 'Cat', 'Frog', 'Bird'}
{'Dog', 'Cat', 'Frog', 'Bird'}
```

We can see in the output that first, we are deleting an element with value Fish, then again we are deleting an element with a value Snake, which is not present in the set, but it is not returning any result or any error because when we use discard() method, it will not return any errors if the element is not present in the set.

## Concatenation of Python Set

Concatenation to python sets means to merge or combine two or more sets into one.

We can use the union() method to combine two sets and store them into a new set. 

The union() method will return a new set with all items from two or more sets.

```python
set_1 = {"a", "b" , "c"}
set_2 = {1, 2, 3}

set_3 = set_1.union(set_2)
print(set_3)
```

## The output of the code will be as follow:

```python
{'b', 1, 'a', 2, 3, 'c'}

```
## Python Frozenset

frozenset is a new class that has the characteristics of a set, but its elements cannot be changed once assigned. While tuples are immutable lists, frozensets are immutable sets.

Sets being mutable are unhashable, so they can't be used as dictionary keys. On the other hand, frozensets are hashable and can be used as keys to a dictionary.

Frozensets can be created using the frozenset() function.

Let us check an example of Frozenset

```python
A = frozenset([1, 2, 3, 4])
B = frozenset([3, 4, 5, 6])
print(A)
print(B)
```

Output:

```python
frozenset({1, 2, 3, 4})
frozenset({3, 4, 5, 6})
```

## Methods in Set

| Method | Description |
| ----- | ----- |
| add() | Adds an element to the set |
| clear() | Removes all the elements from the set |
| copy() | Returns a copy of the set |
| difference() | Returns a set containing the difference between two or more sets |
| difference\_update() | Removes the items in this set that are also included in another specified set |
| discard() | Remove the specified item |
| intersection() | Returns a set, that is the intersection of two other sets |
| intersection\_update() | Removes the items in this set that are not present in other, specified set(s) |
| isdisjoint() | Returns whether two sets have an intersection or not |
| issubset() | Returns whether another set contains this set or not |
| issuperset() | Returns whether this set contains another set or not |
| pop() | Removes an element from the set |
| remove() | Removes the specified element |
| symmetric\_difference() | Returns a set with the symmetric differences of two sets |
| symmetric\_difference\_update() | inserts the symmetric differences from this set and another |
| union() | Return a set containing the union of sets |
| update() | Update the set with the union of this set and others  |

