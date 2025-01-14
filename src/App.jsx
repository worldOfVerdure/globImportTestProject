import { createGlobalStyle, styled } from "styled-components";

/*
const allImages = {
  './assets/images/MushroomCore.jpg': () => import('./assets/images/MushroomCore.jpg'),
  './assets/images/bleedingTooth.jpg': () => import('./assets/images/bleedingTooth.jpg'),
  './assets/images/gushingTooth.jpg': () => import('./assets/images/gushingTooth.jpg')
}
*/

/*
*With Promises

 for (const img in allImages) {
    allImages[img]().then((smth) => {
        console.log(img, smth);
    });
  }

  1) for in loop:
    for (key in object)
      statement

    iterates over the keys.

    So in our example, allImages is the object that we are iterating over and img which is a key in
    the allImages.

  2) allImages[img]():
     We then access a property value via bracket notation here. Thus, e.g., we get the anonymous
     function: () => import('./assets/images/MushroomCore.jpg')

     allImages[img]() with the parenthesis at the end invokes the function which will result in a
     dynamic import statement. This dynamic import statement will result in a promise being
     returned. Let's look into that returned promise next.

  3) () => import('./assets/images/MushroomCore.jpg')
    "The import() syntax, commonly called dynamic import, is a function-like expression that allows
    loading an ECMAScript module asynchronously and dynamically into a potentially non-module
    environment.

    Unlike the declaration-style counterpart, dynamic imports are only evaluated when needed, and
    permit greater syntactic flexibility." -MDN

    &Return Value:
    Returns a promise which:

      ^If the referenced module is loaded and evaluated successfully, fulfills to a module namespace
        ^object: an object containing all exports from moduleName.
      ~If the coercion to string of moduleName throws, rejects with the thrown error.
      *If moduleName refers to a module that doesn't exist, rejects with an implementation-defined
        *error (Node uses a generic Error, while all browsers use TypeError).
      ?If evaluation of the referenced module throws, rejects with the thrown error.

  3.1) Loaded successfully, module namespace object
    "A module namespace object is an object that describes all exports from a module. It is a static
    object that is created when the module is evaluated. There are two ways to access the module
    namespace object of a module: through a namespace import (import * as name from moduleName), or
    through the fulfillment value of a dynamic import.

    The module namespace object is a sealed object with null prototype."
    &Sealed
    Sealed here means if the object is not extensible and all properties are non-configurable
    and therefore not removable (but not necessarily non-writable). Not extensible here means that
    new properties cannot be added to the object.

    ?Resources:
    https://medium.com/@conboys111/javascript-module-namespace-objects-explained-avoiding-name-collisions-e77bc172a72a  
*/

/*
*Without promises

const imagePaths = [];
//          note relative path vvv                 vvv this gets rid of promises
Object.values(import.meta.glob("./assets/*.jpg", { eager: true })).forEach(
  ({ default: path }) => {
    const url = new URL(path, import.meta.url);
    const data = {
      path: url.pathname,
    };
    imagePaths.push(data);
  }
);

imagePaths will have content like this:
[ {"path":"/src/assets/logo.jpg"}, {"path":"/src/assets/logo.jpg"}

1) Object.values
The Object.values() static method returns an array of a given object's own enumerable string-keyed
property values. This will leave us with all the dynamic imports.

2) import.meta.glob("./assets/*.jpg", { eager: true })
// code produced by vite
import * as __glob__0_0 from './dir/foo.js'
import * as __glob__0_1 from './dir/bar.js'
const modules = {
  './dir/foo.js': __glob__0_0,
  './dir/bar.js': __glob__0_1,
}

& __glob__0_0 and  __glob__0_1 are examples of module namespace objects.

3) forEach
The forEach() method of Array instances executes a provided function once for each array element.
Parameters
callbackFn
A function to execute for each element in the array. Its return value is discarded. The function is
called with the following arguments:
  callback Parameters
  element
    The current element being processed in the array.

  index
    The index of the current element being processed in the array.

  array
    The array forEach() was called upon.
*/ 

export default function App() {
  const imgArray = [];
  Object.values(import.meta.glob("./assets/images/*.jpg", { eager: true })).forEach(
    ({ default: path }) => {
      const url = new URL(path, import.meta.url);
      const data = {
        path: url.pathname,
      };
      imgArray.push(data);
    }
  );

  return (
    <>
      <GlobalStyle />
      <ImageContainer >
        <img width="500px" height="500px" loading="lazy" src={imgArray[0].path} alt="Mushroom 1" />
        <img width="500px" height="500px" loading="lazy" src={imgArray[1].path} alt="Mushroom 2" />
        <img width="500px" height="500px" loading="lazy" src={imgArray[2].path} alt="Mushroom 3" />
      </ImageContainer>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    margin: 0;
  }
`;

const ImageContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  width: 100%;
`;
