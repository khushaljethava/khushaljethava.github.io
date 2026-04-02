---
title: Python next() method
description: The next() is a Python built-in method that returns the next item in an iterator.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python next() method.webp
  alt: Python next() method
---

The Python `next()` built-in function retrieves the next item from an iterator by calling its `__next__()` method. It accepts two parameters: the iterator object to advance, and an optional default value that is returned instead of raising a `StopIteration` exception when the iterator is exhausted. The function returns the next element in the sequence each time it is called, maintaining the iterator's internal position. This makes `next()` essential for lazy evaluation patterns where you process data one element at a time without loading entire datasets into memory. Real-world use cases include reading lines from large log files one at a time, consuming messages from a streaming data pipeline, implementing tokenizers that yield one token per call, and building custom iteration logic for state machines or parser combinators. The optional default parameter is particularly useful in production code where exhausting an iterator should return a sentinel value rather than crash the program.

## What does next() return?

The `next()` function returns the next item from the given iterator, or the specified default value if the iterator is exhausted and a default was provided.

## When should you use next()?

Use `next()` when you need to manually advance through an iterator one element at a time, such as when peeking at the first item of a sequence, implementing custom iteration control flow, or processing streamed data lazily without loading everything into memory.

The syntax of next() method is:

```python
next(iterator, default)

```

## next() Parameters

* **iterator** \- the name of the iterator to retrieve the next item.  
* **default** (optional) \- The default value that will return when the iterator has no next item.

## How the Python next() Function Works?

The next() function works by calling the \_\_next\_\_() method on an iterator object. An iterator is an object that returns its elements one at a time. You can create an iterator object by using the iter() function on any iterable object such as lists, tuples, sets, or dictionaries.

When next() is called on an iterator, it returns the next element in the sequence. If there are no more elements, it raises a StopIteration exception.

Here's an example that demonstrates how the next() function works:

### Example 1: How the Python next() Function Works

```python
my_list = [1, 2, 3]
my_iter = iter(my_list)

print(next(my_iter))  # prints 1
print(next(my_iter))  # prints 2
print(next(my_iter))  # prints 3
print(next(my_iter))  # raises StopIteration exception

```


Output will be as follow  
In this example, we create an iterator from my\_list using the iter() function. We then call next() four times on the iterator. The first three calls to next() return the next element in the list, and the fourth call raises a StopIteration exception because there are no more elements.


Let's check one more example of next() in python.

### Example 2: How to use python next() method?

```python
mylist = iter(["apple", "banana", "cherry"])
x = next(mylist)
print(x)
x = next(mylist)
print(x)
x = next(mylist)
print(x)

```

The output will be as follows.

```python
apple
banana
cherry

```

A list is, iterable and you can get its iterator from it by using the iter() method in Python.

## How to Use the Python next() Function

To use the next() function, you first need to create an iterator object from an iterable. You can then call next() on the iterator to get the next element in the sequence. Here's an example:

```python
my_list = [1, 2, 3]
my_iter = iter(my_list)

print(next(my_iter))  # prints 1
print(next(my_iter))  # prints 2
print(next(my_iter))  # prints 3
```

Output:

```python
1
2
3

```

## Handling StopIteration Exceptions

When working with iterators and the next() function, you need to be careful about handling StopIteration exceptions. These exceptions are raised when there are no more elements in the sequence, and they need to be caught and handled appropriately.

Here's an example that demonstrates how to catch and handle a StopIteration exception:

```python
my_list = [1, 2, 3]
my_iter = iter(my_list)

while True:
    try:
        item = next(my_iter)
        print(item)
    except StopIteration:
        break

```

In this example, we create an iterator object my\_iter from the list my\_list. We then use a while loop to iterate over my\_iter and print each element in the list. We catch the StopIteration exception using a try and except block, and exit the loop when the exception is raised.

## Common Use Cases

Peeking at the first element of an iterable is a frequent use of `next()`. For example, when reading a CSV file, you might call `next(reader)` to skip the header row before processing data rows. This pattern avoids loading the entire file and gives you immediate access to the first record.

Implementing search logic with generators is another practical application. You can combine `next()` with a generator expression to find the first element matching a condition, such as `next(x for x in users if x.active)`. Adding a default value like `next((x for x in users if x.active), None)` prevents a crash when no match is found.

Building custom iterators for state machines or parsers is a more advanced use case. By calling `next()` to advance through tokens or input characters, you gain fine-grained control over the iteration process, including the ability to pause, resume, and branch based on the current element.

To create the iterator objects that `next()` operates on, see the [Python iter()](/posts/Page-37-Python-iter/) function. For converting an iterator's remaining items into a list, the [Python list()](/posts/Page-39-Python-list/) function is a convenient companion.

## Rules of next() method

* The next() method returns the next item from the iterator.  
* If the iterator is exhausted, it returns the default value passed as an argument.  
* If the default parameter is omitted and the iterator is exhausted, it raises StopIteration exceptions.


## FAQs

### Q: What is the purpose of the next() function in Python?

A: The next() function is used to retrieve the next item from an iterator. It allows you to iterate through a sequence of values one at a time, without needing to store the entire sequence in memory.

### Q: How does the next() function work in Python?

A: The next() function works by calling the \_\_next\_\_() method on an iterator object. An iterator is an object that returns its elements one at a time. When next() is called on an iterator, it returns the next element in the sequence. If there are no more elements, it raises a StopIteration exception.

### Q: What are some common use cases for the next() function in Python?

A: One common use case for the next() function is when you want to iterate over a sequence of values one at a time, without needing to store the entire sequence in memory. This is particularly useful when working with large datasets or when dealing with streams of data.  
Another common use case for the next() function is when you want to implement a custom iterator object. You can define your own iterator class by implementing the \_\_iter\_\_() and \_\_next\_\_() methods, and then use the next() function to retrieve each element in the sequence.

### Q: How do I handle StopIteration exceptions when using the next() function in Python?

A: When working with iterators and the next() function, you need to be careful about handling StopIteration exceptions. These exceptions are raised when there are no more elements in the sequence, and they need to be caught and handled appropriately. You can catch StopIteration exceptions using a try and except block, and exit the loop when the exception is raised.


### Q: Can I use the next() function with any type of iterable object in Python?

A: Yes, you can use the next() function with any type of iterable object in Python, including lists, tuples, sets, and dictionaries. However, not all iterable objects can be used as iterators. To be used as an iterator, an object must implement the \_\_iter\_\_() and \_\_next\_\_() methods.