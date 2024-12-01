---
title: Python Comments

description: This tutorial will learn about documenting and commenting on the python code using python comments and python docstring.


date: 2024-11-27 11:33:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Comments.png
  alt: Python Comments
---

## Python Comments

It is tough to remember every variable’s names, functions names, and class names when we have a hundred-page program or so. Therefore, making use of comments will make it very easy for you or someone else to read and modify the code.

## Type of Comments in python.

 There are two types of comments Single-line comments and multiline comments, which are available in python, or we can say which are available in every programming language.

## Single Line Comment:

A single-line comment is used by adding a hash sing (\#) at the beginning of a text or a string statement.

```python
# This is a single-line comment
```

Example Code:

```python
print("This is A String ")
# This is Comment
```

Output:

```python
This is A String
```

As we can see only, the print function is executed, and the comment was not printed on the output. We can add comments in the code, but this is not the only method to add single-line comments. We can also add comments after our function or end of the code.

Example Code:

```python
#Heading

print("String start from here") #And Ends here

#Closeing comment
```

Output:

```python
Staring start from here
```

## Multi-line comment in python

We can create a python multi-line comment by adding a delimiter  ("") on the starting and end of the statement.

```python
"""
This is a multi-line comment.
Using python, and it will not be printed. 
At the runtime
"""
```
Example Code:

```python
print("Hello World")
"""
This is a multi-line comment
Using python, and it will not be printed.
"""
```

Output:

```python
Hello World
```

## Multiple Python Comments

We can add multiple comments in a single program or code.

```python
# This is Header

"""
We are going to 
Print hello world
"""
print("Hello World") # This is a print function

"""
Here we will print 
Other print function
"""

print("It is Python comment") # Print function to print It is python comment 

# This is Footler
```

## Why Comments is used in Python.

Comments in Python are used to explain code and what it does. They are meant as documentation for anyone reading the code.

# 

## Python Docstrings 

Python docstrings or Documentation strings are a string used in the class, module, function, or method definition. 

As like multiline comment, docstring is also declared using three (‘’’) or four (“””). For example   
**‘’’ triple single quotes ‘’’** or **“”” triple double quotes ”””**

Docstrings are accessible from the doc attribute (\_\_doc\_\_)   for any of the Python objects and built-in functions. Docstrings are great for understanding the functionality of the more extensive code of the project.

Example of Code:

```python
def addition(n):
		''' This is a docstrings example we have added in addition function '''
		return n+n

print(addition.__doc__)

```

To run this docstring code, we have to follow this step.

```python
print(addition.__doc__)
```
Here the output of string literal.

Output

```python
	This is a docstrings example we have added in the addition function. 
```

Here, we have documented our addition function, and then we are accessing it with the \_\_doc\_\_ attribute.  
 We can learn more about python docstring from here. (Link to Python docstring page).

## Tips:

* Remember to comment as often as possible.

* Mainly used single-line comment after the code, so it will be easy to read code for others.  
    
* Comments don’t mess up with the code, so it is essential to add as many comments as possible for documentation.  
* The first includes comments that detail or indicate what a section of code – or snippet – does.  
* Think of the first type as a comment for yourself and the second as a comment for others.  
* Always go through the official python comments documentation

## FAQs

**Question:**How to make Comment in python?

**Answer:**In python we can use \# hashtag special characters to make comments in python in addition to that we can use triple single quotes or triple double quotes to make multiple line comments.

**Question:**How to print comments from a program in python?

**Answer:**Unfortunately, comments are developed in such a way that all the programming languages will ignore them.

In Python, we can't print any comments using any program or comments.

**Question:**What is a python comments shortcut?

**Answer:**In most IDE’s like Pycharm, VS code, Jupyter Notebook, etc we can use “Ctrl \+ / “ for inline comments or for multiple line comments

**Question:**What are the types of comments in python?

**Answer:**There are only two types of python comments.

1. Single line or inline comments  
2. Multiline comments

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How to make Comment in python?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "In python we can use # hashtag special characters to make comments in python in addition to that we can use triple single quotes or triple double quotes to make multiple line comments."
    }
  },{
    "@type": "Question",
    "name": "How to print comments from a program in python?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Unfortunately, comments are developed in such a way that all the programming languages will ignore them.

In Python, we can't print any comments using any program or comments."
    }
  },{
    "@type": "Question",
    "name": "What is a python comments shortcut?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "In most IDE’s like Pycharm, VS code, Jupyter Notebook, etc we can use “Ctrl + / “ for inline comments or for multiple line comments"
    }
  },{
    "@type": "Question",
    "name": "What are the types of comments in python?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "There are only two types of python comments.
1- Single line or inline comments
2- Multiline comments"
    }
  }]
}
</script>