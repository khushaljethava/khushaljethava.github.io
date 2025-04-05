---
title: Dice Rolling Simulator in Python
description: This article will build a classic dice rolling simulator in python.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Dice Rolling Simulator in Python.png
 alt: Dice Rolling Simulator in Python
---

## What is a Dice Rolling Simulator in Python?

A dice rolling simulator in python is nothing but a computer game or a program that simulates the same as regular dice in which users roll dice, and a random number gets shown on the computer screen.

You can also see how to [create a mad libs game in python](https://pythonscholar.com/python-projects/mad-libs-game-in-python/) that helps you build a fun python game.

## Project Prerequisites:

In this python project, you need to know basic python. That includes.

* Python print() function  
* Python Input / Output function  
* Python loops and conditional statements  
* Python Tkinter

## What will you learn?

* End to End development of Python game.  
* Basic Input / Output implementation.  
* Python GUI Development

First, let us implement a simple implementation of the dice rolling simulator then we will jump to the advanced GUI development.

Here we will use random.randint() function generates random numbers based on the given input range.

**Step 1:** First, we import the random function and declare the necessary variable.

| import randomx \= "y" |
| :---- |

**Step 2:** We will develop a dice rolling simulator with the simple implementation of a while loop and a condition statement. 

| while x \== "y":		no \= random.randint(1,6)		if no \== 1:		print("\[-----\]")		print("\[ \]")		print("\[ 0 \]")		print("\[ \]")		print("\[-----\]")	if no \== 2:		print("\[-----\]")		print("\[ 0 \]")		print("\[ \]")		print("\[ 0 \]")		print("\[-----\]")	if no \== 3:		print("\[-----\]")		print("\[ \]")		print("\[0 0 0\]")		print("\[ \]")		print("\[-----\]")	if no \== 4:		print("\[-----\]")		print("\[ 0 0 \]")		print("\[ \]")		print("\[ 0 0 \]")		print("\[-----\]")	if no \== 5:		print("\[-----\]")		print("\[ 0 0 \]")		print("\[ 0 \]")		print("\[ 0 0 \]")		print("\[-----\]")	if no \== 6:		print("\[-----\]")		print("\[0 0 0\]")		print("\[ \]")		print("\[0 0 0\]")		print("\[-----\]")			x=input("press y to roll again and n to exit:")	print("\\n") |
| :---- |

**Explanation:** Here, we use a random function with the while loop, which will generate a number between 1 to 6 every time the user presses the y key. Then the if condition will check the number and print the dice based on the generated number.

Now let's develop a GUI program to build a dice rolling simulator in python using python tkinter.

## What is Tkinter?

Tkinter is a python package designed to develop a GUI (Graphical User Interface) program using the python programming language. It provides a very easy object-oriented interface to build a GUI program, and it can be run on most operating systems like Windows, Mac, or Linux.

So let's start by installing tkinter in our system using the below command.

| pip install tk |
| :---- |

**Step 1:** First, we will import tkinter and random libraries as we imported in the above program.

| import randomimport tkinter as tk |
| :---- |

**Step 2:** Now, we will build a primary interface of our python program using the below command.

| root \= tk.Tk()root.geometry('600x600')root.title('Roll Dice')\#label to print resultlabel \= tk.Label(root, text='', font=('Helvetica', 260))\#label to introducelabel2 \= tk.Label(root, text='Click to roll dice ', font=('Helvetica',10))label2.place(x=150,y=400) |
| :---- |

Here we are initialization tkinter with variable root, and we are using the geometry method to define the size of the GUI window. Then we are using the Label method to print the necessary label on the GUI window.

**Step 3:** we have to define a user-defined function to make the main mechanism to generate a dice rolling system. This function will be the core of our program.

| def roll\_dice():    value \= \['\\u2680', '\\u2681', '\\u2682', '\\u2683', '\\u2684', '\\u2685'\]    result=random.choice(value)    label.configure(text=result)    label.pack()    if(result=='\\u2680'):        label3=tk.Label(root,text='You rolled a one\! Click roll dice to roll again.',font=('Helvetica',10))        label3.place(x=150,y=450)    elif(result=='\\u2681'):        label3=tk.Label(root,text='You rolled a two\! Click roll dice to roll again.',font=('Helvetica',10))        label3.place(x=150,y=450)    elif(result=='\\u2682'):        label3=tk.Label(root,text='You rolled a three\! Click roll dice to roll again.',font=('Helvetica',10))        label3.place(x=150,y=450)    elif(result=='\\u2683'):        label3=tk.Label(root,text='You rolled a four\! Click roll dice to roll again.',font=('Helvetica',10))        label3.place(x=150,y=450)    elif(result=='\\u2684'):        label3=tk.Label(root,text='You rolled a five\! Click roll dice to roll again.',font=('Helvetica',10))        label3.place(x=150,y=450)    elif(result=='\\u2685'):        label3=tk.Label(root,text='You rolled a six\! Click roll dice to roll again.',font=('Helvetica',10))        label3.place(x=150,y=450) |
| :---- |

**Step 4:** We will close our program and add a button to call our user-defined function.

| button \= tk.Button(root, text='roll dice', foreground='red', command=roll\_dice)button.pack()root.mainloop() |
| :---- |

And last, we will end our program by using the mainloop() method, and tkinter will only execute when a mainloop() method is called.

Here is the GUI output of our dice rolling simulator program.

## Conclusion

This tutorial taught us to implement the basic tkinter package to develop a dice rolling simulator. We are also using the random function to auto-generate the random numbers.