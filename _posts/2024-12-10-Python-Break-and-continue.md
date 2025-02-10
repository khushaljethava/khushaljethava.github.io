---
title: Python Break and Continue 
description: This tutorial will learn about python break and continue statements and use them in loops and conditional statements.
date: 2024-12-10 10:27:00 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Python Break and Continue .png
  alt: Python Break and Continue 

---

## Python break

Break statement in python is used to terminates the current loop and resumes the execution statements. With the break statement, we can stop the loop before it has looped through all the items:

Break Python syntax

``python
break 
```

### Break statement in for loop

We can use break statements in for loops to exit the current loop, which will terminate the loop’s flow.

Example of the break in python

```python
# Program will use break statement in the list

# List of numbers
numbers = [6, 5, 3, 8, 4, 2, 5, 4, 11]


# iterate over the list
for val in numbers:
	print(val)
	break 	
```

The output of the break statement program.

```python
6
```

### Python break statement in if else conditional statements 

We can also use the python break function in if else, conditional statement, which will break the conditions’ flow. 

Let see an example of a break in conditional statements.

```python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  if x == "banana":
   break
  print(x)
```

The output will be as follows.

```python
apple
```

Here the above program will print items in the list one by one. Still, inside the for loop, we have implemented a condition with if the value is banana, then break statement will call which will break the loop, and the flow will be exited so that only one item is printing.

## Python continue

The continue statement in python will end the current loop and condition without exiting the main loop; it will end the loop’s current iteration and start the next iteration.

Continue python syntax

```python
continue 
```

### Python continue Statement in for loop with if conditional statement.

With the continue statement, we can stop the current iteration of the loop and continue with the next:

Example of continue in python.

```python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  if x == "banana":
    continue
  print(x)
```
The output of the continue statement.

```python
apple
cherry
```

Here we are implementing the if conditional statement inside the for loop, and in the if conditional statement, we are using the continue statement.

The if continental statement is given x equal to banana if the for-loop item will be banana, then if the conditional statement is executed, the continue statement and loop will be skipped so that it is not printing the item banana.

## FAQs

**Quesion:** What is difference between break and continue in Python?

**Answer:** There is a huge difference between the break and continue statement because break is used to terminate the iterator of the program but on the hand continue will just skip the current loop or iterator.

**Quesion:** What is the difference between break and continue in while loop in Python?

**Answer:** In Python, the while loop break statement will break the while loop execution and the continue statement will just skip the current execution.

**Quesion:** What is break continue and pass in Python with example?

Here are some examples of break continue and pass statements on pythonscholar.com

**Quesion:** Why do we need break and continue in Python?

**Answer:** Break and continue statements are very important parts of python programming language and these are used with conditional statements, for example, it will break the execution when a certain condition gets fulfilled or it will skip the blow execution when a certain condition is not fulfilled.

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4181667199679058"
     crossorigin="anonymous"></script>

<!-- FAQ Scheme -->

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is difference between break and continue in Python?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "There is a huge difference between the break and continue statement because break is used to terminate the iterator of the program but on the hand continue will just skip the current loop or iterator."
    }
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
  },{
    "@type": "Question",
    "name": "What is the difference between break and continue in while loop in Python?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "In Python, the while loop break statement will break the while loop execution and the continue statement will just skip the current execution."
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
    }
  },{
    "@type": "Question",
    "name": "What is break continue and pass in Python with example?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Here are some examples of break continue and pass statements on pythonscholar.com"
    }
  },{
    "@type": "Question",
    "name": "Why do we need break and continue in Python?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Break and continue statements are very important parts of python programming language and these are used with conditional statements, for example, it will break the execution when a certain condition gets fulfilled or it will skip the blow execution when a certain condition is not fulfilled."
    }
  }]
}
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
</script>