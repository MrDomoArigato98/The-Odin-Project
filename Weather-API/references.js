/*
1. Make a new branch to deploy from by running git branch gh-pages. (Only at the beginning it's needed)
2. git checkout gh-pages && git merge main --no-edit
3. npx webpack  build
4. 
git add dist -f && git commit -m "Deployment commit"
git subtree push --prefix dist origin gh-pages
git checkout main

5. Set gh-pages as source branch for pages

*/
/*
Function Expressions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function

The 'function' keyword can be used to define a function inside an expression.

You can also define functions using the function declaration OR the arrow syntax.
*/
const getRectArea = function (width, height) {
  return width * height;
};

console.log(getRectArea(3, 4));


/*
'Normal'(The one I'm used to) Function declaration.
*/
function calcRectArea(width, height) {
  return width * height;
}

console.log(calcRectArea(5, 6));

/*
Arrow function expressions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
An arrow function expression is a compact alternative to a traditional function expression, with some semantic differences and deliberate limitations in usage:
- Arrow functions don't have their own bindings to this, arguments, or super, and should not be used as methods.
- Arrow functions cannot be used as constructors. Calling them with new throws a TypeError. They also don't have access to the new.target keyword.
- Arrow functions cannot use yield within their body and cannot be created as generator functions.
*/

const materials = ["Hydrogen", "Helium", "Lithium", "Beryllium"];

console.log(materials.map((material) => material.length));
// Expected output: Array [8, 6, 7, 9]


/*
Defining classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
Classes are in fact "special functions", and just as you can define function expressions and function declarations, a class can be defined in two ways: a class expression or a class declaration.
*/

// Class Declaration
// Class Declarations have the same temporal dead zone restrictions as let or const and behave as if they are not hoisted.
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

//Class expression; the class is anonymous but assigned to a variable
const Rectangle = class {
  constructor(heigth, width) {
    this.height = height;
    this.width = width;
  }
};

//Class Expression; this time not anonymous, has its own name
const Rectangle = class Rectangle2 {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}


/*
Modules: https://www.theodinproject.com/lessons/javascript-es6-modules#before-es6-modules-the-global-scope-problem

*/