---
title: How to convert text to speech in python and speech to Text in Python
description: In this tutorial, we will learn various methods and ways to convert text to speech in python and speech to text in python.
date: 2025-04-05 12:21:06 +0800
categories: [Python]
tags: [python]
image:
 path: /commons/How to convert text to speech in python and speech to Text in Python.png
 alt: How to convert text to speech in python and speech to Text in Python
---

## What is Text to Speech?

Text-to-speech, or TTS, is a technology that enables computers to convert written text into spoken words. It is a technology that has been around for several decades but has seen significant advances in recent years, thanks to advancements in natural language processing and machine learning.

Text-to-speech technology is used in a variety of applications, including automated voice assistants, audiobooks, and navigation systems. It is also used to provide accessibility to individuals who are visually impaired, enabling them to consume digital content through audio.  
The technology works by analyzing written text and converting it into an audio file that can be played back through a speaker or headphones. The process involves several steps, including natural language processing, linguistic analysis, and audio synthesis.

First, the text is analyzed using natural language processing algorithms to identify the words and their meaning. The software then applies linguistic analysis to the text, determining the pronunciation of each word and the appropriate intonation, stress, and rhythm for the sentence.  
Finally, the software uses audio synthesis techniques to create a digital audio file that replicates the human voice, which can then be played back through a speaker or headphones.

## Use of text to speech technology

The quality of the TTS output is highly dependent on the quality of the software and the quality of the underlying voice database. Advances in machine learning have led to the development of more realistic and natural-sounding voices, with greater emotional range and variability.  
In recent years, TTS technology has been integrated into popular virtual assistants, such as Apple's Siri, Amazon's Alexa, and Google Assistant. This has led to increased interest in the technology, and a growing number of applications for TTS, from personalized audiobooks to language learning tools.

Despite the progress made in recent years, there are still challenges to overcome in developing truly human-like TTS. For example, generating natural-sounding speech in multiple languages and dialects remains a difficult problem. However, with continued research and development, the potential for TTS technology is vast, and it will likely play an increasingly important role in our digital lives in the future.

There are many technologies and methods in which we can convert text to speech in python for different results.

Let's see all the methods one by one

## Method 1: Text to speech in python using Google Text to Speech Library.

### What is Google Text to Speech Library in python?

