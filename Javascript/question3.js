// Write a function deepMerge(obj1, obj2) that returns a new object containing all keys from obj1 and obj2.

// If a key exists in both:

// and both values are objects (but not arrays), merge them recursively.

// otherwise, use the value from obj2.

// Do not mutate obj1 or obj2.

// Example:

const obj1 = {
  user: {
    name: "Alice",
    age: {
      birthdate: [2025, 1, 2],
      date: 20,
    },
  },
  role: "admin",
};
const obj2 = {
  user: {
    age: {
      birthdate: [2023, 1, 2],
      date: 25,
    },
  },
  active: true,
};

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

const result = deepMerge(obj1, obj2);
console.log(JSON.stringify(result));

// Output:
// {
//   user: { name: "Alice", age: 30 },
//   role: "admin",
//   active: true
// }
