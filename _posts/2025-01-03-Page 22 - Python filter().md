---
title: Python filter() Method
description: In this tutorial we will learn about python filter method and its uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python filter() Method.webp
  alt: Python filter() Method
---

The Python `filter()` function is a built-in that constructs an iterator from elements of an iterable for which a given function returns `True`. It takes two parameters: a function (or `None`) that serves as the test, and an iterable whose elements will be tested. When the function parameter is `None`, it removes all falsy values from the iterable. The function returns a filter object, which is a lazy iterator that yields only the elements passing the test. This makes `filter()` memory-efficient for large datasets since elements are evaluated on demand rather than all at once. A common real-world use case is cleaning datasets by removing invalid entries, such as filtering out empty strings from user input, removing null values from API responses, or selecting records that meet specific business criteria from a database query result.

## What does filter() return?

The `filter()` function returns a filter iterator that yields only the elements from the iterable for which the provided function returns `True`.

## When should you use filter()?

Use `filter()` when you need to select elements from a sequence based on a condition, especially when working with large datasets where the lazy evaluation avoids loading all results into memory at once.

## Common Use Cases

A frequent use of `filter()` is data validation, such as filtering a list of email addresses to keep only those matching a valid format, or removing incomplete records from imported CSV data. Another practical scenario is access control, where you filter a list of users to find only those with specific permissions or roles. You can also chain `filter()` with the [Python enumerate() method](/posts/Python-enumerate()-Method/) to track positions of filtered elements, or combine it with the [Python map() method](/posts/Python-map()-Method/) to transform only the elements that pass a condition.

## What is Python filter() Method?

The filter() method returns an iterator where the items are filtered through a method to test if the item is true or not.

The syntax of filter() method is:

```python
filter(method, iterable)

```


## Python filter() Method Parameters


filter() method takes two parameters:

* method \- it will take a method that tests if elements of an iterable return true or false.  
* iterable \- iterable which will be filtered, can be sets, lists, tuples, or containers of any iterators


Let us see some examples of filter() method.


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