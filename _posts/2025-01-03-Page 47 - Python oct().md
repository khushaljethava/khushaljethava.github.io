---
title: Python oct() Method
description: The python oct() is a built-in function of python that returns the octal string of a given integer. Octal strings start with 0o prefix when converted.
date: 2025-01-03 22:42:23 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Python oct() Method.png
 alt: Python oct() Method
---

The syntax of oct() is:

```python
oct(integer)

```

## oct() Parameters

The oct() function takes only one parameter argument.

* integer \- an integer number that can be binary, decimal or hexadecimal.


  
Let check the example of oct() in python.

### Example 1: How to use oct() function in python?

```python
# decimal to octal
print('oct(10) is:', oct(4))

# binary to octal
print('oct(0b101) is:', oct(0b10))

# hexadecimal to octal
print('oct(0XA) is:', oct(0XC))

```

Output:

```python
oct(10) is: 0o4
oct(0b101) is: 0o2
oct(0XA) is: 0o14

```

### Example 2: How to use the oct() function with a custom object?

```python
class Person:
    age = 23

    def __index__(self):
        return self.age

    def __int__(self):
        return self.age

person = Person()
print('The oct is:', oct(person))

```

Output:

```python
The oct is: 0o27

```

Here, the Person class implements \_\_index\_\_() and \_\_int\_\_(). That's why we can use oct() on the objects of Person.

## Rules of oct()

* If not an integer, it should implement \_\_index\_\_() to return an integer.  
* The oct() function will raise an error when a non-integer value is passed.