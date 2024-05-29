/// <reference types = "cypress"/>

const user = require("../../../../fixtures/data/userData.json");
const account = require("../../../../fixtures/data/account.json");
const message = require("../../../../fixtures/data/messageData.json");
const {
  pages,
} = require("../../../../support/PageObject_byFunction/navigation");
const {
  login,
} = require("../../../../support/PageObject_byFunction/loginPage");
const {
  clearDataLogin,
} = require("../../../../support/PageObject_byFunction/clearLogin");

const getPages = pages();
const dataLogin = login();
const clearDataLogins = clearDataLogin();

const randomEmail = Math.floor(Math.random() * 100000);
const errorMessageLogin = [
  "A login and a password are required.",
  "Invalid Form Key. Please refresh the page.",
  "This is a required field.",
  "Please enter a valid email address (Ex: johndoe@domain.com).",
];

describe("Test suite login", () => {
  beforeEach("test", () => {
    cy.clearAllCookies();
    getPages.visitAccount();
  });

  describe("POSITIVE", () => {
    it("Login with the valid email & password", () => {
      dataLogin.emailLogin(user.validUser.email);
      dataLogin.passwordLogin(user.validUser.password);
      dataLogin.buttonLogin();
    });
  });

  describe("NEGATIVE", () => {
    it("Login with the empty string email & password", () => {
      dataLogin.buttonLogin();
      dataLogin.checkError("#maincontent", errorMessageLogin);
    });

    it("Login with the empty email & valid password", () => {
      dataLogin.passwordLogin(user.validUser.password);
      dataLogin.buttonLogin();
      dataLogin.checkError("#maincontent", errorMessageLogin);
    });

    it("Login wit the valid email & empty password", () => {
      dataLogin.emailLogin(user.validUser.email);
      dataLogin.buttonLogin();
      dataLogin.checkError("#maincontent", errorMessageLogin);
    });

    it("Login with the white space email & password", () => {
      const email = "    ";
      const pass = "    ";

      dataLogin.emailLogin(email);
      dataLogin.passwordLogin(pass);
      dataLogin.buttonLogin();
      dataLogin.checkError("#maincontent", errorMessageLogin);
    });

    it("Login with the wrong format email", () => {
      const invalidEmail = ["@", "@gmail", ".com"];

      invalidEmail.forEach((mail) => {
        dataLogin.emailLogin(`${randomEmail}${mail}`);
        dataLogin.passwordLogin(user.validUser.password);
        dataLogin.buttonLogin();
        dataLogin.checkError(account.loginEmailError, errorMessageLogin);
        clearDataLogins.clearAllLogin();
        cy.wait(2000);
      });
    });
  });
});
