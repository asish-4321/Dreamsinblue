//1.Number datatype
let age=24;
let price = 99.99;
console.log(age);
console.log(price);

//String
let fullName ="Nandini";
let greeting = 'Hello, world!';
console.log(fullName);
console.log(greeting);

//Boolean
isFollow=true;
console.log(isFollow);

let isStudent = true;
let hasLicense = false;
console.log(isStudent , hasLicense);

//Null datatype
let z=null;
console.log(z);

//Undefined
let score;
console.log(score);

//BigInt datatype
let bigNumber =BigInt(123456789012345678901234567890n);
console.log(bigNumber);

//Symbol
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2);


//object
const student={
    fullName:"Alice",
    age:20,
    cgpa:8.2,
    isPass:true,
};
console.log(student);
console.log(student.fullName);

//incrementing key value 
/*console.log(student.age);
student["age "]=student["age"]+1;
console.log(student["age"]);

function greet() {
    return "Hello, world !";
 }
 console.log(greet());
 let today=new Date();
 console.log(today);
 //Arthemetic operators
let a=10;
let b=3;
console.log("Addition:",a+b);
console.log("Subraction:",a-b);
console.log("Multiplication:",a*b);
console.log("Division:",a/b);
console.log("Modulus:",a%b);
console.log("Exponentiation",a**b);
//Increment and Decrement
let x=5;
console.log("x before increment:",x);
x++;
console.log("x after increment:",x)

let y=5;
console.log("y before increment:",y);
y--;
console.log("y before increment:",y);*/
//Assignment Operators
let a=5;
let b=2;
a+=4;
console.log("a+=",a);

a-=3;
console.log("After-=3:",a);

a*=2;
console.log("After *=2:",a);

a/=2;
console.log("After /=2:",a);

a%=2;
console.log("After %=2:",a);

a**=2;
console.log("After **=2:",a);
console.log("a=",a,"&b",b);
++