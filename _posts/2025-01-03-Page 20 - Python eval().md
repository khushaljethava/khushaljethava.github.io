---
title: Python eval() Method
description: In this tutorial we will learn about python eval() method and it uses.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python eval() Method.webp
  alt: Python eval() Method
---

The Python `eval()` function is a built-in that parses and evaluates a single Python expression passed as a string, returning the result. It takes three parameters: an expression string (required), which must be a valid Python expression; a globals dictionary (optional) that defines the global namespace for evaluation; and a locals dictionary (optional) that defines the local namespace. The function evaluates the expression and returns whatever value the expression produces, which can be any Python type. Unlike `exec()`, which can run arbitrary statements, `eval()` is limited to expressions that produce a value. A real-world use case is building calculator applications or configuration systems where mathematical or logical expressions are stored as strings and need to be evaluated at runtime, though caution is required since `eval()` can execute arbitrary code if the input is not sanitized.

## What does eval() return?

The `eval()` function returns the result of evaluating the given Python expression string, which can be any Python object depending on the expression. If you evaluate `"2 + 3"` you get the integer `5`. If you evaluate `"[1, 2, 3]"` you get a list. The return type is entirely determined by what the expression produces.

## When should you use eval()?

Use `eval()` when you need to dynamically evaluate a Python expression from a string at runtime, such as in configuration parsers or formula evaluators, but only with trusted input since it poses security risks with untrusted data.

## Common Use Cases

A common use of `eval()` is building simple expression evaluators where users enter mathematical formulas like `"2 * (3 + 4)"` and the application computes the result. Another practical scenario is evaluating condition strings stored in configuration files, such as feature flags defined as `"version >= 2.0 and platform == 'linux'"`. It is also used in data analysis to dynamically apply pandas query expressions to DataFrames. Related functions include the [Python exec() method](/posts/Page-21-Python-exec()/) for executing full Python statements and the [Python format() method](/posts/Page-24-Python-format()/) for safer string interpolation without code execution risks.

## What is Python eval() Method?

The Python `eval()` method is a powerful built-in function that allows you to evaluate a Python expression that is stored as a string. When you call `eval()`, Python compiles the string into bytecode, executes it as a Python expression, and returns the resulting value. This makes `eval()` extremely flexible because it can process dynamically constructed expressions at runtime — something that would otherwise require complex parsing logic.

Think of `eval()` as a mini-interpreter embedded in your program. You hand it a string that looks like valid Python code, and it evaluates it just as if you had typed that code directly into the interpreter. This is particularly useful when you need to process expressions that are not known at the time you write the program, such as user inputs, configuration file entries, or dynamically generated formulas.

The syntax of the `eval()` method is:

```python
eval(expression, globals, locals)
```

## eval() Parameters

The `eval()` method takes three parameters:

* **expression** — The simple Python statement that can be evaluated as a Python expression. This must be a string containing a valid expression, not a statement (so assignments like `x = 5` are not allowed directly in `eval()`).
* **globals** (Optional) — A dictionary containing global variable parameters. If you provide this, `eval()` will use it as the global namespace when evaluating the expression.
* **locals** (Optional) — A dictionary containing local variable parameters. If provided, it defines the local namespace available during evaluation.

Let's check some examples of the `eval()` method.

### Example 1: How to use eval() method

The simplest use of `eval()` is to evaluate a mathematical expression stored as a string. Here is an example where we add two numbers whose values are stored in variables:

```python
num1 = 2
num2 = 4

print(eval("num1 + num2"))
```

The output will be as follows:

```
6
```

In the above example, the `eval()` method evaluates the expression `num1 + num2` using the current variable scope, then `print()` displays the result. Notice that `eval()` has access to `num1` and `num2` because they are defined in the same scope where `eval()` is called.

### Example 2: Using eval() method with a user-defined method

A more interactive example involves asking the user for two numbers and then using `eval()` to multiply them dynamically:

```python
def User_Func():

    # expression to be evaluated
    x = int(input("Enter the value for x:"))

    # variable used in expression
    y = int(input("Enter the value of y:"))
    expr = 'x * y'

    # evaluating expression
    result = eval(expr)

    # printing evaluated result
    print("result = {}".format(result))

User_Func()
```

When we run the above program, we will get the following output:

```
Enter the value for x:5
Enter the value of y:5
result = 25
```

In the above program, we create a user-defined method in which we ask users to input the value for `x` and `y`. We then use the `eval()` built-in method to multiply `x` and `y`, where the expression is passed as a string via the `expr` variable. This shows how you can construct expressions dynamically and evaluate them at runtime.