The [Google Text-to-Speech](https://gtts.readthedocs.io/en/latest/) (gTTS) library in Python is a Python wrapper for the Google Text-to-Speech API. It allows developers to easily convert written text into natural-sounding audio speech in a variety of languages and voices using the power of Google's neural network.

With the gTTS library, developers can simply import the package, pass in the text to be spoken and the language, and then save the audio output to a file or play it directly. The library also supports customizable settings such as the speech rate and volume, as well as the option to save the audio output in various audio formats.

To use the gTTS library, developers will need to have an internet connection as the library requires access to the Google Text-to-Speech API to convert the text to speech. The library is compatible with Python 2 and 3, and can be installed using pip, the Python package manager.

Overall, the Google Text-to-Speech library in Python provides developers with a simple and convenient way to incorporate text-to-speech functionality into their applications, enabling them to enhance the user experience and accessibility of their software.

Here are the steps to use gTTS library:

### Example: How to make text to speech in python

**Step 1:** Install the gTTS library using pip:

| pip install gtts |
| :---- |

**Step 2:** Import the gTTS class from the gTTS library:

| from gtts import gTTS |
| :---- |

**Step 3:** Create an instance of the gTTS class and provide the text you want to convert to   
speech:

| tts \= gTTS('Hello, how are you?') |
| :---- |

**Step 4:** Save the speech to an MP3 file:

| tts.save('hello.mp3') |
| :---- |

That's it\! You now have an MP3 file with the text converted to speech.

The whole code will be like this:

| from gtts import gTTStts \= gTTS('Hello, how are you?')tts.save('hello.mp3') |
| :---- |

Now you can open the hello.mp3 file to hear the audio that we genaredted.

We will see how gTTS can be used in other languages.

By default, the gTTS library uses a female voice to generate the speech. However, you can change the voice to a male or any other voice by passing the lang parameter to the gTTS object.  
The lang parameter takes a language code as its value. You can find the list of available language codes and their corresponding voices in the gTTS documentation.

Here's an example code that demonstrates how to change the voice to a male voice:

| from gtts import gTTS\# create text-to-speech object with male voicetts \= gTTS(text='Hello, how are you?', lang='en-us')\# save audio filetts.save('hello.mp3') |
| :---- |

In this example, the lang parameter is set to en-us, which corresponds to the male English voice. You can try using different language codes to change the voice to other languages and accents.

In other langs in will be implemented as follow.

Here are some examples of different language codes and their corresponding voices that you can use with the gTTS library:

1. French (fr)  
   

| tts \= gTTS(text='Bonjour, comment ça va?', lang='fr') |
| :---- |

2. German (de)

| tts \= gTTS(text='Hallo, wie geht es Ihnen?', lang='de') |
| :---- |

3. Italian (it)

| tts \= gTTS(text='Ciao, come stai?', lang='it') |
| :---- |

4. Spanish (es)

| tts \= gTTS(text='Hola, ¿cómo estás?', lang='es') |
| :---- |

5. Portuguese (pt)

| tts \= gTTS(text='Olá, como está você?', lang='pt') |
| :---- |

6. Hindi (hi)

| tts \= gTTS(text='नमस्ते, आप कैसे हैं?', lang='hi') |
| :---- |

7. Mandarin Chinese (zh-cn)

| tts \= gTTS(text='你好，你怎么样？', lang='zh-cn') |
| :---- |

Note that not all languages are supported by gTTS. You can check the full list of supported languages in the gTTS documentation.

Now we will learn about speech to text in python.

## What is speech to text?

Speech to text, also known as speech recognition or voice recognition, is a technology that allows computers to understand and transcribe human speech into text. This technology has been developing for decades, but it has seen rapid progress in recent years due to advances in machine learning, artificial intelligence, and natural language processing.

The process of speech to text involves capturing audio recordings of human speech, which can come from a variety of sources such as microphones, phone calls, and videos. These recordings are then analyzed using complex algorithms that can distinguish between different words and phrases, identify individual speakers, and recognize patterns in speech.

The technology used in speech to text has improved greatly over the years, and it can now recognize speech with high accuracy in a variety of languages and accents. However, it is still not perfect and can sometimes make errors, especially when dealing with complex or technical language.

Speech to text has many practical applications. One of its most significant benefits is that it allows people with disabilities to communicate more easily. For example, individuals who are deaf or hard of hearing can use speech to text technology to read what others are saying in real-time. This can be especially useful in situations where they cannot hear, such as in noisy environments or on phone calls.

Speech-to-text is also widely used in the business world. Many companies use it to transcribe meetings, interviews, and customer service calls. This allows them to easily review and analyze these conversations for insights and to improve their operations.

In addition, speech to text is often used in virtual assistants and chatbots. These programs use speech recognition to understand what users are saying and respond appropriately. For example, a virtual assistant like Siri or Alexa can respond to voice commands to play music, check the weather, or answer questions.

Overall, speech to text is a rapidly evolving technology that has many potential benefits for individuals and businesses alike. As technology continues to improve, we can expect it to become even more widespread and useful in the years to come.

## How to make a speech to text in python

Making a speech to text in Python requires using a third-party library that supports speech recognition. One of the most popular libraries for speech recognition in Python is called "SpeechRecognition," which is an open-source library that provides easy-to-use interfaces to several popular speech recognition engines.

Here are the general steps to make speech to text in Python using the SpeechRecognition library:

Install the [SpeechRecognition](https://pypi.org/project/SpeechRecognition/) library: You can install the library using pip by running the following command in the command prompt or terminal:

| pip install SpeechRecognition |
| :---- |

Import the library: After installing the library, you can import it into your Python program using the following code:

| import speech\_recognition as sr |
| :---- |

Create a recognizer instance: Create an instance of the Recognizer class provided by the SpeechRecognition library:

| r \= sr.Recognizer() |
| :---- |

Open an audio file or stream: To convert speech to text, you need to provide an audio file or stream that contains the speech. You can open an audio file using the following code:

| with sr.AudioFile('path\_to\_audio\_file.wav') as source: audio \= r.record(source) |
| :---- |

Use the recognizer to recognize speech: Call the recognize\_google() method of the recognizer instance to convert the audio into text:

| text \= r.recognize\_google(audio) |
| :---- |

This method uses the Google Web Speech API to perform speech recognition.  
Print the output: Print the recognized text:

| print(text) |
| :---- |

That's it\! With these simple steps, you can make a speech to text in Python using the SpeechRecognition library. You can customize the library's settings to support different languages and accents, as well as adjust the audio parameters to optimize recognition accuracy.

One demonstrates how to use the SpeechRecognition library in Python to convert speech to text with live audio:

| import speech\_recognition as sr\# Create a recognizer instancer \= sr.Recognizer()\# Open a microphone streamwith sr.Microphone() as source:    print("Say something\!")    audio \= r.listen(source)\# Use the recognizer to recognize speechtry:    text \= r.recognize\_google(audio)    print("You said: " \+ text)except sr.UnknownValueError:    print("Sorry, I could not understand your speech")except sr.RequestError as e:    print("Error occurred: {0}".format(e)) |
| :---- |

In this example code, we first import the SpeechRecognition library and create an instance of the Recognizer class called r. We then use the statement to open a microphone stream and prompt the user to say something.

We capture the audio from the microphone stream using the ‘listen()’ method of the Recognizer instance r. We then pass this audio data to the ‘recognize\_google()’ method of the same instance to perform speech recognition.

If speech recognition is successful, we print the recognized text using the print() function. If the recognition fails due to an unknown value error or a request error, we print an appropriate error message.

Note that you need to have a working microphone and an active internet connection to use this example code. You may also need to install additional dependencies, such as PyAudio, to work with microphone streams.

So let's see the other methods that include Facebook’s Wav2vec model using huggingface and transformers.

But first what the hack is huggingface and transformers.

### What is huggingface?

[Hugging Face](https://huggingface.co/) is a company that provides a suite of state-of-the-art natural language processing (NLP) tools and models. The company's primary focus is on developing and promoting open-source NLP frameworks, libraries, and models that enable researchers and developers to build and deploy advanced NLP applications.

Hugging Face is best known for its Transformers library, which is an open-source NLP library built on top of PyTorch and TensorFlow. The Transformers library provides a high-level API for building, training, and deploying state-of-the-art NLP models, including pre-trained models such as BERT, GPT-2, and RoBERTa. The library also includes various tools and utilities for working with NLP data, such as tokenizers, data loaders, and evaluators.

In addition to the Transformers library, Hugging Face also provides a number of other NLP tools and models, such as the Datasets library, which provides a collection of preprocessed NLP datasets for research and development, and the Tokenizers library, which provides fast and customizable tokenization tools for NLP tasks.

Hugging Face's tools and models are widely used by researchers, developers, and businesses in a variety of industries, including healthcare, finance, and media. The company has a large and active community of contributors who help to develop, test, and maintain its open-source projects. Hugging Face also provides consulting and training services to businesses and organizations that want to leverage its NLP tools and models for their own applications.

Here we will use the Wav2vec model.

### What is Wav2vec?

[Wav2vec](https://ai.facebook.com/blog/wav2vec-20-learning-the-structure-of-speech-from-raw-audio/) is a speech recognition model developed by Facebook AI Research (FAIR). The model is based on a self-supervised learning approach, meaning that it learns from raw audio data without requiring transcriptions or annotations. Wav2vec is designed to learn representations of speech that can be used to improve speech recognition accuracy.

The core idea behind Wav2vec is to pre-train a neural network to predict the future audio samples of a waveform. This is done by splitting the waveform into small overlapping frames and training the network to predict the next frame given the previous ones. By doing so, the model learns to capture the complex temporal patterns and dependencies in speech data.

After pre-training, the Wav2vec model can be fine-tuned on a specific speech recognition task. This fine-tuning process involves training the model on a labeled dataset of audio recordings and their corresponding transcriptions. During fine-tuning, the pre-trained weights of the model are used as a starting point, and the model is further optimized to recognize the specific words and phrases in the dataset.

Wav2vec has achieved state-of-the-art performance on several speech recognition benchmarks, including the LibriSpeech and Switchboard datasets. The model has also been shown to be effective for other speech-related tasks, such as speaker identification and audio classification.

In addition to the original Wav2vec model, FAIR has also developed several variants and extensions, such as Wav2vec 2.0, which uses a contrastive learning approach to improve the pre-training process, and Wav2vec-U, which is designed for low-resource languages and can be trained with as little as one hour of transcribed speech data.

Now let's see the code for it.

Here's an example code for how to use Wav2vec 2.0 for speech recognition in Python using the Hugging Face Transformers library:

### Example: How to use Wav2vec to convert speech to text.

| import torchimport torchaudiofrom transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer\# Load the pre-trained Wav2Vec2 modelmodel \= Wav2Vec2ForCTC.from\_pretrained("facebook/wav2vec2-large-960h-lv60-self")\# Load the tokenizer for the modeltokenizer \= Wav2Vec2Tokenizer.from\_pretrained("facebook/wav2vec2-large-960h-lv60-self")\# Load an audio file to transcribeaudio\_file, \_ \= torchaudio.load("example.wav")\# Tokenize the audio waveforminput\_values \= tokenizer(audio\_file, return\_tensors="pt").input\_values\# Transcribe the audio using the Wav2Vec2 modelwith torch.no\_grad():    logits \= model(input\_values).logits\# Decode the output of the model into textpredicted\_ids \= torch.argmax(logits, dim=-1)transcription \= tokenizer.decode(predicted\_ids\[0\])print("Transcription:", transcription) |
| :---- |

In this code, we first load the pre-trained Wav2Vec2 model and the corresponding tokenizer from the Hugging Face model hub. We then load an example audio file using the Torchaudio library.

Next, we tokenize the audio waveform using the Wav2Vec2 tokenizer and feed it into the Wav2Vec2 model to generate logits. We use the logits to decode the most likely transcription using the tokenizer's decode() method.

Finally, we print the transcribed text. Note that this code assumes that the input audio file is in the WAV format and has a sample rate of 16kHz. You may need to modify the code to handle other audio formats or sample rates.

Now we will see an example of the most awesome OpenAI Whisper library.

### What is OpenAI Whisper?

[OpenAI Whisper](https://openai.com/research/whisper) is a research project that focuses on improving the efficiency and accuracy of large-scale language models, such as OpenAI's GPT-3. One of the primary objectives of the project is to reduce the amount of computation required for training language models while maintaining or even improving their performance

To achieve this goal, the Whisper project employs a technique called "distillation," which involves training a smaller, more efficient model to mimic the behavior of a larger model. By doing so, the smaller model can achieve similar levels of accuracy as the larger model, but with significantly fewer computational resources. This technique is intended to address one of the key challenges of training large-scale language models, which is the high computational cost and the large amount of data required to achieve high accuracy.

The Whisper project also focuses on enabling training on smaller datasets, which can be especially valuable for low-resource languages and applications where obtaining large amounts of training data may be challenging. To achieve this, the project explores the use of techniques such as few-shot and zero-shot learning, which allow models to learn from a small number of examples or even no examples at all.

One potential application of the Whisper project is in the field of speech recognition, where language models are commonly used to transcribe spoken words into written text. By enabling the development of more efficient and accurate language models that can be trained on speech data, the Whisper project could potentially lead to significant improvements in speech recognition technology.

However, it's important to note that the Whisper project is still in the research phase, and there is no guarantee that its techniques will be widely adopted or that they will lead to significant improvements in language models or speech recognition. Nonetheless, the project represents an important step forward in the development of more efficient and accurate AI models, and it has the potential to enable new applications and innovations in the field of natural language processing.

Now let's see the code for it.

To install whisper in python use the below command.

| pip install \-U openai-whisper |
| :---- |

### Example: Speech to text using openai whisper in python.

| import whispermodel \= whisper.load\_model("base")\# load audio and pad/trim it to fit 30 secondsaudio \= whisper.load\_audio("audio.mp3")audio \= whisper.pad\_or\_trim(audio)\# make log-Mel spectrogram and move to the same device as the modelmel \= whisper.log\_mel\_spectrogram(audio).to(model.device)\# detect the spoken language\_, probs \= model.detect\_language(mel)print(f"Detected language: {max(probs, key=probs.get)}")\# decode the audiooptions \= whisper.DecodingOptions()result \= whisper.decode(model, mel, options)\# print the recognized textprint(result.text) |
| :---- |

We hope this amazing tutorial are helpful to you.