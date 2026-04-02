---
title: Python all() Method
description: In this tutorial, we will learn about the python all() method and how we can use it.
date: 2024-12-26 21:06:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python all() Method.png
  alt: Python all() Method

---

Python's `all()` function tests whether every element in an iterable is truthy. It accepts a single argument -- any iterable such as a list, tuple, set, dictionary, or generator -- and returns `True` only if all elements evaluate to `True` under Python's standard truth-testing rules. If even one element is falsy (such as `0`, `False`, `None`, or an empty string), `all()` returns `False`. Notably, `all()` returns `True` for an empty iterable, since there are no elements that could be false. This function is the logical counterpart of [Python any()](/posts/Python-any()/), which returns `True` if at least one element is truthy. `all()` is widely used for data validation (ensuring all fields pass a check), precondition testing (verifying all requirements are met before proceeding), and filtering logic. It short-circuits evaluation, meaning it stops iterating as soon as it encounters the first falsy value, making it efficient even on large iterables.

## What does all() return?

The `all()` function returns `True` if every element in the iterable is truthy, or if the iterable is empty. It returns `False` as soon as any falsy element is found.

## When should you use all()?

Use `all()` when you need to confirm that every item in a collection meets a condition. Common scenarios include validating that all form fields are filled in, checking that all test cases pass, or verifying that all values in a dataset are within an expected range.

The all()  is a built-in Method available in python, which will return True when all the elements in the given iterable are true. If any null value is present in iterable, it will return false.

An empty iterable will return True in the all() function.

The syntax of all() function is :

```python
all(iterable)
```

## Python all() Parameters

The all() method will take a single argument as an iterable, including list, tuple, set, dictionary, string, and loop in python.


Let's see an example of all() method.

Example 1: How to use all() in lists?

```python
my_list = [1,2,3,4,5]
print(all(my_list))

my_list = [0,False]
print(all(my_list))

my_list = [0,1,2,3,4,5]
print(all(my_list))

my_list = [0,False,1]
print(all(my_list))

my_list = []
print(all(my_list))
```

Output:

```python
True
False
False
False
True
```

The all() method will work similarly for types and sets like the list in python.

Example 2 : How to use all() on strings?

```python
my_string = "This is Python"
print(all(my_string))

my_string = ""
print(all(my_string))
```

The output will be as follows.

```python 
True
True
```


Example 3: How to use all() on dictionaries?

```python
my_dict = {1:True}
print(all(my_dict))

my_dict = {0:False}
print(all(my_dict))

my_dict = {0:'False',1:'True'}
print(all(my_dict))

my_dict = {0:'False'}
print(all(my_dict))

my_dict = {}
print(all(my_dict))
```

The Output will be as follows.

```text
True
False
False
False
True
```


In dictionaries, it is all the keys, not the values are true, or the dictionary is empty, then all() will return True otherwise, it will return false for all other cases.

## Common Use Cases

**Validating that all required form fields are filled.** When processing user input with multiple fields, `all([name, email, password])` quickly checks that none of the required values are empty or `None` before proceeding with further validation.

**Checking preconditions before executing a task.** In automation scripts or pipelines, you can verify that all required conditions are met: `all([file_exists, has_permissions, disk_space_ok])` ensures the environment is ready before starting a potentially destructive operation.

**Ensuring data quality in a dataset.** When processing rows of data, `all(row['score'] > 0 for row in dataset)` confirms that every record has a positive score, helping catch data quality issues early.

## Related Functions

* [Python any()](/posts/Python-any()/) -- return `True` if at least one element is truthy.
* [Python bool()](/posts/Python-bool()/) -- convert a single value to Boolean.
* [Python len()](/posts/Page-38-Python-len()/) -- count the number of elements in an iterable.
