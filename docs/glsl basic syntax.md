---
tags: [glsl]
---
# glsl basic syntax

### variables
- `bool` boolean value, true or false
- `int` signed integer number
- `float` fractional number
- bvec2, bvec3, bvec4: Boolean vector
- ivec2, ivec3, ivec4: Integer vector
- vec2, vec3, vec4: Floating point vector
```glsl
int position;
bool a, b;
bool c = true;
int v = 1
```
```glsl
//Declares a 3D medium precision floating point
//vector with components (1,2,3)
vec3 v(1.0, 2.0, 3.0);
//Create a low precision 2D vector with all
//components set to 2
lowp vec2 p = vec2(2.0);  
//Unpack first 3 components from v into q and
//set last component to 1.0
highp vec4 q = vec4(v, 1.0);  
//A 2D boolean vector with true and false
//components
bvec2 foo(true, false);
//A 3D integer vector with components 1,0,-1
ivec3 q(1,0,-1);
```

### operator
- `+,-,*,/,<,>,<=,>=,==,!=`, operator
- `=, +=,-=,*=,/=,++,-- `, assignment operator

```glsl
//Declare floats x and y
mediump float x = 1.0, y = -2.0;

//Now: z = x + 3 * y = -5
mediump float z = x + 3.0 * y;

//Add 1 to x, so now: x = 2
x++;  

//Now: z = -1
z += 2.0 * x;
```

### procedures
```glsl
//Declare a subroutine called "addTwoInts"
//with return type "int" that accepts two
//arguments, "x" and "y" both int type
int addTwoInts(int x, int y) {
  //Use a return statement to return a value
  return x + y;
}

//To declare a subroutine that does not
//return a value, give it the return type "void"
void doNothing() {
}
```

### precision specifier
- `lowp`, lowest precision
- `mediump`, default medium precision
- `highp`, highest precision  
```glsl
// Declare a low precision float called t
lowp float t = 1.0;  
mediump float middle;
highp float zzz = -1.5;
```
```glsl
precision highp float;  
//Equivalent to: highp float x = -0.1;
float x = -0.1;  
```

### constans
```glsl
const highp float PI = 3.14159265359;
```
### in/out
- `in` passes the argument by value (default)
- `inout` pass the argument by reference
- `out` the argument not initialized, writing too the value update the parameter
- `const` the argument is constant value  
```glsl
precision mediump float;

void testFunction(
  in float x,
  inout float y,
  out float z,
  const float w
) {
  x += 1.0;
  y += x;
  z = x + y + w;
}

void test() {
  float x=1.0, y=1.0, z=0.0, w=-1.0;

  testFunction(x, y, z, w);

  //Now:
  //  x == 1.0
  //  y == 3.0
  //  z == 4.0
  //  w == -1.0
}
```

### built-ins functions
- Unit conversion: `radians`, `degrees`
- Trigonometry: `sin`, `cos`, `tan`, `asin`, `acos`, `atan`
- Calculus: `exp`, `log`, `exp2`, `log2`
- Algebra: `pow`, `sqrt`, `inversesqrt`
- Rounding: `floor`, `ceil`, `fract`, `mod`, `step`
- Magnitude: `abs`, `sign`, `min`, `max`, `clamp`
- Interpolation: `mix`
- Geometric: 
    + `length(p)` returns the euclidean length of p
    + `distance(a,b)` returns the euclidean distance between a and b
    + `dot(a,b)` computes vector dot product of a and b
    + `cross(a,b)` computes the cross product of two 3 vectors
    + `normalize(a)` rescales a to unit length
    + `faceforward(n, I, nr)` reorient a normal to point away from a surface
    + `reflect(I, N)` - reflects a vector I along the axis N
    + `refract(I, N, eta)` - applies a refractive transformation to I according to Snell's law

### swizzles
syntactic sugar, `xyzw`, `rgba`, and `stuv`
```glsl
vec4 p = vec4(1, 2, 3, 4);
vec2 q = p.xy;   //q = vec2(1, 2)
vec3 r = p.bgr;  //r = vec3(3, 2, 1)
vec3 a = p.xxy;  //a = vec3(1, 1, 2)
```
```glsl
vec4 a = vec4(1, 2, 3, 4);
vec4 b = vec4(5, 6, 7, 8);

vec4 c = a + b;    //c = vec4(6, 8, 10, 12);
vec4 d = a * 3.0;  //d = vec4(3, 6, 9, 12);
vec4 e = a * b;    //e = vec4(5, 12, 21, 32);
```

### loop
terminate loop with `break` or skip iteration with `continue`
```glsl
// for
float x = 0.0;
for(int i=0; i<100; ++i) {
  x += i;   //Executes 100 times
}
// while
int i = 0;
while(i < 10) {
  i = i + 1;
}
```

### matrices
 mat2, mat3, mat4 which correspond to a 2x2, 3x3 and 4x4 square matrix respectively. [^Matrix]
```glsl
//Create a a 2x2 identity matrix.  Note matrix
//constructors are in column major order.
mat2 I = mat2(1.0, 0.0,
              0.0, 1.0);

//Equivalently,
mat2 I = mat2(1.0);

//Matrices can also be constructed by
//giving columns:
vec3 a = vec3(0, 1, 0);
vec3 b = vec3(2, 0, 0);
vec3 c = vec3(0, 0, 4);
mat3 J = mat3(a, b, c);

//Now:
//J = mat3(0, 2, 0,
//         1, 0, 0,
//         0, 0, 4);
```
```glsl
mat3 m = mat3(1.1, 2.1, 3.1,
              1.2, 2.2, 3.2,
              1.3, 2.3, 3.3);

//Read out first column of m
vec3 a = m[0];

//Now: a = vec3(1.1, 2.1, 3.1);
```

---
[^Matrix]: [Matrix_(mathematics) - Wikipedia](https://en.wikipedia.org/wiki/Matrix_(mathematics))