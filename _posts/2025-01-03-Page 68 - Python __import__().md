---
title: Python __import__()
description: The __import__() is a built-in python function that is used to call the import statement.
date: 2025-01-03 22:42:23 +0800
categories: [Built in reference]
tags: [Built in reference]
image:
    path: /commons/Python __import__().png
    alt: Python __import__()
---

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
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

<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
### Example 1: How to use __import__() function in python?

```python
mathematics = __import__('math', globals(), locals(), [], 0)
print(mathematics.fabs(-2.5))
```

Output:
```
<script type="text/javascript">
	atOptions = {
		'key' : '98858c4e91885e00ea9926beee01c03e',
		'format' : 'iframe',
		'height' : 90,
		'width' : 728,
		'params' : {}
	};
</script>
<script type="text/javascript" src="https://www.highperformanceformat.com/98858c4e91885e00ea9926beee01c03e/invoke.js"></script>
2.5
```