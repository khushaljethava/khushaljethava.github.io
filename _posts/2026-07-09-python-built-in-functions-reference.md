---
title: "Python Built-in Functions: The Complete Reference Guide"
description: "Every Python built-in function explained with runnable examples, gotchas, and when to use each — abs, zip, map, enumerate, sorted, and 50+ more."
date: 2026-07-09 10:00:00 +0530
categories: [Python]
tags: [python, built-in-functions, reference]
image:
  path: /commons/Python range().webp
  alt: "Python built-in functions complete reference"
redirect_from:
  - /posts/Page-16-Python-dict()/
  - /posts/Page-17-Python-dir()/
  - /posts/Page-18-Python-divmod()/
  - /posts/Page-19-Python-enumerate()/
  - /posts/Page-20-Python-eval()/
  - /posts/Page-21-Python-exec()/
  - /posts/Page-22-Python-filter()/
  - /posts/Page-23-Python-float()/
  - /posts/Page-24-Python-format()/
  - /posts/Page-25-Python-frozenset()/
  - /posts/Page-26-Python-getattr()/
  - /posts/Page-27-Python-globals()/
  - /posts/Page-28-Python-hasattr()/
  - /posts/Page-29-Python-hash()/
  - /posts/Page-30-Python-help()/
  - /posts/Page-31-Python-hex()/
  - /posts/Page-32-Python-id()/
  - /posts/Page-33-Python-input()/
  - /posts/Page-34-Python-int()/
  - /posts/Page-35-Python-isinstance()/
  - /posts/Page-36-Python-issubclass()/
  - /posts/Page-37-Python-iter()/
  - /posts/Page-38-Python-len()/
  - /posts/Page-39-Python-list()/
  - /posts/Page-40-Python-locals()/
  - /posts/Page-41-Python-map()/
  - /posts/Page-42-Python-max()/
  - /posts/Page-43-Python-memoryview()/
  - /posts/Page-44-Python-min()/
  - /posts/Page-45-Python-next()/
  - /posts/Page-46-Python-object()/
  - /posts/Page-47-Python-oct()/
  - /posts/Page-48-Python-open()/
  - /posts/Page-49-Python-ord()/
  - /posts/Page-50-Python-pow()/
  - /posts/Page-51-Python-print()/
  - /posts/Page-52-Python-property()/
  - /posts/Page-53-Python-range()/
  - /posts/Page-54-Python-repr()/
  - /posts/Page-55-Python-reversed()/
  - /posts/Page-56-Python-round()/
  - /posts/Page-57-Python-set()/
  - /posts/Page-58-Python-setattr()/
  - /posts/Page-59-Python-slice()/
  - /posts/Page-60-Python-sorted()/
  - /posts/Page-61-Python-staticmethod()/
  - /posts/Page-62-Python-str()/
  - /posts/Page-63-Python-sum()/
  - /posts/Page-64-Python-super()/
  - /posts/Page-65-Python-tuple()/
  - /posts/Page-66-Python-type()/
  - /posts/Page-67-Python-vars()/
  - /posts/Page-68-Python-zip()/
  - /posts/Page-69-Python-__import__()/
---

