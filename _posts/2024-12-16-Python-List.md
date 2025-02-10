---
title: Python List
description: In this tutorial, we will learn about python list and how to use their methods.
date: 2024-12-16 12:56:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python List.png
  alt: Python List

---

## What is Python List

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
The python list is used to store an ordered sequence of values in a single variable, or we can say the list is the collection of the items of different data types. It is a very flexible data type in Python. The list is like an array from the other programming language. 

The list is mutable so that we can change the value in the list at any time.

## How to Create a List in python

As a list is a collection of the items, we need to separate all the values with a comma (,), and it should be enclosed in square brackets \[ \].

Example:  

```python
mylist= [1,2,3,4]

print(mylist)
```

Output:

```python
[1, 2, 3, 4]

```

We can add any value in the list, but if it is a string, it should be in a single quote (‘) or double quote (“).

Example:

```python
mylist = [1,'two', 3.5, 'four']

print(mylist)
```

Output:

```python
[1, 'two', 3.5, 'four']
```

Example:

```python
mylist = [1,'two', 3.5, 'four']
print(type(mylist))
```

Output:

```python
<class 'list'>
```

## How to Create a Nested list in python

As we have learned about the nested loop and nested condition also known as the list of lists in python, the nested list is slightly different as loops and conditions are functions; a list is a data type or a data structure.

Let see a simple example of a python nested list by creating one.

Example of python list of lists.

```python
X = [1,2,[3,4,5],6,7,8,[9,10]]

print(X)
```


Output

```python
[1, 2, [3, 4, 5], 6, 7, 8, [9, 10]]

```

Example of the nested list with multiple data types

```python
X = [1,"Two",[3,'Four',5],"Six",7,8,[9.5,10]]

print(X)
```

When we execute this program, we will get

```python
[1, 'Two', [3, 'Four', 5], 'Six', 7, 8, [9.5, 10]]
```

## 

## **How to access elements from a list?**

There are various ways to access elements or values from a list. Here we will learn about accessing elements using Positive and negative indexes. 

It is the same way we have learned in our previous tutorial on a string. (Link here)

As we already have learned about indexing in python, and as it starts from 0, we can see a list as a sequence of elements, and we can index them as shown in the image.

![][image1]

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
## Positive indexing in Python list

As we can see in the above image list index starts from 0, we can access an item in a list using the \[ \] operator. So here, our list has 6 elements, and we have an index from 0 to 5\.

The index must be an integer. We can't use float or other types; this will result in TypeError.

Let check an example on how to access elements on the list.

```python
my_list = ['p','y','t','h','o','n']

print(my_list[2])

print(my_list[0])

print(my_list[5])
```
The output will be:

```python
t
p
n
```

Let learn how to access elements in the nested list.

### How to access elements in the nested list?

```python
nested_list = ['We','are','using',['Python',3.8]]

print(nested_list[1])

print(nested_list[3][1])

print(nested_list[2][1])
```

Output:

```python
are
3.8
s
```

We can’t use a string or a float as an index in the list.

```python
nested_list = ['We','are','using',['Python',3.8]]

print(nested_list[3.5])
```

Output:

```python
Traceback (most recent call last):
  File "nested_list.py", line 4, in <module>
    print(nested_list[3.5])
TypeError: list indices must be integers or slices, not float
```

As we can see, it is troughing an error because we can’t use a float as an element in the list.

## Negative Indexing in Python list

Python allows negative indexing for its sequences. The index of \-1 refers to the last item, \-2 to the second last item, and so on.

```python
my_list = ['p','y','t','h','o','n']

print(my_list[-4])

print(my_list[-6])
```

The output of the negative indexing program will be.

```python
t
p
```

## Slicing of the list in Python

We can slice certain elements from a list. 

### How to slice a list in python?

We have learned about accessing an element in the previous tutorial now, in the same way using square brackets \[ \] we can slice a list by adding colon: between two indexes.

Let see how we can slice a list.

Example of slicing a list.

```python
my_list = ['p','y','t','h','o','n']

print(my_list[2:5])

print(my_list[:-4])

print(my_list[2:])

print(my_list[:])
```

And the output will be 

```python
['t', 'h', 'o']
['p', 'y']
['t', 'h', 'o', 'n']
['p', 'y', 't', 'h', 'o', 'n']
```

## Concatenation of Python Lists

