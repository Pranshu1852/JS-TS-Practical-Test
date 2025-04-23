// Create merge function that accepts data like below and merges them by given    customerId
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

console.log(
  mergeData([
    { customerId: 5, minutes: 45, utensils: ["table"] },
    { customerId: 3, minutes: 120, utensils: ["chopsticks"] },
    { customerId: 9, minutes: 15, utensils: ["spoon"] },
    { customerId: 3, minutes: 90, utensils: ["fork", "knife"] },
    { customerId: 3, minutes: 180, utensils: ["plate"] },
    { customerId: 6, minutes: 180, utensils: ["bowl"] },
    { customerId: 6, minutes: 180, utensils: ["glass"] },
  ])
);
