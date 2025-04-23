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