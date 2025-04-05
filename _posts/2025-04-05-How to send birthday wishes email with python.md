---
title: How to send birthday wishes email with python
description: In this article, we will learn various techniques and methods on how to send birthday wishes email with python.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/How to send birthday wishes email with python.png
 alt: How to send birthday wishes email with python
---

If you want to know about automating boring keyword and mouse talk, I strongly suggest checking this article on [Mouse and Keyboard automation using Python](https://pythonscholar.com/blog/mouse-and-keyboard-automation-using-python/).

## Why automate birthday wishes email?

In the generation of social media and busy life, people often forget to wish their loved ones, family, and friends on their birthday. Reason can be anything like you were busy, or you are bad at remembering dates just like me. That can make it difficult to remember all the birthday dates of the people we know.

So what we can do to tackle this task, as developers or python developers, is to automate this whole process at once so that we can wish everyone on their birthdays.

Now lets us know what we need to accomplish our task of sending birthday wishes email using python.

## Method to How to send birthday wishes email with python

### **Prerequisites python libraries:**

* Pandas  
* DateTime  
* smtplib

First, let's understand what these libraries are used for in python.

#### **Pandas:**

Pandas is mainly used to create, edit and manipulate the dataset or data frame and are Mostly used in machine learning and data science work. Pandas is one of the most powerful tools for Machine learning. Pandas is specially used for data manipulation and analyzing large data.

#### **DateTime:**

DataTime libraries add Dates and time zones in python. It can print or be used as an object in various tasks. We will use it to schedule the tasks as per of requirement.

#### **smtplib:**

The smtplib is used to add mailing operations like sending and receiving an email with all the mailing functionalities like adding a subject, attachment, and other things in python code. Smtplib uses SMTP mailing protocol, which stands for Simple Mail Transfer Protocol.

### **How to install python libraries?**

I highly recommend beginner python developers to make a virtual environment with every python project because once in the future, you might face issues related to python libraries version issues.

#### **How to make a virtual environment in python?**

Fellow the below steps to create the virtual environment in python.

python \-m venv virtual\_enviroment\_name

Here, we are using the venv python argument to create a virtual environment followed by the name whatever you name it.

Now let's active our virtual environment and install our packages.

#### **How to an active virtual environment in python?**

For windows, the user uses the below command.

virtual\_enviroment\_name\\Script\\activate.

For Linux and mac os users, use the below command.

source virtual\_enviroment\_name\\bin\\activate.

As we are creating a now, let's install python packages.

Use the below steps to install pandas and smtplib package, as DateTime is already built-in with python, so there is no need to install it separately.

pip install \-U pandas smtplib

| def MainCode():        \#Read CSV file using pandas        dataframe \= pd.read\_csv(r"birthday\_list.csv")    print(dataframe)    \#check todays Time and date    today \= datetime.now().strftime("%d-%m")    \#check Year format    currentYear \= datetime.now().strftime("%Y")    \#index where we store which friends birthday are wished    friend= \[\]    for index,item in dataframe.iterrows():        msg \= "Happy Birthday To My Dear " \+ str(item\['name'\]+ "Wish you many many happy returns of the day")        \#getting the birthdate from the excel sheet        bday \= datetime.strptime(item\['birthday'\], "%Y-%d-%m")        bday \= bday.strftime("%d-%m")        \#check the conditions, if matching send the birthday message        if (today \== bday) and currentYear not in str(item\['year'\]):            \#call the functions            SendEmailFunc(item\['email'\], "Happy Birthday", msg)            friend.append(index)    for i in friend:                yr \= dataframe.loc\[i, 'year'\]        dataframe.loc\[i, 'year'\] \= str(yr) \+ ',' \+ str(currentYear) |
| :---- |

**Step 5:**  We will end the code by running the MainCode() function.

| if \_\_name\_\_ \== "\_\_main\_\_":    MainCode() |
| :---- |

And the whole program will be look like this.

| import pandas as pdimport timefrom datetime import datetimeimport smtplibEMAIL \= "Your\_Email"PassWD \= "Your\_Email\_Password"def SendEmailFunc(send\_to,email\_subject,wish\_msg):    \#Setup gmail with SMTP     smtp\_email \= smtplib.SMTP("smtp.gmail.com",587)    \#initialize the smtp session    smtp\_email.starttls()    \#login with the credentials    smtp\_email.login(EMAIL,PassWD)    print(smtp\_email)    \#Setup Email template to sent email with arguments    smtp\_email.sendmail(EMAIL,send\_to, f"Subject: {email\_subject}\\n\\n{wish\_msg}")    \#Ending the session    smtp\_email.quit()    print("Birthday Email successfully sent to" \+ str(send\_to) \+ "\\n The subject is: " \+ str(email\_subject) \+ "\\nThe message is:" \+ str(wish\_msg))def MainCode():        \#Read CSV file using pandas        dataframe \= pd.read\_csv(r"birthday\_list.csv")    print(dataframe)    \#check todays Time and date    today \= datetime.now().strftime("%d-%m")    \#check Year format    currentYear \= datetime.now().strftime("%Y")    \#index where we store which friends birthday are wished    friend= \[\]    for index,item in dataframe.iterrows():        msg \= "Happy Birthday To My Dear " \+ str(item\['name'\]+ "Wish you many many happy returns of the day")        \#getting the birthdate from the excel sheet        bday \= datetime.strptime(item\['birthday'\], "%Y-%d-%m")        bday \= bday.strftime("%d-%m")        \#check the conditions, if matching send the birthday message        if (today \== bday) and currentYear not in str(item\['year'\]):            \#call the functions            SendEmailFunc(item\['email'\], "Happy Birthday", msg)            friend.append(index)    for i in friend:                yr \= dataframe.loc\[i, 'year'\]        dataframe.loc\[i, 'year'\] \= str(yr) \+ ',' \+ str(currentYear)if \_\_name\_\_ \== "\_\_main\_\_":    MainCode() |
| :---- |

Now you can add your Gmail account and check by giving a current date for testing purposes, and you check that our code is working like a charm.

## Method to How to send birthday wishes SMS with python

In this method, we will send a text SMS to the mobile number person, as we did in the previous method to send an email.

Here we will use almost the same code but change only one function. Instead of stmp, we will use win10toast and request a library for integrating the API.

We will use [Fast2sms](http://www.fast2sms.com) API services to send the SMS. Also, we need to create the account in order to access the API and get API credentials.

So let's first install the wintoast in our virtual movement. Also, we will not install the request because it already comes built-in.

Follow the below command to install win10toast.

| pip install win10toast |
| :---- |

Now, let's get started by following the below steps.

**Step 1:** We will import the libraries we need.

| import pandas as pdimport timefrom datetime import datetimeimport requestsfrom win10toast import ToastNotifier |
| :---- |

**Step 2:** We will initialize ToastNotifier and create a toast object.

| \#initialize the ToastNotifiertoast \= ToastNotifier() |
| :---- |

**Step 3:** Now, we will create a function to take necessary arguments and apply them to our Fast2sms API.

| def SendSMSFunc(send\_to,msg,name,subject):    url \= "https://www.fast2sms.com/dev/bulk"    payload \= f"sender\_id=FSTSMS\&message={msg}\&language=english\&route=p\&numbers={to}"         headers \= {        'authorization': "YOUR\_API\_KEY\_HERE",        'Content-Type': "application/x-www-form-urlencoded",        'Cache-Control': "no-cache",        }     SMS\_obj \= requests.request("POST", url,                                data \= payload,                                headers \= headers)    print(response\_obj.text)    print("SMS sent to " \+ str(to) \+ " with subject :" \+          str(sub) \+ " and message :" \+ str(msg))         toast.show\_toast("SMS Sent\!" ,                     f"{name} was sent message",                     threaded \= True,                     icon\_path \= None,                     duration \= 6\)     while toast.notification\_active():        time.sleep(0.1) |
| :---- |

**Step 4:** In this step we will create a function to take required infromation from the csv file and use them as an arguments inside a SendSMSFunc() function.

| def MainCode():        \#Read CSV file using pandas        dataframe \= pd.read\_csv(r"birthday\_list.csv")    print(dataframe)    \#check todays Time and date    today \= datetime.now().strftime("%d-%m")    \#check Year format    currentYear \= datetime.now().strftime("%Y")    \#index where we store which friends birthday are wished    friend= \[\]    for index,item in dataframe.iterrows():        msg \= "Happy Birthday To My Dear " \+ str(item\['name'\]+ "Wish you many many happy returns of the day")        \#getting the birthdate from the excel sheet        bday \= datetime.strptime(item\['birthday'\], "%Y-%d-%m")        bday \= bday.strftime("%d-%m")        \#check the conditions, if matching send the birthday message        if (today \== bday) and currentYear not in str(item\['year'\]):            \#call the functions            SendSMSFunc(item\['contact'\], "Happy Birthday", msg)            friend.append(index)    for i in friend:                yr \= dataframe.loc\[i, 'year'\]        dataframe.loc\[i, 'year'\] \= str(yr) \+ ',' \+ str(currentYear)  \#  dataframe.to\_excel('birthday\_list.csv', index=False) |
| :---- |

**Step 5:** Now we will send our program by calling the MainCode() inside the init code.

| if \_\_name\_\_ \== "\_\_main\_\_":    MainCode() |
| :---- |

So our program on how to send birthday wishes sms with python is ready and the whole code will be look like this.

| import pandas as pdimport timefrom datetime import datetimeimport requestsfrom win10toast import ToastNotifier\#initialize the ToastNotifiertoast \= ToastNotifier()def SendSMSFunc(send\_to,msg,name,subject):    url \= "https://www.fast2sms.com/dev/bulk"    payload \= f"sender\_id=FSTSMS\&message={msg}\&language=english\&route=p\&numbers={to}"         headers \= {        'authorization': "YOUR\_API\_KEY\_HERE",        'Content-Type': "application/x-www-form-urlencoded",        'Cache-Control': "no-cache",        }     SMS\_obj \= requests.request("POST", url,                                data \= payload,                                headers \= headers)    print(response\_obj.text)    print("SMS sent to " \+ str(to) \+ " with subject :" \+          str(sub) \+ " and message :" \+ str(msg))         toast.show\_toast("SMS Sent\!" ,                     f"{name} was sent message",                     threaded \= True,                     icon\_path \= None,                     duration \= 6\)     while toast.notification\_active():        time.sleep(0.1)def MainCode():        \#Read CSV file using pandas        dataframe \= pd.read\_csv(r"birthday\_list.csv")    print(dataframe)    \#check todays Time and date    today \= datetime.now().strftime("%d-%m")    \#check Year format    currentYear \= datetime.now().strftime("%Y")    \#index where we store which friends birthday are wished    friend= \[\]    for index,item in dataframe.iterrows():        msg \= "Happy Birthday To My Dear " \+ str(item\['name'\]+ "Wish you many many happy returns of the day")        \#getting the birthdate from the excel sheet        bday \= datetime.strptime(item\['birthday'\], "%Y-%d-%m")        bday \= bday.strftime("%d-%m")        \#check the conditions, if matching send the birthday message        if (today \== bday) and currentYear not in str(item\['year'\]):            \#call the functions            SendSMSFunc(item\['contact'\], "Happy Birthday", msg)            friend.append(index)    for i in friend:                yr \= dataframe.loc\[i, 'year'\]        dataframe.loc\[i, 'year'\] \= str(yr) \+ ',' \+ str(currentYear)  \#  dataframe.to\_excel('birthday\_list.csv', index=False)if \_\_name\_\_ \== "\_\_main\_\_":    MainCode() |
| :---- |

## Conclusion

We hope you guys have learned many thighs from our How to send birthday wishes email with python tutorial. Also, we have learned how to send birthday wishes SMS using python.

## FAQs

How do you automatically send birthday wishes in Python?

We can use python along with DateTime and smtplib packages to automatically send birthday wishes in python.

How do you automate birthday emails?

The smtplib library in python is used to send automated birthday emails.