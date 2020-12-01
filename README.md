# Styled-Shapes

[![NPM](https://nodei.co/npm/styled-shapes.png)](https://npmjs.org/package/styled-shapes)


[Styled-System](https://styled-system.com/) compatible shapes for use in your JSX

![demo](./demo.png)

Checkout [Storybook for some examples / demos](https://patrickdbakke.github.io/styled-shapes/?path=/story/more-examples--more-examples). 

# Usage

`npm i styled-shapes`

```
import { Shape, star, hexagon } from 'styled-shapes';

const Star = () => <Shape path={star}/>;
const CustomShape = () => <Shape path="M 0,0 1,0, 1,1, 0,1 Z"/>;
const ShapeWithBordersAndShadow = () => <Shape path={hexagon} border="1px solid black" boxShadow="0 0 .5em rgba(0,0,0,.5)"/>;
```

# Supported [Styled-System](https://styled-system.com/api) APIs

- Space
- Color
- Typography
- Layout
- Flexbox
- Background
- Border
- Shadow
- Grid

### Color
```
<Shape color="blue" background="red" path={star}/>
```

### Typography
```
<Shape fontSize="10px" path={hexagon}/>
```

### Background
```
<Shape background="linear-gradient(#000, #fff)" path={triangle}/>
```

### Border
```
<Shape borderTop="1px solid blue" borderBottom="2px solid green" path={moon}/>
```

### Shadow
```
<Shape boxShadow="0 0 3px rgba(0,0,0,.6), inset 0 0 3px rgba(255,255,255,.5)" path={pentagon}/>
```

### Built In Shapes

- triangle
- square
- diamond
- pentagon
- hexagon
- heptagon
- octagon
- nonagon
- decagon
- `polygon(n: number)`
- circle
- trapezoid
- plus
- heart
- moon
- star
- egg
- rainbow

### Custom Shapes
```
<Shape path="M 0,0 1,0 1,1 0,1 Z"/>
```

# How it works

### HTML

"Standard" HTML elements are limited to the box model, i.e. rectangles.
We can get [additional shapes](https://css-tricks.com/the-shapes-of-css/) by manipulating borders, border radiuses, and/or css transforms to skew rectangles into other shapes. 
But, these shapes still have some limitations: 
- it's hard to combine borders and box shadows with occluded shapes
- backgrounds and box shadows will get equally skewed by the css transformations

For example: using "plain" HTML and CSS, its hard to make a 5 pointed star with both borders and box shadows. 

### SVG

Meanwhile, SVGs lets us build [arbitrary shapes](https://css-tricks.com/creating-non-rectangular-headers/) in our webpages. But, SVGs do not support the same css properties as non-SVG components. 
- We cannot [add box shadows](https://stackoverflow.com/questions/6088409/svg-drop-shadow-using-css3) to SVG elements. 
- We cannot add border top/left/right/bottom to SVGs - they use `stroke` instead.

### Canvas/WebGL

Canvas/WebGL let us draw [almost anything](https://experiments.withgoogle.com/search?q=WebGL) we can imagine. But, by drawing raw images to the screen, we are no longer building the page  [semantically](https://www.lifewire.com/why-use-semantic-html-3468271). 

### Styled-shapes
This library attempts to bridge the differences between SVG and HTML - allowing users to build arbitrary shapes while still using semantic HTML and the CSS properties we're used to. (via styled system). 

Implementation:
- **Main shape:** css [clip-path](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)
- **Box shadow:** `<svg/>` [filters](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter) + [dropshadow](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDropShadow)
- **Border:** `<svg/>` paths with [stroke](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes), broken apart at via trigonometry > 45 (top), > 135 (left) , > 225 (bottom), > 315 (right) degrees
- **Space + Layout:** math based on the given `path`
- **Typography, Flex, Grid, Background:** standard HTML + CSS

For more about [CSS in JS](https://en.wikipedia.org/wiki/CSS-in-JS), checkout the [styled-system](https://styled-system.com/) or [this article](https://medium.com/dailyjs/what-is-actually-css-in-js-f2f529a2757).

# Todo

- Animations / Transitions
- Border Style (dashed / dottted / double / groove)
- More Cross browser testing (cough IE cough)

# License

MIT
