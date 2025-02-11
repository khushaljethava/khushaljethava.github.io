---
title: Python String
description: In this tutorial, we will learn about python string, Manipulating strings in python, and all its functions. Also, we will understand all the string operations which we can perform on python.
date: 2024-12-16 12:18:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python String.png
  alt: Python String

---



## What is a string in Python?

A String is a simple sequence of characters, like a simple text you see here. However, python doesn’t have data type characters like other programming languages.

## Assign String to a Variable

Strings in Python can be assigned by either single quotation marks or double quotation marks.

Python String Syntax:

Python strings syntax can be declared using the following method.  Assigning a string to a variable can be done with a variable name followed by an equal sign and a string inside a single quote or in double quotes.

```python 
Variable_Name = 'String_Here'

Varibale_Name  = "String_Here"

Variable_Name = str(String / Number )
```

Let's check a simple example of string in python.

Example 1:

```python
X = "Python"
Y = 'Google'
print(X)
print(Y)
```

The output of the above program is:

```python
Python
Google
```
Let see an example of the Type conversion of string.

```python
X = str(200)

print(X)

print(type(X))
```

Output:

```python
200
<class 'str'>
```

## Multiline Strings in Python

We can add multiline strings in python using three single quotes just like multiline comments, but unlike comments, we assign it to a variable. 

```python
X = '''Python is a general-purpose interpreted,
        interactive language that supports
        object-oriented programming. It
        is a high-level programming language.
        '''
print(X)
```

When we run the above program, we will get this result.

```python
Python is a general-purpose interpreted,
        interactive language that supports
        object-oriented programming. It
        is a high-level programming language.
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
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
As we can see, we have printed multiline the same as inside the code with the same format.

## Accessing the string as Arrays

As we learn string is nothing but the sequences of characters, we can access individual characters in the string just like we do in arrays in other programming languages. 

### What is an array?

Arrays are used to store multiple values in a single variable in programming languages like c,c++, or java, just like we do in a python list. 

We can work on arrays using one of the most popular python libraries called Numpy.

How to access characters in Python String?

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
The characters or an element can be accessed by square brackets \[ \] in python because a single character is a string with a length of 1\.

Syntax

```python
Variable_name = String
String[Index]
```

![][image1]

Let see an example of how to access a string by index.

Example

```python
X = "This is an String"

print(X[1])

print(X[4])

print(X[-3])
```

The output of this program

```python
h
 
i
```
Here we can see that based on indexes, we can print the individual characters. One important thing we can see here is a space between h  and I because space is also counted as a character in python, and on the fourth index in our string is a space, so it is printing a space only but in is null, so we cannot see it but the computer can.

## Slicing of a String

Slicing of a string in python is a slice or to obtain respective elements from start to end.

Python slicing can be done in two ways.

* Extending Indexing  
* slice() Constructor

### Slicing of a string using extending index

Compared to other programming languages, slicing the string is very easy in Python; unlike C, C++ and java require many lines of code to slice a string in python, it can be done with only one line of code. 

Let's check the syntax of string slicing.

```python
String[start:end:step]
```

As we can see, this syntax is the same as we learn in the range function. Well, in the range function, we are using comma(,) in parameters in the string we are using a colon (:) here.

Let see an example here.

```python
String = "I Love Python Programming"

print(String[:3])  # Starting from index zero end at index 3

print(String[2:14]) # Index start at 2 and ends at 7

print(String[-10:-1]) # Index start from negative 2 to negative 7

print(String[2:10:2]) # Here Index is starting at 2 and end at 10 and taking 2 steps in string
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
<script type="text/javascript" src="//www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
Output 

```python
I L
Love Python 
rogrammin
Lv y
```

By using some tweaks, we can reverse a string just by changing one thing.

```python
String = "I Love Python Programming"

print(String[::-1])  # Two colons with a start of negative 1 
```

Output:

```python
gnimmargorP nohtyP evoL I

```

We can learn about the slice function here.(Link to slice())

## Merging of Strings

In Python, we can quickly join two or more strings into a single string called the concatenation of two or more strings.

We can merge two strings using the \+ operation. Just like the addition of two integers, we can add two strings. 

Syntax  

```python
String3 = String1 + String2

```

Let understand concatenation with an example.

```python
String1 = "This is First String"

String2 = "This is second String"

String3 = String1 + String2

print(String3)


print("We can add a simple string by adding ", String1 + String2) 
```

When we run this program, we get.

