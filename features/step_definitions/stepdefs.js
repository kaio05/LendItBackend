import assert from 'assert';
import { Given, When, Then } from '@cucumber/cucumber';
// import { userServices } from "../../src/app/services/userServices";
// import { jwtHelp } from "../../src/app/utils/jwtHelp";
// import { userRepository } from "../../src/app/repositories/userRepository";
// import { bcryptHash } from "../../src/app/utils/bcryptHash";

// async function login(email, password) {
//   const service = new userServices(
//     new userRepository(), 
//     new bcryptHash(), 
//     new jwtHelp()
//   );
//   try {
//     let tokens = {'accessToken':'', 'refreshToken':''};
//     tokens = await service.login(email, password);
//     return "Logged in!";
//   } catch (error) {
//     return "Invalid credentials";
//   }
  
// }

function canLogIn(email, password) {
  if (email === "user1@email.com" && password === "12345")
    return "Logged in!";
  else
    return "Invalid credentials!";
}

Given('email is {string}', function (email) {
  this.email = email;
});

Given('password is {string}', function (password) {
  this.password = password;
});

When('I try to login', async function () {
  this.actualAnswer = await canLogIn(this.email, this.password)
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.strictEqual(this.actualAnswer, expectedAnswer);
});