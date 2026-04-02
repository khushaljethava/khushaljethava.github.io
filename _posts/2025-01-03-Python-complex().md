---
title: Python complex() Method
description: In this tutorial we will learn about the python complex() method and its uses.
date: 2025-01-03 23:24:00 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python complex() Method.webp
  alt: Python complex() Method

---

The Python `complex()` function is a built-in constructor that creates a complex number from a real part and an optional imaginary part, or by parsing a string representation. It accepts two optional parameters: `real` (the real component, defaulting to 0) and `img` (the imaginary component, defaulting to 0). When a string is passed as the first argument, it must represent a valid complex number (like `"3+4j"`) and the second argument must not be provided. The function returns a `complex` object with `.real` and `.imag` attributes. Complex numbers are essential in scientific computing, signal processing, electrical engineering, and quantum computing applications. A real-world use case is performing impedance calculations in circuit analysis where voltages and currents are represented as complex numbers. The `complex()` function complements other numeric constructors like [int()](/posts/Page-34-Python-int()/) and [float()](/posts/Page-23-Python-float()/) for building different numeric types.

## What does complex() return?

The `complex()` function returns a complex number object. For example, `complex(3, 4)` returns `(3+4j)`, and `complex()` with no arguments returns `0j`.

## When should you use complex()?

Use `complex()` when you need to perform mathematical operations involving imaginary numbers, such as signal processing, electrical engineering calculations, or any domain where two-dimensional numeric representation is required.

The complex() method returns a complex number when real and imaginary parts are given and converts a string to a complex number.

The syntax of complex() is:

```python
complex([real[, img]])
```

## Python complex() Method  Parameters


The complex() method takes two parameters:

**real** \- if real is omitted, it will take default as 0\. real part.  
**img** \- if img is omitted, it will take default as 0\. Imaginary part.

If the first parameter is passed as a string to this method, it will be interpreted as a complex number. In this case, it should not pass the second parameter.

Let’s check examples of complex() methods.

### Example 1: How to use a complex() method is a method.

This method will see how we can create a complex number using the complex() method.

```python
X = complex(4,-1)
print(X)

X = complex(2)
print(X)

X = complex()
print(X)

X = complex('4-7j')
print(X)
```


 The output will be as follow:

```python
(4-1j)
(2+0j)
0j
(4-7j)
```
## Common Use Cases

A common use case for `complex()` is performing impedance calculations in electrical engineering, where circuit components like resistors, capacitors, and inductors are modeled as complex numbers. Another practical scenario is implementing the Discrete Fourier Transform (DFT) in signal processing where frequency components are represented as complex numbers with magnitude and phase. It is also used in mathematical applications that require operations on the complex plane, such as fractal generation (Mandelbrot sets) or solving polynomial equations with complex roots.

## Rules of complex()

As the name suggests by the name, the complex() method returns a complex number.

If the string is passed to this method, which is not a valid complex number, the ValueError exception will be raised.

