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