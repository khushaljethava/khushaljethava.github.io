---
title: Python memoryview() Method
description: The memoryview() is a built-in python method that returns a memory allocated by the specified object .
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
  path: /commons/Python memoryview() Method.webp
  alt: Python memoryview() Method
---

The Python `memoryview()` built-in function creates a memory view object that exposes the internal buffer of an object supporting the buffer protocol, such as `bytes` and `bytearray`. It accepts a single parameter — the object whose internal data you want to access — and returns a `memoryview` object that lets you read and, in the case of mutable types like `bytearray`, modify the underlying data without copying it. This is particularly valuable when working with large binary datasets, image processing buffers, or network packet payloads where creating copies of data would waste memory and slow down execution.

By slicing a `memoryview`, you obtain a new view into the same memory rather than allocating a new buffer, which makes operations on large byte sequences significantly more efficient. The function is commonly used in performance-critical code that processes binary file formats, communicates over sockets, or manipulates byte-level data structures in scientific computing pipelines.

Understanding `memoryview()` is essential for any Python developer who works close to the metal — dealing with raw binary data, network streams, or shared memory between processes. This guide covers the full syntax, parameters, multiple real-world examples, edge cases, tips, and frequently asked questions.

---

## What does memoryview() return?

The `memoryview()` function returns a `memoryview` object that provides a buffer-oriented view of the underlying binary data, allowing element access by index and zero-copy slicing of the original buffer. When you print a `memoryview` object directly, Python displays its memory address rather than the actual data, because the view is just a reference to an existing buffer, not a standalone sequence.

---

## When should you use memoryview()?

Use `memoryview()` when you need to manipulate slices of large binary data without copying the bytes into new objects — for example, when processing binary file formats, streaming network data, or working with shared memory buffers in high-performance applications.

All objects in Python require storage space at runtime, and `memoryview()` gives you direct access to that allocated storage without triggering additional allocations. This makes it a powerful tool for scenarios where every byte of memory and every microsecond of CPU time counts.

---

## Syntax of memoryview()

The syntax of `memoryview()` is straightforward:

```python
memoryview(object)
```

### Parameters

The `memoryview()` method takes only one parameter:

| Parameter | Description |
|-----------|-------------|
| `object`  | A bytes-like object that supports the buffer protocol, such as `bytes`, `bytearray`, or objects that implement `__buffer__`. |

### Return Value

Returns a `memoryview` object that references the internal buffer of the provided object. Indexing a `memoryview` of a `bytes` or `bytearray` object returns an integer (the byte value at that position). Slicing returns another `memoryview` object over the same buffer.

---

## Example 1: Basic usage of memoryview()

The simplest use is to create a memory view over a `bytes` literal and access individual bytes by index.

```python
x = memoryview(b"Hello")

print(x)           # Shows memory address
print(x[0])        # Unicode/byte value of 'H'
print(x[1])        # Unicode/byte value of 'e'
print(bytes(x))    # Convert back to bytes
```

Output:

```
<memory at 0x7f9efbddadc0>
72
101
b'Hello'
```

Notice that `x[0]` returns `72`, which is the ASCII code for the character `'H'`. Indexing a `memoryview` over bytes always gives you the integer value of that byte, not the character itself.

---

## Example 2: Using memoryview() with bytearray for in-place modification

One of the most powerful features of `memoryview()` is that when the underlying object is mutable — like `bytearray` — you can write back to the buffer without creating a new object.

```python
data = bytearray(b"Hello, World!")
view = memoryview(data)

# Modify the first 5 bytes in-place
view[0:5] = b"Howdy"

print(data)  # bytearray(b'Howdy, World!')
```

Output:

```
bytearray(b'Howdy, World!')
```

This is zero-copy modification. The `view` is just a window into `data`; when you assign to a slice of the view, you directly overwrite the bytes in `data` without allocating any intermediate buffer. This pattern is extremely efficient for patching fields in binary protocols or modifying sections of a large buffer.

---

## Example 3: Zero-copy slicing for performance

When processing large binary files or data streams, slicing a `memoryview` is far cheaper than slicing `bytes` or `bytearray` objects directly, because slicing a `memoryview` never copies the underlying data.

```python
import time

large_data = bytearray(10_000_000)  # 10 MB buffer

# Slicing bytearray copies data
start = time.perf_counter()
for _ in range(1000):
    chunk = large_data[1000:2000]
elapsed_bytes = time.perf_counter() - start

# Slicing memoryview does NOT copy data
view = memoryview(large_data)
start = time.perf_counter()
for _ in range(1000):
    chunk = view[1000:2000]
elapsed_view = time.perf_counter() - start

print(f"bytearray slicing: {elapsed_bytes:.4f}s")
print(f"memoryview slicing: {elapsed_view:.4f}s")
```

On most systems, the `memoryview` slicing loop runs significantly faster because it avoids copying 1000 bytes per iteration. The savings become enormous when the slices are large or the loop runs millions of times.

---

## Example 4: Reading structured binary data

`memoryview()` integrates naturally with the `struct` module to parse binary file headers or network packets without copying data.

