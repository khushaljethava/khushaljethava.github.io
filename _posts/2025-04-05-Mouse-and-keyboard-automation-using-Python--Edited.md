---
title: Mouse and keyboard automation using Python
description: Mouse and keyboard automation using python is very easy. This article will learn how to do small mouse and keyboard automation.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/Mouse and keyboard automation using Python.png
 alt: Mouse and keyboard automation using Python
---

Before going into deep, let us know what python automation is.

If you are interested in building your chatbot, you much see this Rule-based chatbot article.

## Project Prerequisites:

In this python project, you need to know basic python. That includes.

* [Basic python](https://pythonscholar.com/python-programming/)  
* Import / Export of python Packages or Libraries.

## What will you learn?

* End to End development of Python Automation.  
* Basic Mouse and Keyboard Automation.


## What is Python Automation?

Python automation is a process to transform a manually performed computer action into one that happens automatically.

What are the advantages of python automation?

* Automating a computer task will be done when needed and run more quickly and save time.  
* Reduces Human errors and leads to fewer mistakes.  
* Automating means advancement in the work process.

The main question is how to achieve mouse and keyboard automation using Python.

For automatic things like mouse and keyboard, we need to understate the axis of the monitor because the axis will directly help users move the mouse using coordinates. 

The monitor is treated as a graph of the x-axis and y-axis, and every position on the monitor has to coordinate in the x-axis and y-axis; it is accessed by this coordinate.

As we have learned about python automation and how it works, the next question is how to automate using python?

## Mouse and keyboard automation using Python

Python can be done using the [pyautogui](https://pyautogui.readthedocs.io/en/latest/) package, installed with the following steps.

| pip install pyautogui |
| :---- |

We have installed the python pyautogui package; we can start automation by following the examples below.

Let's check screen resolution using the below examples.

**Example 1: Check Screen resolution using pyautogui?**

| import pyautogui print(pyautogui.size()) |
| :---- |

**Output:**

| Size(width=1920, height=1080) |
| :---- |

The size() function of pyautogui will return the screen resolution as a tuple of two integers as X-axis and Y-axis.

**Example 2: Check the current mouse position using pyautogui?**

| import pyautogui print(pyautogui.position()) |
| :---- |

**Output:**

| Point(x=750, y=449) |
| :---- |

## Mouse Automation Using Python

Now, let's check some mouse automation and how we python move mouse using pyautogui.

**moveTo()**: Use to move the mouse using the pyautogui module.

| import pyautogui pyautogui.moveTo(100, 100, duration \= 1\) |
| :---- |

When you execute the above program, it will move your mouse pointer from its current coordinates to (100,100) coordinates by taking 1 second in the execution.

**Move ():** Use this function to move the mouse cursor over a few pixels from its current position.

| import pyautogui pyautogui.move(0, 50\) |
| :---- |

**dragTo():** This function works similar to moveTo() with an additional parameter button which can be set to 'left', 'middle', and 'right' for which mouse button to hold down while dragging. 

| import pyautogui pyautogui.dragTo(100, 200, button='left')   |
| :---- |

 

| import pyautogui pyautogui.dragTo(100, 200, button='right')   |
| :---- |

 

**drag():** This function works similar to dragTo() function.

| import pyautogui pyautogui.drag(30, 0, 2, button='right') |
| :---- |

###  

### **Mouse Clicks**

The mouse click function can be achieved using the click() function in pyautogui.

**click()** : Use this function to make mouse click.

| import pyautogui pyautogui.click()  |
| :---- |

To specify a different mouse button to click, pass 'left', 'middle', or 'right' for the button keyword argument:

This example will perform a right-click on a mouse from its current position.

| import pyautogui pyautogui.click(button='right')   |
| :---- |

To perform the left-click on a mouse, you must try the below code.

**import** pyautogui   
pyautogui.click(button=left)  

Double left-click can be perform using pyautogui doubleClick() function.

| import pyautoguipyautogui.doubleClick() |
| :---- |

### **Mouse Scrolling**

We can scroll our using the pyautogui scroll() function.  
It will take the argument as an integer for a number of pixels and scroll the screen up to the given integer of pixels.

| import pyautogui pyautogui.scroll(200)  |
| :---- |

## Keyboard Automation Using Python

Now let us learn about python keyboard control and automation using pyautogui.

##  

**write()**: This function is used to write the given string. It will type the given characters in the given window.

| import pyautogui pyautogui.write('Hello Python\!') |
| :---- |

We can also use interval parameters to delay the automation function by passing int or float with the write() function.

| import pyautogui pyautogui.write('Hello Python\!', interval=0.25) |
| :---- |

**typewrite() :** This function works similarly like write() function. It will type the given string.

| import pyautogui pyautogui.typewrite('Hello Python\!', interval=0.25) |
| :---- |

   
pyautogui typewrite is a very amazing feature for automating the keyboard.

You can only press single-character keys with write(), so you can't press the Shift or F1 keys, for example.

**press():**  Use this function to press a key on the keyboard using the pyautogui module.

| import pyautogui pyautogui.press('enter')  |
| :---- |

In the above example, we are pressing the enter key.

We can also use other keys with the below examples.

| import pyautogui pyautogui.press('f1')pyautogui.press('tab')pyautogui.press('f5') |
| :---- |

**keyDown() and keyUp()** 

keyDown() and keyUp() function is used to simulate pressing a key down and key up and then releasing it up.

| import pyautogui pyautogui.keyDown('shift')  |
| :---- |

**hold()**: Use this function to hold a key convenient, and this function can be used as a context manager and passed a string 

| import pyautogui with pyautogui.hold('shift'):        pyautogui.press(\['left', 'left', 'left'\]) |
| :---- |

**hotkey():** this function is used to press a shortcut key on the keyboard.

| import pyautogui pyautogui.hotkey('ctrl', 'shift', 'esc') |
| :---- |

Below is the list of keyboards key we can use with pyautogui.

| \['\\t', '\\n', '\\r', ' ', '\!', '"', '\#', '$', '%', '&', "'", '(',')', '\*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7','8', '9', ':', ';', '\<', '=', '\>', '?', '@', '\[', '\\\\', '\]', '^', '\_', '\`','a', 'b', 'c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o','p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '\~','accept', 'add', 'alt', 'altleft', 'altright', 'apps', 'backspace','browserback', 'browserfavorites', 'browserforward', 'browserhome','browserrefresh', 'browsersearch', 'browserstop', 'capslock', 'clear','convert', 'ctrl', 'ctrlleft', 'ctrlright', 'decimal', 'del', 'delete','divide', 'down', 'end', 'enter', 'esc', 'escape', 'execute', 'f1', 'f10','f11', 'f12', 'f13', 'f14', 'f15', 'f16', 'f17', 'f18', 'f19', 'f2', 'f20','f21', 'f22', 'f23', 'f24', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8', 'f9','final', 'fn', 'hanguel', 'hangul', 'hanja', 'help', 'home', 'insert', 'junja','kana', 'kanji', 'launchapp1', 'launchapp2', 'launchmail','launchmediaselect', 'left', 'modechange', 'multiply', 'nexttrack','nonconvert', 'num0', 'num1', 'num2', 'num3', 'num4', 'num5', 'num6','num7', 'num8', 'num9', 'numlock', 'pagedown', 'pageup', 'pause', 'pgdn','pgup', 'playpause', 'prevtrack', 'print', 'printscreen', 'prntscrn','prtsc', 'prtscr', 'return', 'right', 'scrolllock', 'select', 'separator','shift', 'shiftleft', 'shiftright', 'sleep', 'space', 'stop', 'subtract', 'tab','up', 'volumedown', 'volumemute', 'volumeup', 'win', 'winleft', 'winright', 'yen','command', 'option', 'optionleft', 'optionright'\] |
| :---- |

A few more additional things like taking a screenshot can also be done using pyautogui,

## Taking Screenshot using Python

**screenshot():** Use this function to take the screenshot using pyautogui.

| import pyautogui im1 \= pyautogui.screenshot() |
| :---- |

 

We can also specify the name of the file by describing the name.

| import pyautogui im2 \= pyautogui.screenshot('my\_screenshot.png') |
| :---- |

Now let's end this tutorial with simple WhatsApp automation; in this example, we will send a message to someone and delete it after sending it to the user.

A few things are necessary to make it example run successfully is you need to have WhatsApp web open in your web browsers like google chrome or Firefox.

| import pyautogui as pgimport time def delete\_for\_everyone():    pg.click(807, 979\)    pg.typewrite("hello")    pg.typewrite(\["enter"\])    time.sleep(2)    pg.click(1621, 896\)    pg.click(1621, 896\)         \# time.sleep(1)    pg.click(1693, 859\)         \# time.sleep(1)    pg.click(1014, 669\)         \# time.sleep(1)    pg.click(1111, 605\)     a=20time.sleep(10)while(a\!=0):    delete\_for\_everyone()    a=a-1 |
| :---- |

We hope you guys have learned many things from this easy-to-learn python automation.

Have Fun and Happy pythoning