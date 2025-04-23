# JS-TS-Practical-Test

## Javascript

### Q.1

// Create merge function that accepts data like below and merges them by given customerId
let obj = [
  { customerId: 5, minutes: 45, utensils: ["table"] },
  { customerId: 3, minutes: 120, utensils: ["chopsticks"] },
  { customerId: 9, minutes: 15, utensils: ["spoon"] },
  { customerId: 3, minutes: 90, utensils: ["fork", "knife"] },
  { customerId: 3, minutes: 180, utensils: ["plate"] },
  { customerId: 6, minutes: 180, utensils: ["bowl"] },
  { customerId: 6, minutes: 180, utensils: ["glass"] },
];

//result should be like below
[
  { customerId: 5, minutes: 45, utensils: ["table"] },
  {
    customerId: 3,
    minutes: 390,
    utensils: ["chopsticks", "fork", "knife", "plate"],
  },
  { customerId: 9, minutes: 15, utensils: ["spoon"] },
  { customerId: 6, minutes: 360, utensils: ["bowl", "glass"] },
];


SOLUTION:
```js
function mergeData(objArray) {
  let map = new Map();
  let result = [];

  for (let i = 0; i < objArray.length; i++) {
    let currObj = objArray[i];

    if (map.has(currObj.customerId)) {
      const obj = map.get(currObj.customerId);

      let updatedMinutes = obj.minutes + currObj.minutes;
      let updatedUtensils = [...obj.utensils, ...currObj.utensils];

      obj.minutes = updatedMinutes;
      obj.utensils = updatedUtensils;

      map.set(currObj.customerId, obj);
    } else {
      map.set(currObj.customerId, currObj);
    }
  }

  for (let a of map.entries()) {
    result.push(a[1]);
  }

  return result;
}
```

### Q.2

// Array Deep Flatten with Depth Limit

const input = [1, [2, [3, [4, [5]]]]];

// output: [1, 2, 3, [4, [5]]]


SOLUTION:
```js
function flatDepth(arr, depth = 1) {
  if (depth <= 0) {
    return arr;
  }

  let output = [];

  function flat(arr, depth) {
    if (depth < 0) {
      output.push(arr);
      return;
    }

    for (let val of arr) {
      if (Array.isArray(val)) {
        flat(val, depth - 1, output);
      } else {
        output.push(val);
      }
    }
  }

  flat(arr, depth);

  return output;
}
```

### Q.3

// Write a function deepMerge(obj1, obj2) that returns a new object containing all keys from obj1 and obj2.

// If a key exists in both:

// and both values are objects (but not arrays), merge them recursively.

// otherwise, use the value from obj2.

// Do not mutate obj1 or obj2.


SOLUTION:
```js
function checkObject(obj1, obj2) {
  return (
    typeof obj1 === "object" &&
    typeof obj2 === "object" &&
    !Array.isArray(obj1) &&
    !Array.isArray(obj2)
  );
}

function deepMerge(obj1, obj2, obj3 = {}) {
  for (let pair of Object.entries(obj1)) {
    let key = pair[0];
    let val = pair[1];
    if (obj2[key]) {
      if (checkObject(obj1[key], obj2[key])) {
        obj3[key] = deepMerge(obj1[key], obj2[key], {});
      } else {
        obj3[key] = obj2[key];
      }
    } else {
      obj3[key] = val;
    }
  }

  for (let pair of Object.entries(obj2)) {
    let key = pair[0];
    let val = pair[1];
    if (obj3[key] && obj1[key]) {
      continue;
    } else {
      obj3[key] = val;
    }
  }

  return obj3;
}
```

## Typescript

### Q.1

function isPerson()... // your logic

const person = { name: "John", age: 30 };
if (isPerson(person)) {
  // Now TypeScript knows `person` is `{ name: string; age: number }`
}


SOLUTION:
```js
const person = { name: "John", age: 30 };
type Person=typeof person;

function isPerson(personArg: Person): personArg is Person{
    return person===personArg;
}

function check(personNew){
    if(isPerson(personNew)){
        console.log(personNew.age);
    }
    else{

    }
}

if (isPerson(person)) {

  // Now TypeScript knows `person` is `{ name: string; age: number }`
}
```

### Q.2

type A = GetRequiredKeys<{ a: string; b?: number; c: boolean }>;
// Expected: "a" | "c"

SOLUTION:
```js
type GetRequiredKeys<T extends object>=keyof {[P in keyof T as undefined extends T[P]?never: P]-?: T[P]};

type A = GetRequiredKeys<{ a: string; b?: number; c: boolean }>;
// Expected: "a" | "c"
```

### Q.3

// Create a type that can help us get getters and setters from any given interface

interface Attributes {  
 id: number;  
 name: string;  
 address: { 
    city: string;
    street: string; 
 };
}

// example:
type Setters = ?
type Getters = ?

const attributeSetters: Setters<Attributes> = {  setAddress: ({city,street}) => null,  setId: (value) => null,  setName: (value) => null,}

const attributeGetters: Getters<Attributes> = {  getAddress: () => ({ city: '', street: '' }),  getId: () => 0,  getName: () => '',}


SOLUTION:
```js
// Create a type that can help us get getters and setters from any given interface

interface Attributes {  
    id: number;  
    name: string;  
    address: { 
       city: string;
       street: string; 
    };
   }
   
   // example:
   type Setters<T extends object> = {[P in keyof T as `set${Capitalize<P & string>}`]: (args: T[P])=> null};
   type Getters<T extends object> = {[P in keyof T as `get${Capitalize<P & string>}`]: ()=>T[P]};;

   type abc=Setters<Attributes>
   
   const attributeSetters: Setters<Attributes> = {  setAddress: ({city,street}) => null,  setId: (value) => null,  setName: (value) => null,}
   
   const attributeGetters: Getters<Attributes> = {  getAddress: () => ({ city: '', street: '' }),  getId: () => 0,  getName: () => '',}
```