```python
This is First StringThis is second String
We can add a simple string by adding  This is First StringThis is second String
```

The \* operator is used to multiple the string to itself with the given number.

Let’s see a demo using the following program.

```python
String = "Python"

print(String * 4)
```

Output:

```python
PythonPythonPythonPython

```

As you can see, String has repeated itself by 4 times.

## Using Loop in String

As we have learned that strings are a sequence of characters, we can loop through the characters in a string with a for a loop.

Let's check an example of a loop in the string.

```python
String = "Python"

for variable in String:
    print(variable)
```

Output:

```python
P
y
t
h
o
n
```

## Check String

Python comes with wonderful and powerful features to check whether a particular word or a string is present in a group of sentences.

Here we are using if conditional statement within keyword.

See the example.

```python
String = "We are using Python and we love Python"

if "love" in String:
    print("Word 'love is present in a string")
```

See the output:

```python
Word 'love is present in a string
```

Let’s see an example with a word not present in a string.

```python
String = "We are using Python and we love Python"

if "Java" in String:
    print("Word 'Java' is present in a string")
```

The output will be as follows.

```python
   
```

As you can see, we are not getting any output as word Java is not present in a string, so it’s not returning any result.

The same code can be written in a single line also.

```python
String = "We are using Python and we love Python"

print("Python" in String)
```
Output:

```python
True

```

In the same way, we can also use not keyword

```python
String = "We are using Python and we love Python"
print("Python" not in String)
```

Output:

```python
False
```

## Calculate the length of a String

We can also find the length of a string using python.

Here we are using the len() function, and you can learn more about the len() function here.  
Example 

```python
String1 = "Python"

String2 = "Python is a funny language."

print(len(String1))

print(len(String2))
```

Output:

```python
6
26
```

Python Comes with a different set of built-in methods and functions that can be used on strings. All string methods return new values. They do not change the original string.

| Method | Description |
| :---- | :---- |
| capitalize() | Converts the first character to uppercase |
| casefold() | Converts string into lower case |
| center() | Returns a centered string |
| count() | Returns the number of times a specified value occurs in a string |
| encode() | Returns an encoded version of the string |
| endswith() | Returns true if the string ends with the specified value |
| expandtabs() | Sets the tab size of the string |
| find() | Searches the string for a specified value and returns the position of where it was found |
| format() | Formats specified values in a string |
| format\_map() | Formats specified values in a string |
| index() | Searches the string for a specified value and returns the position of where it was found |
| isalnum() | Returns True if all characters in the string are alphanumeric |
| isalpha() | Returns True if all characters in the string are in the alphabet |
| isdecimal() | Returns True if all characters in the string are decimals |
| isdigit() | Returns True if all characters in the string are digits |
| isidentifier() | Returns True if the string is an identifier |
| islower() | Returns True if all characters in the string are lower case |
| isnumeric() | Returns True if all characters in the string are numeric |
| isprintable() | Returns True if all characters in the string are printable |
| isspace() | Returns True if all characters in the string are whitespaces |
| istitle() | Returns True if the string follows the rules of a title |
| isupper() | Returns True if all characters in the string are upper case |
| join() | Joins the elements of an iterable to the end of the string |
| ljust() | Returns a left-justified version of the string |
| lower() | Converts a string into lower case |
| lstrip() | Returns a left trim version of the string |
| maketrans() | Returns a translation table to be used in translations |
| partition() | Returns a tuple where the string is parted into three parts |
| replace() | Returns a string where a specified value is replaced with a specified value |
| rfind() | Searches the string for a specified value and returns the last position of where it was found |
| rindex() | Searches the string for a specified value and returns the last position of where it was found |
| rjust() | Returns a right-justified version of the string |
| rpartition() | Returns a tuple where the string is part into three parts |
| rsplit() | Splits the string at the specified separator, and returns a list |
| rstrip() | Returns a right trim version of the string |
| split() | Splits the string at the specified separator, and returns a list |
| splitlines() | Splits the string at line breaks and returns a list |
| startswith() | Returns true if the string starts with the specified value |
| strip() | Returns a trimmed version of the string |
| swapcase() | Swaps cases, the lower case becomes the upper case and vice versa |
| title() | Converts the first character of each word to uppercase |
| translate() | Returns a translated string |
| upper() | Converts a string into upper case |
| zfill() | Fills the string with a specified number of 0 values at the beginning  |

[image1]: <data:image/png;base64,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>