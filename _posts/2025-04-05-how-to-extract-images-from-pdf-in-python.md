---
title: how to extract images from pdf in Python
description: In this tutorial, we will learn about how to extract images from pdf in python with different python libraries.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/how to extract images from pdf in Python.png
 alt: how to extract images from pdf in Python
---

Here first, we will learn about how to read pdf files in python, then extract them, and at last, we will save them.

## Read Pdf file in Python. 

We cannot read pdf files directly using python. Instead, we need to install the necessary libraries using pip package installation.

To read pdf files, we will use the [PyMuPDF](https://pymupdf.readthedocs.io/en/latest/) python package that can access files like PDF, OpenXPS, XPS, EPUB, and many other extensions. And to install PyMuPDF, we can follow the below step.

| pip install PyMuPDF |
| :---- |

We will use fitz() function, which is used to read or process pdf or other files with PyMuPDF.

Then we will use a fantastic python package called [Pillow](https://pypi.org/project/Pillow/), which is used for image processing and image manipulation.  
To install Pillow, we will use the below pip command.

| pip install Pillow |
| :---- |

We have to install the necessary libraries now. After that, we can follow the below steps to extract images from pdf files.

# Extract Images from pdf

**Step 1:** First, we will import the required packages.

| import fitz \# PyMuPDFimport iofrom PIL import Image |
| :---- |

**Step 2:** Now, we will read and process the pdf file into python.

| \# file path you want to extract images fromfile \= "DemoFile.pdf"\# open the filepdf\_file \= fitz.open(file) |
| :---- |

**Step 3:** In the final step, we will do the main code of the program by iterating a pdf file using for loop to process pdf pages one by one.

| \# iterate over PDF pagesfor page\_index in range(len(pdf\_file)):    \# get the page itself    page \= pdf\_file\[page\_index\]    image\_list \= page.getImageList()    \# printing number of images found in this page    if image\_list:        print(f"\[+\] Found a total of {len(image\_list)} images in page {page\_index}")    else:        print("\[\!\] No images found on page", page\_index)    for image\_index, img in enumerate(page.getImageList(), start=1):        \# get the XREF of the image        xref \= img\[0\]        \# extract the image bytes        base\_image \= pdf\_file.extractImage(xref)        image\_bytes \= base\_image\["image"\]        \# get the image extension        image\_ext \= base\_image\["ext"\]        \# load it to PIL        image \= Image.open(io.BytesIO(image\_bytes))        \# save it to local disk        image.save(open(f"image{page\_index+1}\_{image\_index}.{image\_ext}", "wb")) |
| :---- |

Here we will first check the number of pages inside the pdf file, and one by one, it will process the pages on the pdf file and detect the images inside the page, and once it finds it and saves it in the desired locations. 

Inside the iterator, we are making a list of all the images available inside the page using the getImageList(), and after that, we use the extractImage() function. 

Also, if you are interested to learn [Mouse and Keyboard automation using Python](https://pythonscholar.com/blog/mouse-and-keyboard-automation-using-python/), you must check this out.

The whole program will look as follow.

| import fitz \# PyMuPDFimport iofrom PIL import Image\# file path you want to extract images fromfile \= "DemoFile.pdf"\# open the filepdf\_file \= fitz.open(file)\# iterate over PDF pagesfor page\_index in range(len(pdf\_file)):    \# get the page itself    page \= pdf\_file\[page\_index\]    image\_list \= page.getImageList()    \# printing number of images found in this page    if image\_list:        print(f"\[+\] Found a total of {len(image\_list)} images in page {page\_index}")    else:        print("\[\!\] No images found on page", page\_index)    for image\_index, img in enumerate(page.getImageList(), start=1):        \# get the XREF of the image        xref \= img\[0\]        \# extract the image bytes        base\_image \= pdf\_file.extractImage(xref)        image\_bytes \= base\_image\["image"\]        \# get the image extension        image\_ext \= base\_image\["ext"\]        \# load it to PIL        image \= Image.open(io.BytesIO(image\_bytes))        \# save it to local disk        image.save(open(f"image{page\_index+1}\_{image\_index}.{image\_ext}", "wb")) |
| :---- |

# Extract text from pdf using PyPDF2 

In this method, we will use the [PyPDF2](https://pypi.org/project/PyPDF2/#description) package to extract the text, and in the method, we don't require other packages like the above method. We can directly extract text from pdf.

To install the PyPDF2 package, we will follow the below command on your respected operating systems.

| pip install PyPDF2 |
| :---- |

You can also use the PyPDF or PyPDF3 version, but all three versions will work.

Once the PyPDF2 package is installed, we will start to wring the program to read the pdf file, convert all the pages into text, and print it on the given destination terminal or IDE.  
Follow the below steps to extract text from the pdf file.

**Step 1:** The first step will be to import the PyPDF2 package.

| \#import the PyPDF2 moduleimport PyPDF2 |
| :---- |

**Step 2:** Now, we will read the pdf file and process it will the PyPDF2 using PdfFileReader() function.

| \#open the PDF filePDFfile \= open('DemoFile.pdf', 'rb')PDFfilereader \= PyPDF2.PdfFileReader(PDFfile) |
| :---- |

**Step 3:** Here, we will find the number of pages in our pdf files. This will print the total number of pages with an index starting from zero.

| \#print the number of pagesprint(PDFfilereader.numPages) |
| :---- |

**Step 4:** Now, we will specify the page we want to extract and print the text content of the given page.

| \#provide the page numberpages \= PDFfilereader.getPage(8)\#extracting the text in PDF fileprint(pages.extractText()) |
| :---- |

The extractText() function will extract all the text from the page specify in getPage() function.

**Step 5:** We will close a pdf file as our text has been extracted.

| \#close the PDF filePDFfile.close() |
| :---- |

The Whole program will look like this.

| \#import the PyPDF2 moduleimport PyPDF2\#open the PDF filePDFfile \= open('DemoFile.pdf', 'rb')PDFfilereader \= PyPDF2.PdfFileReader(PDFfile)\#print the number of pagesprint(PDFfilereader.numPages)\#provide the page numberpages \= PDFfilereader.getPage(8)\#extracting the text in PDF fileprint(pages.extractText())\#close the PDF filePDFfile.close() |
| :---- |

## Final Words

In this article, we have learned how to extract images from text from the pdf file, and reading pdf files in python code is not easy; it needs separate libraries to process and read it. But with our easy tutorial, we can very quickly extract the images and text from the pdf file. Also, please let us know via email if you have a suggestion for our blogs.

## FAQs

How do I extract images from a PDF?

PyMuPDF package is used to extract images from a pdf file in python.PyMuPDF extract images from PDF detecting all the images from the pdf file and please note that it will not convert pdf pages into images inside it will just extract image if there is one.

How do I convert a PDF to an image in Python?  
There are many ways to convert a pdf to an image in python we can use the pdf2image library which is the most popular in converting  pages into images.

How do I read a scanned PDF in Python?

Yes, you can read a scanned pdf in python using the PyMuPDF library.

How do I convert a PDF to a DataFrame in Python?

You can convert PDF to a DataFrame in python using pandas and tabula-py library but pdf must contain tabular data inside otherwise one data will be converted into a  dataframe. It will Extract specific data from PDF using Python if it will get the tabular or table data.

How do I convert PDF to PNG in Python?

Yes you can convert pdf pages into png format in python using pdf2image python package, which very easy to code and it will convert all the pdf pages into images in what format you want. We can also Convert PDF to image python opencv but it will be very hand and take long to convert it.