## eval() method with globals parameter

In the `eval()` method, we can pass a dictionary as an argument using the globals parameter. It is an optional argument that accepts a dictionary with global variables. Global variables are all those variables that were defined in the current global scope and can be accessed from anywhere in your program.

Let's check an example of `eval()` with the globals parameter:

### Example 3: eval() method with globals parameter

```python
x = 5
print(eval("x + 10", {"x": x}))

y = 5
print(eval("x + y", {"x": x}))
```

Output:

```
15
Traceback (most recent call last):
  File "", line 5, in <module>
    print(eval("x + y",{"x":x}))
  File "<string>", line 1, in <module>
NameError: name 'y' is not defined
```

In the `eval()` method, we are passing a custom dictionary to the globals parameter as an argument. The `eval()` method will only recognize those variables that are declared inside the dictionary. In the above program, `x` is in the dictionary, so it evaluates correctly and produces `15`. When we try to use `y`, it throws a `NameError` because `y` is not declared in the globals dictionary that was passed to `eval()`.

### Example 4: eval() with both globals and locals

You can provide both globals and locals dictionaries for fine-grained namespace control:

```python
global_vars = {"__builtins__": {}}  # disable built-ins for safety
local_vars = {"a": 10, "b": 20}

result = eval("a + b", global_vars, local_vars)
print(result)  # Output: 30

result2 = eval("a * b - 5", global_vars, local_vars)
print(result2)  # Output: 195
```

By setting `"__builtins__": {}` in the globals dictionary, you restrict `eval()` from accessing Python built-in functions like `open()`, `import`, or `exec()`. This is a common security technique when you need to allow user-supplied expressions while limiting what they can do.

## Rules of eval() method

* `eval()` can only execute expressions, not statements. For example, `eval("x = 5")` will raise a `SyntaxError` because assignment is a statement, not an expression.
* The expression must be passed as a string. Passing other types will raise a `TypeError`.
* If no globals or locals are provided, `eval()` uses the calling scope's namespace.
* `eval()` returns the value of the evaluated expression, not `None`.

## Common Mistakes When Using eval()

**Mistake 1: Passing statements instead of expressions**

```python
# This will raise SyntaxError
eval("x = 10")

# Correct approach: use exec() for statements
exec("x = 10")
```

**Mistake 2: Not handling exceptions**

If the expression string contains a syntax error or references an undefined variable, `eval()` will raise an exception. Always wrap `eval()` calls in try-except blocks when dealing with user input:

```python
user_input = "2 + + 3"  # invalid expression
try:
    result = eval(user_input)
except SyntaxError:
    print("Invalid expression provided.")
except NameError as e:
    print(f"Undefined variable: {e}")
```

**Mistake 3: Using eval() with unsanitized user input**

Never pass raw user input to `eval()` without sanitization. A malicious user could input something like `"__import__('os').system('rm -rf /')"` which would execute a destructive operating system command.

## Practical Tips for Using eval()

* **Prefer `ast.literal_eval()` for data parsing**: If you only need to parse Python literals (strings, numbers, lists, dicts, tuples), use `ast.literal_eval()` instead. It is much safer because it only evaluates literal structures.
* **Restrict the namespace**: Always pass custom globals and locals dictionaries when evaluating untrusted input, and set `"__builtins__": {}` to prevent access to dangerous built-ins.
* **Validate before evaluating**: Use regular expressions or whitelisting to check the expression string before passing it to `eval()`.
* **Log eval() calls**: In production systems, log every call to `eval()` so you can audit what expressions were evaluated and detect abuse.

## Frequently Asked Questions (FAQ)

**Q1: What is the difference between eval() and exec() in Python?**

`eval()` evaluates a single expression and returns its value, while `exec()` executes one or more Python statements and always returns `None`. If you need to run assignments, loops, or function definitions dynamically, use `exec()`. If you need the result of a calculation or logical check, use `eval()`.

**Q2: Is eval() safe to use with user input?**

By default, `eval()` is not safe for user input because it can execute arbitrary Python code, including calls that access the file system, import modules, or run system commands. To make it safer, restrict the globals and locals dictionaries and use `ast.literal_eval()` when you only need to parse data literals.

**Q3: Can eval() evaluate multi-line expressions?**

No, `eval()` is designed for single expressions. If you pass a multi-line string that contains statements, it will raise a `SyntaxError`. Use `exec()` if you need to execute multiple lines of Python code dynamically. However, you can pass complex single-line expressions including nested function calls and list comprehensions to `eval()`.
