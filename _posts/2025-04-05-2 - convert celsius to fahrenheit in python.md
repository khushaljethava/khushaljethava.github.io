---
title: Convert Celsius to Fahrenheit in Python
description: In this project, we will create a python project on how we can convert Celsius to Fahrenheit in python. Also, we will learn about what is Celsius and Fahrenheit are and the mathematical foundations regarding the conversion of Celsius to Fahrenheit.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Convert Celsius to Fahrenheit in Python.png
 alt: Convert Celsius to Fahrenheit in Python
---

## Project Prerequisites:

In this python project, you just need to know basic python. That includes.

* [Python print() function](https://pythonscholar.com/python-programming/python-print-function/)  
* [Python Input / Output function](https://pythonscholar.com/python-programming/python-input-and-output/)  
* [Python Operators](https://pythonscholar.com/python-programming/python-operators/)

## What will you learn?

* End to End development of Python programs based on mathematical formulas.  
* Basic Input / Output implementation.

Let's learn what Celsius and Fahrenheit are and what they are used to.

## What is Celsius?

Celsius is a measurement system used in the metric system. It is often associated with temperatures, but it is more than that. Celsius can also measure other things like volume and pressure, and many also know it as centigrade.

The Celsius scale was created in 1742 by Swedish astronomer Anders Celsius, trying to find an alternative to the outdated Fahrenheit scale for measuring temperature. He set his scale at 0 degrees for freezing water and 100 degrees for boiling water. The metric system was standardized in 1960 by an international agreement, making the Celsius scale universal across many countries today.

Celsius is symbolized as  °C as a unit of measurement.

## What is Fahrenheit?

Fahrenheit is a temperature scale that was created by German physicist Daniel Gabriel Fahrenheit in 1724\. This is the imperial measurement system for measuring temperature. That measures the boiling point of water at 212 degrees and the freezing point of water at 32 degrees. The Celsius scale is used in most other countries in the world.

Fahrenheit is symbolized as  °F as a unit of measurement.

Now let's see how to convert Celsius into Fahrenheit based on scientific and mathematical proofs.

## Approach to convert celsius to Fahrenheit:

To convert Celsius to Fahrenheit, we have to multiply celsius by 1.8 or 9/5 and then add 32\.

**Formula**:

*T*(°F) \= *T*(°C) × 9/5 \+ 32 or *T*(°F) \= *T*(°C) × 1.8 \+ 32

**Example:**

 (4 **°C** \* 1.8) \+ 32 \= 39.2 **°F** or (4°C × 9/5) \+ 32 \= 39.2°F

## **Celsius to Fahrenheit Chart**

Below is the chart overview of Celsius to Fahrenheit.

| Celsius °C | Fahrenheit °F |
| :---- | :---- |
| \-30 °C | \-22 °F |
| \-20 °C | \-4.0 °F |
| \-10 °C | 14.0 °F |
| 0 °C | 32.0 °F |
| 1 °C | 33.8 °F |
| 2 °C | 35.6 °F |
| 3 °C | 37.4 °F |
| 4 °C | 39.2 °F |
| 5 °C | 41.0 °F |

Now let's get our hands dirty by writing a python program based on the above formula and example, which will give you an understanding of how we can convert any mathematical formula into the python program.

## Convert Celsius to Fahrenheit in Python

In this python project, first, we will take input from the user, and then we will implement a formula to convert celsius to Fahrenheit and print the result after that.

### Example 1: How to convert Celsius to Fahrenheit in python?

| \# Python project to convert celsius to Fahrenheit in python.\# Take input from the user.celsius \= float(input("Enter the temperature in Celsius: "))\# implementing the formulafahrenheit \= (celsius \* 1.8) \+ 32\# printing the resultprint("The %0.f degrees Celsius is equal to %0.1f degrees Fahrenheit" %(celsius,fahrenheit)) |
| :---- |

The output will be as follow:

| Enter the temperature in Celsius: 4The 4 degrees Celsius is equal to 39.2 degrees Fahrenheit. |
| :---- |

## Example 2: Create a temperature class in python

| def CelsiusToFahrenheit(Value):    result \= (Value \* 1.8) \+ 32    return resultcelsius \= float(input("Enter the temperature in Celsius: "))fahrenheit \= CelsiusToFahrenheit(celsius)print("The %0.f degrees Celsius is equal to %0.1f degrees Fahrenheit" %(celsius,fahrenheit)) |
| :---- |

Output:

| Enter the temperature in Celsius: 25The 25 degrees Celsius is equal to 77.0 degrees Fahrenheit |
| :---- |

In the above example we making a temperature class in python program to convert celsius to fahrenheit.

We hope you guys have found this worthwhile project and learned how to convert Celsius to Fahrenheit using python. Also, we encourage and challenge you to make a python program for converting Fahrenheit to celsius, and you can follow this tutorial to convert Fahrenheit to celsius.