Concatenation of python list means to add or merge two or more lists into one list, not like a nested list.

### How to Concatenated python lists?

We can concatenate the python list using two ways.

1) Using \+ operator  
2) Using extend() method

Let us check the first method to merge two lists using an example.

Example of the concatenation of python list using \+ operator 

```python
List_1 = [1,2,3,4]

List_2 = [5,6,7,8]

List_3 = List_1 + List_2 

print(List_1)

print(List_2)

print(List_3)
```

When we run this program, we will get this result.

Output:

```python
[1, 2, 3, 4]
[5, 6, 7, 8]
[1, 2, 3, 4, 5, 6, 7, 8]
```

### Using extend() method:

extend() operator can be used to concatenate one list into another. It is not possible to store the value in the third list. One of the existing lists has to store the concatenated result.

Example of extend() method to concatenate python list.

```python
List_1 = [1,2,3,4]

List_2 = [5,6,7,8]
List_3 = List_1.extend(List_2)

print(List_3)

print(List_1)
```

The output of the above program will be as follow.

Output:

```python
None
[1, 2, 3, 4, 5, 6, 7, 8]

```
As we can see first, we are storing the result of extend() the method to List\_3, but it gives us None as an output because we cannot store the result of extend()  method to another string. We can only merge one list with another list as we can see in the program List\_2 has been merged with List\_1.

### Multiplication of List

We can multiple elements in the list using the \* operator.

Check the example here.

Example of multiplication in list

```python
my_list = ['p','y','t','h','o','n']

print(my_list * 3)

```
Output:

```python
['p', 'y', 't', 'h', 'o', 'n', 'p', 'y', 't', 'h', 'o', 'n', 'p', 'y', 't', 'h', 'o', 'n']
```

As we can see, the list has multiplied itself 3 times based on our code.

We can also use multiple operators in the list element. Let’s check it with an example.

Example

```python
my_list = ['p','y','t','h','o','n']

print(my_list[3] * 2)
```

Output:

```python
hh
```

## **How to change or add elements to a list?**

As lists are mutable, that means we can change their elements, unlike string or tuple.

There are multiple ways to change or add an element to the list, as follows.

1) Using \+ operator  
2) Using append() method  
3) Using inset() method  
4) Using extend() method

### Using \+ Operator

We can use the assignment operator equal ( \= ) to change an item or a range of items, but we can’t use \= to add or declare new elements in the list just like we do to declare a variable or other functions.

Check the example here.

```python
my_list = [5,4,7,8]

my_list[2] = 0
print(my_list)
```

Output:

```python
[5, 4, 0, 8]

```

Here we have changed the value of index 2, which is 7 to 0 with \= operator.

### Using append()  Method

The append() method in python is used to append or add an element to the end of the list; we can not add elements at the starting of the list or in between.

Syntax:

```python
list.append(element)

```

Let understand the append method using an example.

Example of append method in a python list.

```python
a = ["apple", "banana", "cherry"]
b = "Ford"

print("List before using append method.")

print(a)

a.append(b)

print("List after using  append method.")

print(a)
```
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
When we execute this program, we will get the following result.

The output of the append() method in the list is as below.

```python
List before using the append method.
['apple', 'banana', 'cherry']
List after using the append method.
['apple', 'banana', 'cherry', 'Ford']
```

### Using insert() method

The insert() method in python is used to insert an element in the specified index; unlike the append() method, we can easily insert an element to the given index.

The syntax of the insert() method is

```python
list.insert(indx, elem)
```

Here, elem is the value we want to add to a list, and index is the index we want to add the element. Please note that all the elements after the new element we inserted will be shifted to the right. 

The insert() method does not return anything. It returns None. As a result, it only updates the given element in the current list.

Let us understand the insert() method using an example.

Example of insert method in a list.

```python
# vowel list
vowel = ['a', 'e', 'i', 'u']

# 'o' is inserted at index 3
# the position of 'o' will be 4th
vowel.insert(3, 'o')

print('Updated List:', vowel)
```

The output will be as follow.

```python
Updated List: ['a', 'e', 'i', 'o', 'u']

```

### Using extend() method

The Extended method can be learned in the Concatenated python lists section. (Link)

## Deleting an element in the python list

Hance Python list is mutable. Just like changing and appending an element, we can also delete an element in the python list.

### How to delete an element in the Python list?

We can delete an element using the following method:

1) del function  
2) remove() method  
3) pop() method

