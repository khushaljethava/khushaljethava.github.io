---
title: Pig Game in Python
description: This project will learn about a very easy-to-build computer pig game in python.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Pig Game in Python.png
 alt: Pig Game in Python
---

## Project Prerequisites:

In this python project, you need to know basic python. That includes.

* Python print() function  
* Python Input / Output function  
* Python Loops  
* Python Conditions Statements

## What will you learn?

* How to invent your own computer games with python  
* End to End development of Python games.  
* Basic Input / Output implementation.

## What is a pig game(Dice Game)?

A [Pig is a dice game](https://en.wikipedia.org/wiki/Pig_\(dice_game\)) that first appeared in print in John Scarne in 1945\. It is believed that the pig game was pirates as a part of gambling. 

## How to Play the pig game?

This game can be played using one or two dice together with two or more people.   
It's a very simple rule, the Player has to roll the dice, and if the total number of turns is ten, players have to roll the dice ten times. The score or each roll has to be total in the end, and if the player rolls a number 1, it will be on hold, and player 2 get the chance to roll dice ten times or until it rolls number 1\.

At the end of the game, the player with the highest score wins the game.

Or in we can also play like the player who scores 100 points first wins the game.

So let's get started with coding pig game python.

## How to build a pig Game in Python

Follow the below steps to build a pig game in python.

**Step 1:** Firstly, we will import the necessary libraries and declare the required variables.

| import randomUser\_Total \= 0Computer\_Total \= 0Total\_Turn \= 10Number\_Of\_Turns \= 0Computer\_Turns \= 0 |
| :---- |

**Step 2:** Now, we will declare two functions for randomly generated numbers from 1 to 10, one for the user and one for the computer.

| def UserTurn():    roll \= random.randint(1,10)    return rolldef ComputerTurn():    roll \= random.randint(1,10)    return roll |
| :---- |

**Step 3:** We implement a while loop that will execute ten times in this step. And inside the while loop, we will get users and computer roll scores.

| while Number\_Of\_Turns \<= Total\_Turn:    UserScore \= UserTurn()    if UserScore \!= 1:        User\_Total \= User\_Total \+ UserScore        Number\_Of\_Turns \= Number\_Of\_Turns \+ 1    elif UserScore \== 1:        while(Computer\_Turns \<= Total\_Turn):            ComputerScore  \= ComputerTurn()            if ComputerScore \!= 1:                Computer\_Total \= Computer\_Total \+ ComputerScore                Computer\_Turns \= Computer\_Turns \+ 1            else:                break |
| :---- |

Inside the while loop, we have implemented a condition to check the roll number; the first user will get the chance to roll, and it will check if the user has rolled one, then the computer will get an opportunity to roll the dice.

**Step 4:** This is the last step where we will check who is the winner of the game by using the if condition statement by checking who scores more than the other.

| if User\_Total \> Computer\_Total:    print("User Has Won")    print("The User Score has {}, and the Computer has Score {}".format(User\_Total,Computer\_Total))elif Computer\_Total \> User\_Total:    print("Computer Has Won")    print("The User Score has {}, and the Computer has Score {}".format(User\_Total,Computer\_Total))else:    print("Match has Draw with User Score: {}, and the Computer Score: {}".format(User\_Total,Computer\_Total)) |
| :---- |

Now let run the game and see the outputs of the game.

Output 1:

User Has Won  
The User Score has 78, and the Computer has Score 36

Output 2:

Computer Has Won  
The User Score has 60, and the Computer has Score 69

Output 3:

Match has Draw with the User Score: 74 and Computer Score: 74

So, at last of python pig game is ready, and it's working fine; for better learning, you must start experiments with this code and improve it.

## Summary

We have to develop a simple game using simple user define functions and conditions. And saw how a python dice game with functions could be developed

## FAQ.

How do you play the game Pig dice?  
Pig dice games can be played with one or two dice and two or more people rolling dice. If roll gets one another player gets the opportunity to roll, and if other players get 1 in roll again, user one gets the opportunity to roll and the player to reach 100 points wins the game.

How do you make a dice game in Python?

Dice games in python can be made using functions and loops to achieve many rolls and turn and conditional statements to check the user's total and computer totals.