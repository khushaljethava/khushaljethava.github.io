---
title: Python compile() Method
description: In this tutorial we will learn about the python compile() method and its uses.
date: 2025-01-03 23:24:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python compile() Method.png
  alt: Python compile() Method

---

The compile() method in python code objects from the source can be a normal string, a byte string, or an AST object.

The syntax of compile() is:

```python
compile(source, filename, mode, flags=0, dont_inherit=False, optimize=-1)
```
## Python compile() Method Parameters

<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
* source \- A simple string, a byte string, or an AST object.  
* filename \- The name of the file from the code comes from. If the code does not come from a file you can write anything you like.  
* mode \- Legal values can be eval, or exec, or single.  
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
  * eval \- Accepts only a single expression.  
  * exec \- It can take a code block with a python statement, class, and methods, etc.  
  * single \- if it consists of a single interactive statement.  
* flags \- How to compile the source. The default will be  0\.  
* don't-inherit \- How to compile the source. Default False  
<script type="text/javascript">
	atOptions = {
		'key' : 'f934c5057f4cfe34762901514605d248',
		'format' : 'iframe',
		'height' : 180,
		'width' : 800,
		'params' : {}
	};
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/f934c5057f4cfe34762901514605d248/invoke.js"></script>
* optimize \- Defines the optimization level of the compiler. Default \-1 

The compile() method is used if the python code is in simple string form or is an AST object, and if you want to change it to a code object.

Let us see an example of the usage of compile() method.

### Example 1: How to use compile() method?

```python
codeWithString = 'x = 7\ny=12\nsum=x+y\nprint("sum =",sum)'
CodeObject = compile(codeWithString,'substring','exec')
exec(CodeObject)
print(type(CodeObject))

```

Output will be as follow:

```python
sum = 19
<class 'code'>
```

Here we are taking a simple string as a source. And the filename is sumstring. After that, we are taking exec mode that allows us the usage of exec() method.

As we can see, it showing class code when we are checking its type.

In simple words compile() method can convert the simple string to a python code object. The code object can be executed using the exec() method.

### Example 2: How to use compile() method with eval()?

Let see an example to use the compile() method to execute the code using the eval() method.

```python
X = 10

CodeEx = compile('X  == 10','','eval')
CodeObject = eval(CodeEx)
print(CodeObject)

CodeEx = compile('X  + 10','','eval')
CodeObject = eval(CodeEx)
print(CodeObject)
```

The output will be as follow:

```python
True
20
```

### Example 3: How to use compile() method byte string source?

Let take an example of using byte string as source in compile() method.

```python
x = 10
byte_string = bytes('x == 10','utf-8')
CodeObject = compile(byte_string,'','eval')
result = eval(CodeObject)
print(result)
print(type(byte_string))
```

Output:

```python
True
<class 'bytes'>
```

## Rules of compile() method

compile() method returns objects as python code object.