```python
import struct

# Simulate a binary packet: 4-byte int, 2-byte short, 2-byte short
packet = bytearray(struct.pack(">I H H", 305419896, 1024, 2048))
view = memoryview(packet)

# Parse fields from specific offsets using slices of the view
msg_id = struct.unpack_from(">I", view, 0)[0]
width  = struct.unpack_from(">H", view, 4)[0]
height = struct.unpack_from(">H", view, 6)[0]

print(f"Message ID: {msg_id}")
print(f"Width: {width}, Height: {height}")
```

Output:

```
Message ID: 305419896
Width: 1024, Height: 2048
```

`struct.unpack_from()` accepts a buffer, so you can pass the `memoryview` directly and specify the offset. This avoids creating intermediate byte slices just to unpack values.

---

## Real-World Use Cases

### Binary file I/O

When reading a large binary file into a `bytearray`, you can create a memory view to parse specific sections — such as file headers, index tables, and data blocks — without copying any bytes. This approach is especially useful when processing image files (BMP, PNG raw buffers), audio streams (WAV PCM data), or custom serialized formats.

### Network programming

When sending data over sockets, you can use `memoryview` to send only a portion of a pre-allocated buffer. The built-in `socket.send()` method accepts a `memoryview`, so you can track how many bytes have been sent and advance a view offset to send the remainder without rebuilding the buffer.

```python
import socket

data = memoryview(bytearray(b"HTTP/1.1 200 OK\r\n\r\nHello"))
# In a real send loop:
# sent = 0
# while sent < len(data):
#     sent += sock.send(data[sent:])
```

### Scientific computing and image processing

Libraries like NumPy expose their internal arrays through the buffer protocol, so you can create a `memoryview` of a NumPy array and pass it to C extensions or other libraries that consume raw buffers. This enables zero-copy interoperability between Python and native code.

---

## Edge Cases and Pitfalls

**1. `bytes` objects are immutable through a memoryview.**
You cannot assign to slices of a `memoryview` backed by a `bytes` object. Attempting to do so raises `TypeError: cannot modify read-only memory`.

```python
x = memoryview(b"hello")
x[0] = 72  # TypeError: cannot modify read-only memory
```

**2. Casting changes the element type.**
You can call `view.cast('I')` to reinterpret the buffer as 4-byte unsigned integers. The total byte length must be divisible by the new item size, or you get a `ValueError`.

**3. Releasing the underlying buffer.**
If the object that owns the buffer is garbage-collected or explicitly closed, accessing the `memoryview` raises a `ValueError`. Always ensure the source object outlives the view.

**4. Not all objects support the buffer protocol.**
Passing an unsupported type (e.g., a plain `list` or `str`) raises `TypeError: a bytes-like object is required`. Only `bytes`, `bytearray`, `array.array`, NumPy arrays, and similar buffer-protocol objects are accepted.

---

## Rules of memoryview()

- The passed object must support the buffer protocol (expose internal binary data).
- Indexing returns an integer byte value (for 1D byte buffers).
- Slicing returns a new `memoryview` over the same buffer — no copy is made.
- Modifications through a `memoryview` backed by a `bytearray` are reflected immediately in the original object.
- A `memoryview` backed by a `bytes` object is read-only.

---

## Tips and Best Practices

- **Prefer `memoryview` over repeated slicing** when you need to process different sections of a large buffer in a loop. Each slice of a `memoryview` costs almost nothing compared to slicing a raw `bytearray`.
- **Use `tobytes()` to convert back** when you need an actual `bytes` object for an API that does not accept a buffer: `view[10:20].tobytes()`.
- **Release the view explicitly** by calling `view.release()` when you are done, especially in long-running services, to free the underlying buffer sooner and avoid memory-pinning issues.
- **Combine with `struct.unpack_from()`** to parse binary protocols efficiently without intermediate copies.
- **Use `view.cast()` for typed access** when treating a byte buffer as an array of integers, floats, or other fixed-width types.

---

## Frequently Asked Questions

**Q1: What is the difference between `bytes`, `bytearray`, and `memoryview`?**
`bytes` is an immutable sequence of bytes. `bytearray` is a mutable sequence of bytes. `memoryview` is not a container of bytes at all — it is a view (a reference) into the internal buffer of another bytes-like object. It does not own any data; it just provides a window into existing data. Slicing a `memoryview` never allocates new memory, while slicing `bytes` or `bytearray` always does.

**Q2: Can I use memoryview() with strings?**
No. Python `str` objects are text (Unicode), not binary data, and they do not support the buffer protocol. You must encode the string to `bytes` or `bytearray` first: `memoryview(my_string.encode('utf-8'))`.

**Q3: Does memoryview() work with NumPy arrays?**
Yes. NumPy arrays implement the buffer protocol, so `memoryview(np_array)` creates a view over the array's internal data. This is useful for zero-copy data sharing between NumPy and Python code that processes raw bytes, or between NumPy and C extensions. Keep in mind that the `memoryview` will reflect the array's data type and shape.

---

If you are working with byte-level data, you may also find the [Python bytes()](/posts/Python-bytes()/) and [Python bytearray()](/posts/Python-bytearray()/) functions useful for creating the buffer objects that `memoryview()` operates on.
