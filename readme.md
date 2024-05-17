# Mandala
## [Mandala is now ONLINE!](https://typemaster32.github.io/Mandala/)

#### Instructions
* Uses microphone for instruction;
* Press **"A"** to trigger a random transition (without microphone); 
* Press **"S"** to save the image;

#### Click here:
[Spring Show Version](https://typemaster32.github.io/Mandala/)
#### Or copy link:
https://typemaster32.github.io/Mandala/
![circle,spherical,aligned,beautiful---circle,4 (1)](https://github.com/Typemaster32/Mandala/assets/70934733/7dace92f-c5dd-43a6-bb0d-14311ad05bd5)

## Introduction
**2024 ITP Spring Show Project by Tammana Jain & Jiaqi Yi**
**Course Project of _The Nature of Code_ by Daniel Shiffman**

#### Check Our Sites
* [Tammy(Soon Available)]
* [This is Jiaqi Yi](whyjq.com)
* [_The Nature of Code_](https://natureofcode.com/)

#### Our Idea of This Project
Tammy: I think it would be great to have those wonderful patterns in the screens and reactive to minds!
Jiaqi: Yes, and we can have smooth transition between all shapes!

## If You Want to Create a Pattern (guide of reading the source code):
#### Understand
* **Understand: pattern = arrangement + fractals**
* arrangement handles "x,y,a,d" for every fractal: coordinate of the center points; angle of rotation; diameter.
* fractals handles the exact shape of everything, pay attention to the _.shape_, which has the format of [[[x1,y1,x2,y2,angle]/*line 1*/,[x1,y1,x2,y2,angle]/*line 2*/]/*shape 1*/,[]/*shape 2*/]
* remember x1,y1,x2,y2 are factors to "d"(diameter), so usually _x1,y1,x2,y2 ∈ [-0.5, 0.5]_. And we're using radian, so generally _angle ∈ [-PI, PI]_.
* **If you find it hard to understand, consider plan B ↓↓↓**

#### A. Do It Yourself
* Go to presetArrangementTest(or presetFractalTest), copy it, and name it into something you like! This function returns an instance of the arrangement or fractal.
* Modify the function with the guide above;
* in _.name_, give it a value like ["alpha","beta"], which is the keyword you're going to call;
* Declaire an variable globally to hold the object returned by the function you just created;
* If it is an arrangement, put it into "pasAll". If it is a fractal, put into "pfsAll";
* **If you find the code hard to read, consider plan B ↓↓↓**

#### B. Give Us Some Inspirations!
* Post your idea in the comments! It can be textual description, draft, image...**WHATEVER YOU LIKE! We appreciate all contributions!**
