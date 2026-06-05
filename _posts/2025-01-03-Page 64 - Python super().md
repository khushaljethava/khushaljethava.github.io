---
title: Python super()
description: The super() is a built-in python function that gives access to methods and properties of a parent or sibling class object.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python super().webp
  alt: Python super()
---

The Python `super()` function is a built-in function that returns a proxy object which delegates method calls to a parent or sibling class in the method resolution order (MRO). In Python 3, it takes no required parameters when used inside a class method, automatically determining the current class and instance. The function returns a temporary proxy object of the superclass, allowing you to call its methods. The primary purpose of `super()` is to support cooperative multiple inheritance by ensuring that parent class constructors and methods are called correctly without hardcoding parent class names. A real-world use case is building a class hierarchy for a web application where a base `View` class handles common HTTP logic and child classes like `ListView` or `DetailView` extend it by calling `super().__init__()` to preserve the parent's initialization. It is closely related to [type()](/posts/Page-66-Python-type()/) which inspects an object's class, and [isinstance()](/posts/Page-35-Python-isinstance()/) which checks class membership.

## What does super() return?

The `super()` function returns a proxy object that forwards method calls to the next class in the method resolution order, enabling access to parent class methods and properties.

## When should you use super()?

Use `super()` inside a subclass method when you need to call the parent class's version of that method, especially in `__init__()` to ensure proper initialization of inherited attributes.

The syntax of super() function is:

```python
super()

```


## super() Parameters 

The super() function does not take any parameters.


### Example 1: How to use super() functions in python?

```python
class Parent:
  def __init__(self, txt):
    self.message = txt

  def printmessage(self):
    print(self.message)

class Child(Parent):
  def __init__(self, txt):
    super().__init__(txt)

x = Child("Hello, and welcome!")

x.printmessage()

```

Output:

```python
Hello, and welcome!

```

## Common Use Cases

A common use case for `super()` is calling the parent class's `__init__()` method in a subclass to ensure all inherited attributes are properly initialized before adding new ones. Another practical scenario is extending the behavior of a parent method without completely replacing it, such as a `LoggingMixin` that calls `super().save()` to preserve the original save logic while adding logging before or after the operation. It is also essential in multiple inheritance situations where the diamond problem would otherwise cause parent constructors to be called multiple times.
---

## More Examples

### Calling a parent method from a subclass

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # initialise the parent part
        self.breed = breed
    def speak(self):
        base = super().speak()   # reuse parent behaviour
        return f"{base} (woof!)"

d = Dog("Rex", "Labrador")
print(d.speak())   # Rex makes a sound (woof!)
```

`super()` lets a subclass extend rather than completely replace the behaviour of its parent.

### super() in multiple inheritance

```python
class A:
    def greet(self): print("A")
class B(A):
    def greet(self):
        print("B"); super().greet()
class C(A):
    def greet(self):
        print("C"); super().greet()
class D(B, C):
    def greet(self):
        print("D"); super().greet()

D().greet()   # D, B, C, A — follows the MRO
```

In multiple inheritance, `super()` follows the **Method Resolution Order (MRO)**, ensuring every class in the hierarchy is visited exactly once.

## Real-World Use Cases

- **Extending framework classes** — calling `super().__init__()` when subclassing Django models, exceptions, or GUI widgets.
- **Cooperative mixins** — combining several mixin classes that each call `super()` so their behaviour chains cleanly.
- **Customising built-ins** — subclassing `list` or `dict` and delegating to the parent for the standard behaviour.

## Common Mistakes

- **Forgetting to call `super().__init__()`** — the parent's initialisation is skipped, often leaving attributes unset.
- **Hardcoding the parent name** — `Animal.__init__(self, ...)` works but breaks under multiple inheritance; `super()` is safer.
- **Using `super()` outside a method** — it relies on the enclosing class context and will fail at module level.

## FAQ

**Q: Do I still need arguments to `super()` in Python 3?**
No — bare `super()` works inside methods. The two-argument form `super(Class, self)` is mainly for Python 2 compatibility or unusual cases.

**Q: What is the MRO?**
The Method Resolution Order is the linearised sequence Python uses to look up methods across base classes. You can inspect it with `ClassName.__mro__`.

## Conclusion

`super()` is the idiomatic way to call methods from a parent or sibling class while respecting Python's method resolution order. It keeps inheritance hierarchies flexible, avoids fragile hardcoded class names, and is essential for cooperative multiple inheritance. Whenever you override a method but still want the parent's behaviour, reach for `super()`.
