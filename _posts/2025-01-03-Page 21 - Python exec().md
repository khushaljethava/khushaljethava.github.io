---
title: Python exec() Method
description: In this tutorial we will learn about python exec() method and its uses with examples.
date: 2025-01-03 22:15:55 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python exec() Method.webp
  alt: Python exec() Method
---

The Python `exec()` function is a built-in that dynamically executes Python code provided as a string or compiled code object. It takes three parameters: an object (required), which is the string or code object to execute; a globals dictionary (optional) that defines the global namespace; and a locals dictionary (optional) that defines the local namespace. Unlike `eval()`, which only evaluates expressions, `exec()` can execute any valid Python statements including imports, class definitions, function definitions, loops, and conditionals. The function always returns `None`, since its purpose is to execute code for its side effects rather than to produce a value. A common real-world use case is implementing plugin systems where user-provided scripts are loaded and executed at runtime, or building interactive coding environments where code submitted by users needs to be run dynamically.

## What does exec() return?

The `exec()` function always returns `None`, because it executes statements for their side effects rather than evaluating an expression to produce a result.

## When should you use exec()?

Use `exec()` when you need to execute dynamically generated Python statements, such as running user scripts in a plugin system or applying code patches at runtime, and always restrict the namespace with globals and locals dictionaries for security.

## Common Use Cases

One common use of `exec()` is in educational platforms and online coding judges where student-submitted code needs to be executed in a controlled environment. Another practical scenario is implementing configuration files written in Python syntax, where `exec()` runs the config file and populates a namespace dictionary with the defined variables. It is also used in code generation pipelines where templates produce Python source code that is then executed. Related functions include the [Python eval() method](/posts/Page-20-Python-eval()/) for evaluating single expressions and the [Python globals() method](/posts/Page-27-Python-globals()/) for inspecting the global namespace that `exec()` modifies.

The exec() is a built-in python function that executes the specified python code dynamically. Can be a string or a code object.

Python exec() syntax :

```python
exec(object, globals, locals)

```

## exec() Parameters

exec() takes three parameters as argument:


* object \-  A string or code object.  
* globals (optional) \- A dictionary containing global parameters.  
* locals (optional) \-  A dictionary containing local parameters.

Lets see an example of python exec() function.


### Example 1: How to use exec() function in python?

```python
code = 'print("Hello Python")'

exec(code)

```

Output:

```python
Hello Python 

```


### Example 2 : exec() function with user input function.

```python
code = 'a = int(input("Enter a Number: "))\nprint(a)'

exec(code)

```

Output:

```python
Enter a Number: 25
25

```

---

## More Examples

### Executing dynamically built code

```python
code = """
for i in range(3):
    print("Line", i)
"""
exec(code)
```

`exec()` runs a string (or compiled code object) containing arbitrary Python statements — unlike `eval()`, which only evaluates a single expression.

### Using a custom namespace

```python
namespace = {}
exec("result = 6 * 7", namespace)
print(namespace["result"])   # 42
```

Passing a dictionary lets you capture variables created by the executed code without polluting your real globals.

## exec() vs eval()

| Function | Accepts | Returns |
|----------|---------|---------|
| `eval()` | A single expression | The expression's value |
| `exec()` | Any statements | Always `None` |

## Real-World Use Cases

- **Code generation tools** and templating engines.
- **Interactive shells / REPLs** that run user input.
- **Configuration as code** in tightly controlled environments.

## Security Warning

`exec()` runs arbitrary code and is a serious security risk if given untrusted input. Never `exec()` data from users, files, or the network without strict validation — it can delete files, leak data, or take over the process. In most cases there is a safer alternative such as `json.loads()`, `ast.literal_eval()`, or a dedicated parser.

## Common Mistakes

- **Using it on untrusted input** — a major vulnerability.
- **Expecting a return value** — `exec()` always returns `None`; read results from the namespace dict.
- **Reaching for `exec()` too early** — most "dynamic" needs are better solved with dictionaries, functions, or `getattr()`.

## FAQ

**Q: What is the difference between `exec()` and `eval()`?**
`eval()` evaluates one expression and returns its value; `exec()` executes full statements and returns `None`.

**Q: How do I get values out of `exec()`?**
Pass a dictionary as the globals/locals argument and read the variables it creates afterward.

## Conclusion

`exec()` executes dynamically generated Python statements from a string or code object. It is powerful but dangerous: only use it with fully trusted code, prefer a custom namespace to capture results, and always look for a safer, more specific alternative first. Used judiciously, it enables code generation and interactive tooling; used carelessly, it opens severe security holes.
