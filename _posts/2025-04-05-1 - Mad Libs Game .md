---
title: How to Create Mad Libs game in Python
description: In the tutorial, we will build a python project, a simple mad libs python game that is best for beginners looking to advance their python skills.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/How to Create Mad Libs game in Python.png
 alt: How to Create Mad Libs game in Python
---

## Python Mad Libs Game 

The main objective of this project is to build a mad lib game by just using core python knowledge. Here in this project, we will allow users to inputs specific words like a noun, adverb, verb, food, animal, adjective, etc., based on the given requirement. And using all the user’s inputs, a story will be generated using python.

## What are mad libs?

In simple words, MadLibs is a game in which you write a story with missing words in it; then, you can ask another player to fill in the blanks. As you are the only one who knows what’s in your story about, the result is often funny and silly.

As per [Wikipedia](https://en.wikipedia.org/wiki/Mad_Libs), “Traditional MadLibs are done with paper and ink. But now that we're in the digital age, we can recreate the game with some simple Python code, and reuse each MadLib over and over.”

## AN EXAMPLE MADLIB

## Project Prerequisites:

In this python project, you just need to know basic python. That includes.

* Python print() function  
* Python Input / Output function

## What will you learn?

* End to End development of Python game.  
* Basic Input / Output implementation.


## GETTING STARTED

To get started with the game, first, we have to write a story that we will convert into a MadLib game and then implement it in code.

To get you inspired, here’s a quick story:

Most doctors agree that bicycle of **your** is a/an **excellent** form of exercise. **And** a bicycle enables you to develop your **leg** muscles as well as **its** increase the rate of a **heart** beat. More **people** around the world **use** bicycles than drive **bikes**. No matter what kind of **person** you **are**, always be sure to wear a/an **good** helmet. Make sure to have **yellow** reflectors too\!

Which in MadLib will be as follow:

Most doctors agree that bicycle of \_\_verb\_\_  is a/an \_\_adjective\_\_ form of exercise. \_\_verb\_\_  a bicycle enables you to develop your \_\_part\_of\_body\_\_ muscles as well as \_\_adverb\_\_  increase the rate of a \_\_part\_of\_body\_\_ beat. More \_\_noun\_\_ around the world \_\_verb\_\_  bicycles than drive \_\_animals\_\_. No matter what kind of \_\_noun\_\_ you \_\_verb\_\_, always be sure to wear a/an \_\_adjective\_\_ helmet. Make sure to have  \_\_color\_\_  reflectors too\!

Now it is time to give life to our MadLib story by programming.

Step 1: Open a new file in your favorite interpreter or IDE. I go with traditional Python IDLE in the python project.

Step 2: Now, create some prompts using the python input() function to collect inputs from the users in string format.

name \= input(“Enter your name:”)

Here string between then quote will be printed only on the display screen whenever we run the program. And to get all the necessary words for our MIdlib game, we will do the same with all the required information we like to collect from the users. 

Step 3: Take input from uses and store them into python variables. Please follow the below code to take all necessary input needed for our game from the user.

| verb\_1 \= input("Enter a verb of choice, and press enter:")adj\_1 \= input("Enter a adjective of choice, and press enter:")verb\_2 \= input("Enter second verb of choice, and press enter:")body\_part \= input("Enter a body part name of choice, and press enter:")adverb \= input("Enter an adverb of choice, and press enter:")body\_part\_2 \= input("Enter any body name of your choice,and press enter:")noun \= input("Enter a noun of choice, and press enter:")verb\_3 \= input("Enter the third verb of choice, and press enter:")animal \= input("Enter name of any animal of choice, and press enter:")noub\_2 \= input("Enter an noun of choice , and press enter:")verb\_4 \= input("Enter the fourth verb of choice, and press enter:")adj\_2 \= input("Enter an adjective of chioce, and press enter:")color \= input("Enter any color name, and press enter:") |
| :---- |

So we have collected the necessary inputs from the users; now it is time to implement this input to our story using python variables. 

Here, we will implement all the collected words into our story and print them at the runtime. 

Step 4: We will use a string variable to write our story and use the ‘+’ sign before and behind each variable to specify that this is not a string but a variable; it is not that much complicated as it seems; follow the below code.

| story \= "Most doctors agree that bicycle of" \+ verb\_1 \+ " is a/an " \+ adj\_1 \+ " form of exercise." \+ verb\_2 \+" a bicycle enables you to develop your " \+ body\_part \+ " muscles as well as " \+ adverb \+ " increase the rate of a " \+ body\_part\_2 \+ " beat. More " \+ noun \+ " around the world "\+ verb\_3 \+" bicycles than drive "\+ animal \+". No matter what kind of "\+ noun\_2 \+"you "\+ verb\_4 \+ ", always be sure to wear a/an " \+adj\_2+ " helmet.Make sure to have  " \+ color \+ " reflectors too\! " |
| :---- |

Step 5: Finally, we will complete our program by printing the story using the print function.

| print(story) |
| :---- |

## Full Code 

Now let add it all together as a final program will look like this.

| verb\_1 \= input("Enter a verb of choice, and press enter:")adj\_1 \= input("Enter an adjective of choice, and press enter:")verb\_2 \= input("Enter second verb of choice, and press enter:")body\_part \= input("Enter a body part name of choice, and press enter:")adverb \= input("Enter an adverb of choice, and press enter:")body\_part\_2 \= input("Enter any body name of your choice,and press enter:")noun \= input("Enter a noun of choice, and press enter:")verb\_3 \= input("Enter the third verb of choice, and press enter:")animal \= input("Enter name of any animal of choice, and press enter:")noun\_2 \= input("Enter an noun of choice , and press enter:")verb\_4 \= input("Enter the fourth verb of choice, and press enter:")adj\_2 \= input("Enter an adjective of chioce, and press enter:")color \= input("Enter any color name, and press enter:")story \= "Most doctors agree that bicycle of" \+ verb\_1 \+ " is a/an " \+ adj\_1 \+ " form of exercise." \+ verb\_2 \+" a bicycle enables you to develop your " \+ body\_part \+ " muscles as well as " \+ adverb \+ " increase the rate of a " \+ body\_part\_2+" beat. More " \+ noun \+ " around the world "\+ verb\_3 \+" bicycles than drive "\+ animal \+". No matter what kind of "\+ noun\_2 \+"you "\+ verb\_4 \+", always be sure to wear a/an "\+ adj\_2 \+" helmet.Make sure to have  " \+ color \+ " reflectors too\! " print(story) |
| :---- |

## Time to Play\!

So let run our program and test our project by executing the program.

### The output of the project

| Enter a verb of choice, and press enter: yourEnter an adjective of choice, and press enter: excellentEnter the second verb of choice, and press enter: andEnter a body part name of choice, and press enter: legEnter an adverb of choice, and press enter: itsEnter any body name of your choice, and press enter: heartEnter a noun of choice, and press enter: peopleEnter the third verb of choice, and press enter: useEnter name of any animal of choice, and press enter: bikesEnter a noun of choice, and press enter: personEnter the fourth verb of choice, and press enter: areEnter an adjective of choice, and press enter: goodEnter any color name, and press enter: yellowMost doctors agree that bicycle of your is a/an excellent form of exercise. And a bicycle enables you to develop your leg muscles as well as its increase the rate of a heart beat. More people around the world use bicycles than drive bikes. No matter what kind of person you are, always be sure to wear a/an good helmet. Make sure to have  yellow reflectors to |
| :---- |

We hope you guys had fun learning this project, and you can see how we have implemented a simple story into a beautiful game.

Have Fun and Happy pythoning

### Download Python Mad Libs Generator Code

Github link here