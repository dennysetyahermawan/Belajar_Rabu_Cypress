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

const getPages = pages();
const dataLogin = login();

describe("Test suite login", () => {
  beforeEach("test", () => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    getPages.visitAccount();
  });

  describe("POSITIVE", () => {
    it.only("Login with the valid email & password", () => {
      dataLogin.userLogin(user.validUser.email, user.validUser.password);
    });
  });

  describe("NEGATIVE", () => {
    it("Login with the empty email & password", () => {
      login.loginUser("", "");
      cy.get(account.Errormsg).should("contain", message.LoginRequired);
    });
  });
});
