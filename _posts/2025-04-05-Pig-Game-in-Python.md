---
title: Pig Game in Python
description: This project will learn about a very easy-to-build computer pig game in python.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
  path: /commons/Pig Game in Python.webp
  alt: Pig Game in Python
---

## Introduction

Building games is one of the most enjoyable ways to learn programming. Games require you to think about logic, user interaction, randomness, and flow control — all core programming concepts. The Pig Game is a perfect beginner project because its rules are simple, the code is short enough to understand in a single sitting, and the finished product is actually fun to play.

In this tutorial you will build a fully functional two-player Pig Game (user versus computer) in Python. You will learn how to use the `random` module, how to structure a game loop with `while`, how to write your own functions, and how to check conditions to determine a winner.

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
* How to use Python's `random` module to simulate dice rolls.
* How to write reusable functions that encapsulate game logic.
* How to design a turn-based game loop using `while`.

## What is a Pig Game (Dice Game)?

A [Pig is a dice game](https://en.wikipedia.org/wiki/Pig_(dice_game)) that first appeared in print in John Scarne in 1945. It is believed that the pig game was used by pirates as a part of gambling.

The game is popular in classrooms because its rules are so simple that anyone can understand them in under a minute, yet it produces genuinely competitive outcomes.

## How to Play the Pig Game?

This game can be played using one or two dice together with two or more people.

The rules are simple:

1. Players take turns rolling a die.
2. On each turn a player may roll as many times as they like, accumulating the sum of all rolls as their turn score.
3. If a player rolls a **1**, their entire turn score is lost, and the turn passes to the next player.
4. A player may choose to **hold** (bank their turn score) at any time. The turn score is added to their total, and play passes to the next player.
5. The first player to reach **100 points** wins.

In our Python version we will simplify this slightly: each player (user and computer) gets exactly **10 turns** of rolling a die that produces a value between 1 and 10. Rolling a 1 ends that player's turn immediately.

At the end of 10 turns for each side, the player with the higher total wins.

So let's get started with coding the Pig Game in Python.

## How to Build a Pig Game in Python

Follow the below steps to build a pig game in python.

### Step 1: Import libraries and declare variables

Firstly, we will import the `random` library (needed to simulate dice rolls) and declare all the variables that will track game state.

```python
import random

# Running totals for the user and computer across all turns
User_Total = 0
Computer_Total = 0

# Each player gets exactly 10 turns
Total_Turn = 10

# Counters that track how many turns each player has used
Number_Of_Turns = 0
Computer_Turns = 0
```

**Why `random`?**  
The `random` module is part of Python's standard library. `random.randint(a, b)` returns a random integer N such that `a <= N <= b`. We use it to simulate a fair die roll between 1 and 10.

### Step 2: Define roll functions for the user and the computer

We create two separate functions — one for the user's roll and one for the computer's roll. Both do the same thing (generate a random number between 1 and 10), but keeping them separate makes the code easier to read and extend later.

```python
def UserTurn():
    """Simulate a single dice roll for the user (1 to 10)."""
    roll = random.randint(1, 10)
    return roll

def ComputerTurn():
    """Simulate a single dice roll for the computer (1 to 10)."""
    roll = random.randint(1, 10)
    return roll
```

Note that the `return` statement must be **indented inside the function body** (4 spaces). A common beginner mistake is to place `return` at the module level, which causes an `IndentationError`.

### Step 3: Implement the game loop

Now we implement the main game loop. The user rolls first for up to `Total_Turn` turns. Each time the user rolls, we check whether the result is 1. If it is 1, the user's turn ends and the computer takes its full set of turns.

```python
while Number_Of_Turns <= Total_Turn:
    # --- User's roll ---
    UserScore = UserTurn()
    print("User rolled:", UserScore)

    if UserScore != 1:
        # Normal roll: add it to the user's running total
        User_Total = User_Total + UserScore
        Number_Of_Turns = Number_Of_Turns + 1

    elif UserScore == 1:
        # User rolled a 1 — turn over, computer plays its full set of turns
        print("User rolled a 1! Computer's turn now.")
        while Computer_Turns <= Total_Turn:
            ComputerScore = ComputerTurn()
            print("Computer rolled:", ComputerScore)

            if ComputerScore != 1:
                # Normal roll: add to computer's running total
                Computer_Total = Computer_Total + ComputerScore
                Computer_Turns = Computer_Turns + 1
            else:
                # Computer rolled a 1 — end computer's turn
                print("Computer rolled a 1! Back to user.")
                break
        # After the computer finishes, exit the outer loop too
        break
```

**How this works:**  
The outer `while` loop runs as long as `Number_Of_Turns <= Total_Turn` (i.e., the user still has turns left). Inside, we call `UserTurn()` and evaluate the result. If the user rolls a 1, control enters the `elif` block, which starts an inner loop giving the computer its 10 turns. The inner `break` exits the computer's loop when it rolls a 1. The outer `break` after the inner loop ensures the user's loop also ends cleanly.

### Step 4: Determine the winner

After all turns are completed, we compare the two totals and announce the result.

```python
if User_Total > Computer_Total:
    print("User Has Won!")
    print("The User Score: {}, Computer Score: {}".format(User_Total, Computer_Total))

elif Computer_Total > User_Total:
    print("Computer Has Won!")
    print("The User Score: {}, Computer Score: {}".format(User_Total, Computer_Total))

else:
    print("Match has Draw with User Score: {}, and Computer Score: {}".format(User_Total, Computer_Total))
```

### Complete Program

Here is the entire game in one clean block for easy copying:

```python
import random

User_Total = 0
Computer_Total = 0
Total_Turn = 10
Number_Of_Turns = 0
Computer_Turns = 0

def UserTurn():
    """Simulate a single dice roll for the user (1 to 10)."""
    roll = random.randint(1, 10)
    return roll

def ComputerTurn():
    """Simulate a single dice roll for the computer (1 to 10)."""
    roll = random.randint(1, 10)
    return roll

while Number_Of_Turns <= Total_Turn:
    UserScore = UserTurn()
    print("User rolled:", UserScore)
    if UserScore != 1:
        User_Total += UserScore
        Number_Of_Turns += 1
    elif UserScore == 1:
        print("User rolled a 1! Computer's turn now.")
        while Computer_Turns <= Total_Turn:
            ComputerScore = ComputerTurn()
            print("Computer rolled:", ComputerScore)
            if ComputerScore != 1:
                Computer_Total += ComputerScore
                Computer_Turns += 1
            else:
                print("Computer rolled a 1!")
                break
        break

if User_Total > Computer_Total:
    print("User Has Won!")
    print("User Score: {}, Computer Score: {}".format(User_Total, Computer_Total))
elif Computer_Total > User_Total:
    print("Computer Has Won!")
    print("User Score: {}, Computer Score: {}".format(User_Total, Computer_Total))
else:
    print("It's a Draw!")
    print("User Score: {}, Computer Score: {}".format(User_Total, Computer_Total))
```

## Sample Outputs

**Output 1 — User wins:**

```text
User Has Won!
The User Score has 78, and the Computer has Score 36
```

**Output 2 — Computer wins:**

```text
Computer Has Won!
The User Score has 60, and the Computer has Score 69
```

**Output 3 — Draw:**

```text
Match has Draw with the User Score: 74 and Computer Score: 74
```

## How It Works — The Big Picture

The game follows a straightforward flow:

1. **Initialise** — set all counters to zero.
2. **User loop** — keep rolling until the user uses all 10 turns or rolls a 1.
3. **Computer loop** — if the user rolls a 1, the computer immediately gets its 10 turns.
4. **Resolve** — compare totals and print the winner.

This structure uses two nested `while` loops and demonstrates how program control flow can model real-world turn-based interactions.

## Customisation Ideas

1. **Interactive hold/roll decisions** — let the user choose each turn whether to roll again or hold, making it a true interactive game.
2. **Two human players** — replace the computer loop with a second player's loop and ask each player to press Enter when they are ready to roll.
3. **Graphical dice** — print ASCII art dice faces based on the roll number to make the output more visual.
4. **Configurable target score** — ask the user to set a winning score (e.g., 50, 100, or 200) at the start of the game.
5. **High score tracker** — use a file to persist the top 5 scores across multiple game sessions.

## Common Errors and Fixes

**Error 1: `IndentationError` inside functions**  
The `return` statement must be indented at the same level as the body of the function.  
Fix: indent `return roll` by exactly 4 spaces inside the function body.

**Error 2: `NameError: name 'random' is not defined`**  
You forgot to import the `random` module.  
Fix: add `import random` at the very top of your script.

**Error 3: The game never ends**  
If you forget to increment `Number_Of_Turns` inside the loop, the outer `while` condition is never satisfied and the loop runs forever.  
Fix: make sure `Number_Of_Turns += 1` executes inside the loop body for every successful roll.

**Error 4: Both totals remain 0**  
This usually means the score-accumulation lines are outside the loop or not reached due to incorrect indentation.  
Fix: trace the indentation carefully and ensure the accumulation lines are inside the correct `if` block.

## FAQ

**Q1: How do you play the Pig dice game?**  
A: Pig dice can be played with one or two dice and two or more players. On each turn a player rolls and accumulates points. Rolling a 1 forfeits the turn score. A player may hold at any time to bank their turn score. The first player to reach 100 points wins. In our Python version each side gets 10 turns and the higher total wins.

**Q2: How do you make a dice game in Python?**  
A: Use `import random` and `random.randint(1, 6)` (or `1, 10` for a 10-sided die) to simulate rolls. Use `while` loops to manage turns, `if/elif/else` to apply game rules, and variables to track scores. Structure the game as: initialise → loop → resolve.

**Q3: Can I make the computer smarter?**  
A: Yes. A basic AI improvement is to give the computer a "hold" strategy. For example, always hold when the computer's accumulated turn score reaches 20 or more. Implement this by tracking a `turn_score` variable inside the computer's loop and breaking out when it exceeds the threshold, adding `turn_score` to `Computer_Total` before breaking.

## Summary

We have developed a simple two-player Pig Game using user-defined functions, `while` loops, and conditional statements. This project shows how Python's `random` module can power a game, how nested loops model turn-based logic, and how `if/elif/else` determines a winner. For better learning, experiment with the code: add an interactive hold/roll choice, change the number of sides on the die, or implement a smarter computer opponent.