### Using del function

Using the del function, we can delete or remove elements from a list.

Syntax

```python
del list[element]
```

Let see an example of how to delete an element using the del method.

```python
my_list = [1,2,3,4,5]

print(my_list)

del my_list[3]

print(my_list)
```

When we run this program, we will get the following result.

Output:

```python
[1, 2, 3, 4, 5]
[1, 2, 3, 5]
```

We can also delete multiple elements in sequence using the del method by adding colon: between two index elements. 

Example to delete multiple elements in sequence using del method

```python
my_list = [1,2,3,4,5]

print(my_list)

del my_list[2:4]

print(my_list)
```

Output will be 

```python
[1, 2, 3, 4, 5]
[1, 2, 5]
```

Our program has deleted the two items from the list based on our code, as we can see from the output.

### Using remove() method

The remove() method in the python list is used to remove the first matched element with a specific value from the python list.  
The Syntax of remove() method will be

```python
list.remove(element)
```

Here we can see we are just elements in the parameters, not any index; this is the beauty of the remove() method that we can directly delete an element just string or number.

Let see an example of the remove() method.

Example to remove elements from the list.

```python
cars = ['Toyota','Volkswagen','BMW','Honda','Ford']

print("List is :",cars)
cars.remove('Honda')

print("Updated cars list: ", cars)
```

Output:

```python
List is : ['Toyota', 'Volkswagen', 'BMW', 'Honda', 'Ford']
Updated cars list:  ['Toyota', 'Volkswagen', 'BMW', 'Ford']
```

Example of using remove() method on a list having duplicate elements.

```python
cars = ['BMW','Toyota','Volkswagen','BMW','Honda','Ford']

print("List is :",cars)
cars.remove('BMW')

print("Updated cars list: ", cars)
```

The output will be as follow.

```python
List is : ['BMW', 'Toyota', 'Volkswagen', 'BMW', 'Honda', 'Ford']
Updated cars list:  ['Toyota', 'Volkswagen', 'BMW', 'Honda', 'Ford']
```

### Using pop() method

The pop() method in the python list is used to remove the item based on the index from the list, and this method also returns an output.  
The syntax of the pop() method is:

```python
list.pop(index)
```

Pop() parameters take a single argument, and by default, it takes an index as \-1 in the list.

Let see an example of the pop() method.

```python
# programming languages list
languages = ['Python', 'Java', 'C++', 'French', 'C']

# remove and return the 4th item
return_value = languages.pop(3)
print('Return Value:', return_value)

# Updated List
print('Updated List:', languages)
```

Output:

```python
Return Value: French
Updated List: ['Python', 'Java', 'C++', 'C']
```

Let see how we can calculate the elements in a list.

How to calculate elements in a list?

We can calculate the length of a list using the len() method.

```python
# programming languages list
languages = ['Python', 'Java', 'C++', 'French', 'C']

print(len(languages))
```

The output will be 

```python
5
```

## Membership Test in Python List

The membership test is used to find that whether the specific element is present in a list or not.

We can do a membership test using whether a conditional statement and also within a keyword to find a specific element is present in a list or not.

Let us check an example:

Example of membership test in python list using if conditional statement:

```python
# programming languages list
languages = ['Python', 'Java', 'C++', 'French', 'C']

if 'C++' in languages:
    print("Yes, it is present.")
```

The output will be as follow:

```python
Yes, it is present.
```

We can also do a membership test without any conditional statement just by using a keyword here.

Example 

```python
# programming languages list
languages = ['Python', 'Java', 'C++', 'French', 'C']

print("Java" in languages)
```

The output will be as follows.

```python
True
```

Here we are checking whether the given condition is true or false, that is why we are getting output with boolean value True.

Python has a set of built-in methods that you can use on lists.

| Method | Description |
| ----- | ----- |
| append() | Adds an element at the end of the list |
| clear() | Removes all the elements from the list |
| copy() | Returns a copy of the list |
| count() | Returns the number of elements with the specified value |
| extend() | Add the elements of a list (or any iterable) to the end of the current list |
| index() | Returns the index of the first element with the specified value |
| insert() | Adds an element at the specified position |
| pop() | Removes the element at the specified position |
| remove() | Removes the item with the specified value |
| reverse() | Reverses the order of the list |
| sort() | Sorts the list  |

\`

[image1]: <data:image/png;base64,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>