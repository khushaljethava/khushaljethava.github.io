---
title: Python __import__()
description: The __import__() is a built-in python function that is used to call the import statement.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python __import__().webp
  alt: Python __import__()
---

The Python `__import__()` function is a built-in function that is invoked by the `import` statement under the hood. It takes up to five parameters: `name` (the module name as a string), `globals` and `locals` (dictionaries used for context resolution), `fromlist` (a list of names to import from the module), and `level` (an integer specifying absolute or relative imports). The function returns the imported module object. While `__import__()` enables dynamic importing of modules at runtime when the module name is determined programmatically, direct use of this function is discouraged in favor of `importlib.import_module()`, which provides a cleaner and more readable API. A real-world use case is a plugin system that loads extension modules by name from a configuration file. The `__import__()` function is closely related to [exec()](/posts/Page-21-Python-exec()/) and [eval()](/posts/Page-20-Python-eval()/), which also execute dynamic code, though `__import__()` is specifically designed for module loading.

## What does __import__() return?

The `__import__()` function returns the top-level module object when `fromlist` is empty, or the named module itself when `fromlist` contains specific names to import.

## When should you use __import__()?

You should rarely use `__import__()` directly; prefer `importlib.import_module()` instead. The main scenario for `__import__()` is when you need to customize or override Python's import mechanism at a low level.

The syntax of the __import__() function is:

```python
__import__(name, globals=None, locals=None, fromlist=(), level=0)
```

## __import__() Parameters

The __import__() function takes multiple parameters as argument:

* name - name of the module to import
* globals and locals - interpret names
* fromlist - Objects or submodules to be imported
* level - specifies whether to use absolute or relative imports


### Example 1: How to use __import__() function in python?

```python
mathematics = __import__('math', globals(), locals(), [], 0)
print(mathematics.fabs(-2.5))
```

Output:
```text

2.5
```

## Common Use Cases

A common use case for `__import__()` is building plugin systems where module names are read from a configuration file or database at runtime and loaded dynamically without hardcoding import statements. Another practical scenario is writing testing frameworks or development tools that need to import arbitrary modules by name to inspect or execute their contents. It is also used internally by Python's import machinery, and understanding it helps when customizing module loading behavior through import hooks.

---

## More Examples

### Importing by string name

```python
math = __import__("math")
print(math.sqrt(16))   # 4.0
```

`__import__()` lets you import a module whose name is only known at runtime as a string.

### Why importlib is preferred

```python
import importlib
math = importlib.import_module("math")
print(math.pi)
```

The `importlib.import_module()` function is the recommended, more readable way to do dynamic imports. `__import__()` is the low-level function that the `import` statement itself calls behind the scenes.

## Real-World Use Cases

- **Plugin systems** — loading modules listed in a config file by name.
- **Lazy loading** — deferring an expensive import until it is actually needed.
- **Frameworks** — dynamically importing user-specified classes or handlers.

## Common Mistakes

- **Using `__import__()` for everyday imports** — the normal `import` statement is clearer and safer.
- **Misunderstanding the return value** — for a dotted name like `"a.b.c"`, `__import__()` returns the top-level package `a`, not `c`. Use `importlib.import_module()` to get the leaf module directly.
- **Passing the wrong globals/locals** — the advanced parameters are rarely needed and easy to misuse.

## FAQ

**Q: Should I ever call `__import__()` directly?**
Rarely. Prefer `importlib.import_module()` for dynamic imports; it is cleaner and handles dotted names intuitively.

**Q: What does `__import__()` return for a submodule?**
It returns the top-level package object unless you pass a non-empty `fromlist`. This surprising behaviour is another reason to use `importlib`.

## Conclusion

`__import__()` is the built-in that powers Python's `import` statement. While you can call it directly to import modules by name at runtime, modern code should almost always use `importlib.import_module()` for dynamic imports because it is more readable and behaves more predictably with dotted module paths. Understanding `__import__()` is still valuable for grasping how Python's import machinery works under the hood.
