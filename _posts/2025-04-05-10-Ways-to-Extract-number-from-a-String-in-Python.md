---
title: 5 Ways to Extract Numbers from a String in Python
description: Many times we, face difficulties while working with string or string manipulations. So in this tutorial, we will how to extract numbers from a string in Python not only that we will 10 ways to extract numbers from a string using Python.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/5 Ways to Extract Numbers from a String in Python.png
 alt: 5 Ways to Extract Numbers from a String in Python
---

Let's experiment with each method and see how to extract number from string in Python.

## Method 1: Using Regular Expressions (re module)

Regular expressions or re is one of the most powerful packages of python its deals with all kinds of task-related strings and text.  
   
import re

text \= "Hello, my age is 25 and my GPA is 3.75"  
numbers \= re.findall(r'\\d+\\.\\d+|\\d+', text)  
print(numbers)

## Method 2: Using isdigit() method

Python isdigit() is a built-in string method that is used to check if a given string is a digit or not.

text \= "Hello, my age is 25 and my GPA is 3.75"  
numbers \= \[float(word) for word in text.split() if word.replace(".", "", 1).isdigit()\]  
print(numbers)

## Method 3: Using a loop to check and extract numbers:

In this method, we will pure Python loop and condition statement to extract numbers.

text \= "Hello, my age is 25 and my GPA is 3.75"  
numbers \= \[\]  
current\_number \= ""

for char in text:  
    if char.isdigit() or char \== '.':  
        current\_number \+= char  
    elif current\_number:  
        numbers.append(float(current\_number))  
        current\_number \= ""

if current\_number:  
    numbers.append(float(current\_number))

print(numbers)

## Method 4: Using a generator expression and itertools:

Python itertools is also a built-in package with many different tools.

import itertools

text \= "Hello, my age is 25 and my GPA is 3.75"  
numbers \= \[float(''.join(group)) for is\_number, group in itertools.groupby(text, key=str.isdigit) if is\_number\]  
print(numbers)

## Method 5: Using a third-party library, NumPy:

Here we will use the numpy package that is used to deal with Python arrays.

import numpy as np

text \= "Hello, my age is 25 and my GPA is 3.75"  
numbers \= \[float(num) for num in np.fromstring(text, dtype=float, sep=" ")\]  
print(numbers)

python extract number from string   
extract number from string python   
how to extract numbers from a string in Python