Python ships with roughly seventy names you can call without ever writing an `import` line. They live in the `builtins` module, which the interpreter injects into every module's namespace automatically — that's why `len([1, 2, 3])` just works, everywhere, with no setup. This guide walks through all 54 of the most commonly-used built-in *functions* (constructors like `dict()`, `list()`, and `set()` included, since in CPython they behave exactly like functions even though they're technically type objects), with runnable examples, real output, and the gotcha that trips people up in practice.

If you ever want to see the full list yourself:

```python
import builtins
print(dir(builtins))
```

And if you want to confirm a name really is a built-in rather than something defined in your own file, check `vars(builtins)` or simply `'sorted' in dir(builtins)`.

## Numeric & math

### divmod()
Returns `(quotient, remainder)` in one call — handy for anything involving pagination, clock arithmetic, or unit conversion.
```python
q, r = divmod(47, 5)
print(q, r)
```
```
9 2
```
Gotcha: for negative numbers, Python floors the division, so `divmod(-7, 2)` gives `(-4, 1)`, not `(-3, -1)`.

### pow()
Computes `base ** exp`, and with a third argument does fast modular exponentiation — critical for cryptography.
```python
print(pow(2, 10))
print(pow(4, 13, 497))
```
```
1024
445
```
Use `pow(base, exp, mod)` instead of `(base ** exp) % mod` for large exponents — it's vastly faster and avoids building a huge intermediate integer.

### round()
Rounds to the nearest value, using banker's rounding (round-half-to-even) for ties.
```python
print(round(2.5), round(3.5), round(3.14159, 2))
```
```
2 4 3.14
```
Gotcha: `round(2.5)` is `2`, not `3` — this surprises almost everyone the first time.

### hex()
Converts an integer to its base-16 string representation, prefixed with `0x`.
```python
print(hex(255))
```
```
0xff
```
Use when formatting memory addresses, color codes, or debugging binary data.

### float()
Converts a value to a floating-point number, or parses one from a string.
```python
print(float("3.14"), float(10))
```
```
3.14 10.0
```
Gotcha: `float("nan")` and `float("inf")` are valid — always sanitize user-facing numeric input.

### int()
Converts to an integer, truncating floats toward zero, and parses strings in any base.
```python
print(int(3.9), int("101", 2))
```
```
3 5
```
Use `int(x, base)` for parsing hex/binary/octal strings without manual arithmetic.

## Iterables & sequences

### enumerate()
Pairs each item in an iterable with its index, avoiding manual counters.
```python
for i, name in enumerate(["a", "b", "c"], start=1):
    print(i, name)
```
```
1 a
2 b
3 c
```
Use when you need the index and the value together in a loop — cleaner than `range(len(x))`.

### zip()
Combines multiple iterables element-wise into tuples, stopping at the shortest one.
```python
names = ["Alice", "Bob"]
ages = [30, 25]
print(list(zip(names, ages)))
```
```
[('Alice', 30), ('Bob', 25)]
```
Gotcha: mismatched lengths silently truncate — use `itertools.zip_longest` if that's not what you want.

### map()
Applies a function to every item of an iterable, returning a lazy iterator.
```python
print(list(map(str.upper, ["a", "b", "c"])))
```
```
['A', 'B', 'C']
```
Use when a list comprehension would just be `[f(x) for x in xs]` — often `map(f, xs)` reads cleaner for simple transforms.

### filter()
Keeps only the items for which a function returns truthy.
```python
print(list(filter(lambda x: x % 2 == 0, range(10))))
```
```
[0, 2, 4, 6, 8]
```
Passing `None` as the function filters out falsy values directly: `filter(None, [0, 1, "", "x"])`.

### sorted()
Returns a new sorted list from any iterable, leaving the original untouched.
```python
print(sorted(["banana", "apple", "cherry"], key=len))
```
```
['apple', 'banana', 'cherry']
```
Use `key=` instead of a custom comparator — it's faster and idiomatic. Add `reverse=True` for descending order.

### reversed()
Returns a reverse iterator over a sequence without copying it.
```python
print(list(reversed([1, 2, 3])))
```
```
[3, 2, 1]
```
Works on anything implementing `__reversed__` or supporting indexing — not on arbitrary iterators.

### range()
Generates an immutable, memory-efficient sequence of integers, evaluated lazily.
```python
print(list(range(2, 10, 2)))
```
```
[2, 4, 6, 8]
```
`range` objects don't store all values in memory — `range(10**18)` is instant to create.

### len()
Returns the number of items in a container by calling its `__len__`.
```python
print(len("hello"), len([1, 2, 3]))
```
```
5 3
```
Gotcha: raises `TypeError` on objects without `__len__`, including plain iterators and generators.

### sum()
Adds up the items of an iterable, with an optional start value.
```python
print(sum([1, 2, 3], 100))
```
```
106
```
Avoid `sum()` for string concatenation — use `"".join()` instead; it's far faster.

### min() and max()
Return the smallest/largest item, optionally by a custom `key`.
```python
words = ["kiwi", "banana", "fig"]
print(min(words, key=len), max(words, key=len))
```
```
fig banana
```
Both accept multiple positional arguments too: `max(3, 7, 2)`.

### iter()
Turns an iterable into an iterator, or repeatedly calls a function until a sentinel value.
```python
it = iter([1, 2, 3])
print(next(it), next(it))
```
```
1 2
```
The two-argument form `iter(callable, sentinel)` is a clean way to read a file or stream until a marker.

### next()
Advances an iterator and returns the next item, with an optional default.
```python
it = iter([])
print(next(it, "done"))
```
```
done
```
Without a default, `next()` raises `StopIteration` on exhaustion — always provide one when unsure.

### slice()
Creates a reusable slice object, useful when the same slicing logic is applied repeatedly.
```python
s = slice(1, 5, 2)
print([0, 1, 2, 3, 4, 5, 6][s])
```
```
[1, 3]
```
Use named `slice` objects to document intent when indexing logic gets complex (e.g., parsing fixed-width fields).

## Type constructors

### str()
Converts any object to its human-readable string form via `__str__`.
```python
print(str(3.14), str([1, 2]))
```
```
3.14 [1, 2]
```
Different from `repr()` — `str()` favors readability, `repr()` favors unambiguous reconstruction.

### list()
Builds a list from any iterable, or an empty list with no arguments.
```python
print(list("abc"), list(range(3)))
```
```
['a', 'b', 'c'] [0, 1, 2]
```
Use `list(x)` to materialize a generator or `map`/`filter` result you need to iterate more than once.

### dict()
Constructs a dictionary from keyword arguments, a mapping, or an iterable of key-value pairs.
```python
print(dict(a=1, b=2), dict([("x", 1), ("y", 2)]))
```
```
{'a': 1, 'b': 2} {'x': 1, 'y': 2}
```
Since 3.7, insertion order is guaranteed — dicts are safe to treat as ordered.

### set()
Builds an unordered collection of unique, hashable items.
```python
print(set([1, 2, 2, 3]))
```
```
{1, 2, 3}
```
Use for O(1) membership tests and deduplication — `x in my_set` beats `x in my_list` for large collections.

### frozenset()
An immutable, hashable version of `set` — usable as a dict key or set member.
```python
fs = frozenset([1, 2, 3])
print(hash(fs) is not None)
```
```
True
```
Use when you need a set-like value that itself needs to be hashable, e.g. as a cache key.

### tuple()
Builds an immutable ordered sequence from an iterable.
```python
print(tuple([1, 2, 3]))
```
```
(1, 2, 3)
```
Tuples are hashable when their contents are, making them natural dict keys and set members.

### memoryview()
Exposes a buffer's memory without copying it — critical for performance with large binary data.
```python
data = bytearray(b"hello")
mv = memoryview(data)
mv[0] = ord("H")
print(data)
```
```
bytearray(b'Hello')
```
Use when slicing large `bytes`/`bytearray` objects repeatedly — `memoryview` avoids the copy each slice would otherwise make.

### object()
Creates a bare instance of the base class every Python object inherits from.
```python
sentinel = object()
print(sentinel is object())
```
```
False
```
A classic use is a unique "sentinel" value guaranteed not to equal anything else, useful as a default marker instead of `None`.

## Introspection & attributes

### type()
Returns an object's type, or — with three arguments — dynamically creates a new class.
```python
print(type(42), type("hi"))
Dynamic = type("Dynamic", (object,), {"x": 1})
print(Dynamic().x)
```
```
<class 'int'> <class 'str'>
1
```
The three-argument form is how metaclasses and ORMs generate classes at runtime.

### isinstance()
Checks whether an object is an instance of a class or any of a tuple of classes.
```python
print(isinstance(5, (int, float)))
```
```
True
```
Prefer `isinstance()` over `type(x) == SomeClass` — it respects inheritance and duck typing.

### issubclass()
Checks a class relationship rather than an instance relationship.
```python
print(issubclass(bool, int))
```
```
True
```
Gotcha: in Python, `bool` is a subclass of `int` — that's why `True == 1` evaluates to `True`.

### dir()
Lists the names in the current scope, or the attributes/methods of an object.
```python
print([n for n in dir([]) if not n.startswith("_")][:5])
```
```
['append', 'clear', 'copy', 'count', 'extend']
```
Great for interactive exploration in a REPL, but not a reliable API contract — use the `inspect` module for tooling.

### vars()
Returns an object's `__dict__`, or acts like `locals()` with no arguments.
```python
class P:
    def __init__(self):
        self.x = 1
print(vars(P()))
```
```
{'x': 1}
```
Fails on objects using `__slots__`, since they have no `__dict__`.

### hasattr()
Checks whether an attribute exists on an object without raising.
```python
print(hasattr("hi", "upper"), hasattr("hi", "nope"))
```
```
True False
```
Internally it just calls `getattr()` and catches `AttributeError` — prefer EAFP (`try`/`except`) in hot paths for performance.

### getattr()
Fetches an attribute by name, with an optional default to avoid an exception.
```python
print(getattr("hi", "upper")(), getattr("hi", "missing", "N/A"))
```
```
HI N/A
```
Use when the attribute name is only known at runtime — e.g. dynamic dispatch based on a config string.

### setattr()
Sets an attribute by name, the dynamic counterpart to `getattr()`.
```python
class C: pass
obj = C()
setattr(obj, "value", 42)
print(obj.value)
```
```
42
```
Use for building objects from dynamic data (e.g. deserializing a dict into an instance).

### id()
Returns an object's unique identity — in CPython, its memory address.
```python
a = [1, 2]
b = a
print(id(a) == id(b))
```
```
True
```
Use `id()` (or the `is` operator, which uses it) to check object identity, never for equality — that's what `==` is for.

### hash()
Returns an integer hash for hashable objects — the basis for dict and set lookups.
```python
print(hash("hello") == hash("hello"))
```
```
True
```
Only hashable (usually immutable) objects support `hash()` — lists and dicts raise `TypeError`.

### repr()
Returns an unambiguous, developer-facing string representation of an object.
```python
print(repr("hi\nthere"))
```
```
'hi\nthere'
```
Good `__repr__` implementations should, ideally, look like valid Python that recreates the object.

### oct()
Converts an integer to its octal string representation, prefixed with `0o`.
```python
print(oct(64))
```
```
0o100
```
Common in file-permission handling, e.g. `oct(os.stat("f").st_mode)`.

### ord()
Converts a single character into its Unicode code point.
```python
print(ord("A"), ord("€"))
```
```
65 8364
```
Gotcha: raises `TypeError` if given a string of length other than one.

## Execution & I/O

### print()
Writes text to standard output (or any file-like object via `file=`).
```python
print("a", "b", sep="-", end="!\n")
```
```
a-b!
```
Use `sep`, `end`, and `file` to control formatting instead of building strings manually before printing.

### input()
Reads a line of text from standard input, optionally showing a prompt.
```python
name = input("Name: ")
```
```
Name: (waits for user input, returns the typed string)
```
Always returns a `str` — cast explicitly with `int()`/`float()` if you need a number.

### open()
Opens a file and returns a file object; almost always used with a `with` block.
```python
with open("example.txt", "w") as f:
    f.write("hello")
```
```
(writes "hello" to example.txt)
```
Always use `with open(...) as f:` — it guarantees the file is closed even if an exception occurs.

### format()
Formats a single value according to a format spec — the mechanism behind f-strings.
```python
print(format(3.14159, ".2f"), format(255, "#x"))
```
```
3.14 0xff
```
For anything beyond a single value, an f-string (`f"{x:.2f}"`) is usually clearer than calling `format()` directly.

### eval()
Evaluates a string as a Python *expression* and returns its result.
```python
print(eval("2 + 3 * 4"))
```
```
14
```
Gotcha: never call `eval()` on untrusted input — it executes arbitrary code with full interpreter privileges.

### exec()
Executes a string as Python *statements* — a superset of `eval()`, with no return value.
```python
exec("x = 5\nprint(x * 2)")
```
```
10
```
Same security warning as `eval()`, doubly so — `exec()` can define functions, classes, and imports.

### help()
Launches Python's interactive help system for a module, function, or object.
```python
help(str.strip)
```
```
(prints the docstring for str.strip in an interactive pager)
```
Best used in a REPL session; in scripts, prefer reading documentation directly.

### globals()
Returns a mutable dictionary of the current module's global namespace.
```python
x = 1
print("x" in globals())
```
```
True
```
Mutating the dict returned by `globals()` actually changes global variables — powerful and dangerous.

### locals()
Returns a snapshot dictionary of the current local namespace.
```python
def f():
    y = 10
    print(locals())
f()
```
```
{'y': 10}
```
Gotcha: inside a function, mutating the dict from `locals()` does not reliably update local variables — CPython treats it as a snapshot.

### __import__()
The low-level function that the `import` statement calls under the hood.
```python
math = __import__("math")
print(math.sqrt(16))
```
```
4.0
```
Use `importlib.import_module()` instead in real code — `__import__()` exists mainly for the interpreter's own use.

## OOP helpers

### property()
Turns a method into a managed attribute, enabling computed values with attribute-style access.
```python
class Circle:
    def __init__(self, r):
        self.r = r
    @property
    def area(self):
        return 3.14159 * self.r ** 2

print(Circle(2).area)
```
```
12.56636
```
Use `property` to add validation or computed values to an attribute without breaking existing `obj.attr` call sites.

### staticmethod()
Marks a method that doesn't receive `self` or `cls` — effectively a plain function namespaced in a class.
```python
class Math:
    @staticmethod
    def add(a, b):
        return a + b

print(Math.add(2, 3))
```
```
5
```
Use when a method logically belongs to a class but never touches instance or class state.

### super()
Returns a proxy object for calling methods on a parent or sibling class — essential for cooperative multiple inheritance.
```python
class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return super().speak() + " Woof!"

print(Dog().speak())
```
```
... Woof!
```
Always prefer `super()` over hardcoding the parent class name — it correctly follows the MRO in multiple-inheritance hierarchies.

## Summary table

| Category | Functions |
|---|---|
| Numeric & math | `divmod`, `pow`, `round`, `hex`, `oct`, `float`, `int` |
| Iterables & sequences | `enumerate`, `zip`, `map`, `filter`, `sorted`, `reversed`, `range`, `len`, `sum`, `min`, `max`, `iter`, `next`, `slice` |
| Type constructors | `str`, `list`, `dict`, `set`, `frozenset`, `tuple`, `memoryview`, `object` |
| Introspection & attributes | `type`, `isinstance`, `issubclass`, `dir`, `vars`, `hasattr`, `getattr`, `setattr`, `id`, `hash`, `repr`, `oct`, `ord` |
| Execution & I/O | `print`, `input`, `open`, `format`, `eval`, `exec`, `help`, `globals`, `locals`, `__import__` |
| OOP helpers | `property`, `staticmethod`, `super` |

## Where to go next

Once you're comfortable with the built-in toolkit, the next step is usually applying it inside real data and AI pipelines. If you're building anything that touches large models locally, see [Quantization for LLMs: Run Big Models on Small Hardware](/posts/Quantization-for-LLMs-Run-Big-Models-on-Small-Hardware/) — many of the functions above (`bytes`, `memoryview`, buffer handling) show up constantly when working with tensor data. If you're evaluating retrieval pipelines, [Building a RAG Evaluation Pipeline with Python](/posts/Building-a-RAG-Evaluation-Pipeline-with-Python/) leans heavily on `zip()`, `enumerate()`, and `sorted()` for scoring and ranking results. And if async code is next on your list, Python's async ecosystem builds directly on the iterator protocol these built-ins expose — `iter()` and `next()` are the same mechanism `async for` uses under the hood.
