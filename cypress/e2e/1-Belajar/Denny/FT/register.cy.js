/// <reference types = "cypress" />

const message = require("../../../../fixtures/data/messageData.json");
const user = require("../../../../fixtures/data/userData.json");
const account = require("../../../../fixtures/data/account.json");
const {
  pages,
} = require("../../../../support/PageObject_byFunction/navigation");
const {
  register,
} = require("../../../../support/PageObject_byFunction/registerPage");
const {
  clearData,
} = require("../../../../support/PageObject_byFunction/clear");

const getPages = pages();
const dataRegister = register();
const clearDataRegister = clearData();
const randomEmail = Math.floor(Math.random() * 100000);

describe("Test suite Create Account", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    getPages.visitHome();
    cy.contains("Create an Account").click();
  });

  describe("POSITIVE", () => {
    it.only("valid user name & password", () => {
      dataRegister.firstNameInput(user.validUser.firstName);
      dataRegister.lastNameInput(user.validUser.lastName);
      dataRegister.emailInput(user.validUser.email);
      dataRegister.passwordInput(user.validUser.password);
      dataRegister.confirmPasswordInput(
        user.validUser["password-confirmation"]
      );

      cy.get("#password-strength-meter-label").should((strength) => {
        const strengthText = strength.text();
        if (strengthText.includes("Medium")) {
          expect(strengthText).to.contain("Medium");
        } else if (strengthText.includes("Strong")) {
          expect(strengthText).to.contain("Strong");
        } else {
          expect(strengthText).to.contain("Very Strong");
        }
      });

      dataRegister.getSubmit();
      cy.get("#maincontent")
        .should("contain", message.registerSuccess)
        .and("contain", "Account Information");
    });
  });

  describe("NEGATIVE", () => {
    it("Empty username, email & password", () => {
      dataRegister.getSubmit();
      cy.get(account.firstnameError).should("contain", message.registerError1);
      cy.get(account.lastnameError).should("contain", message.registerError1);
      cy.get(account.emailError).should("contain", message.registerError1);
      cy.get(account.passwordError).should("contain", message.registerError1);
      cy.get(account.confirmPasswordError).should(
        "contain",
        message.registerError1
      );
    });

    it("Empty username & valid password", () => {
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.validUser.password);
      dataRegister.confirmPasswordInput(
        user.validUser["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get(account.firstnameError).should("contain", message.registerError1);
      cy.get(account.lastnameError).should("contain", message.registerError1);
    });

    it("Valid username & empty password", () => {
      dataRegister.firstNameInput(user.validUser.firstName);
      dataRegister.lastNameInput(user.validUser.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.getSubmit();
      cy.get("#maincontent").should("contain", message.registerError1);
      cy.get(".account > .password")
        .should("contain", "Password Strength:")
        .and("include.text", "No Password");
    });

    it("Create account with the wrong email format", () => {
      const invalidEmail = ["@", "@gmail", ".com"];

      invalidEmail.forEach((mail) => {
        dataRegister.firstNameInput(user.validUser.firstName);
        dataRegister.lastNameInput(user.validUser.lastName);
        dataRegister.emailInput(`${randomEmail}${mail}`);
        dataRegister.passwordInput(user.validUser.password);
        dataRegister.confirmPasswordInput(
          user.validUser["password-confirmation"]
        );
        dataRegister.getSubmit();
        cy.get("#email_address-error").should("contain", message.InvalidEmail);
        clearDataRegister.clearAllRegister();
      });
    });

    it("Create an account with the weakness password", () => {
      dataRegister.firstNameInput(user.invalidUser1.firstName);
      dataRegister.lastNameInput(user.invalidUser1.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser1.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser1["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get(getPages.getSubmit()).click();
      cy.get("#form-validate > .account")
        .should("contain", message.password1)
        .and("contain", "Password Strength:")
        .and("include.text", "Weak");
    });

    it("Create an account with a password only in lowercase letters", () => {
      dataRegister.firstNameInput(user.invalidUser2.firstName);
      dataRegister.lastNameInput(user.invalidUser2.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser2.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser2["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get("#form-validate > .account").should("contain", message.password2);
    });

    it("Create an account with a password only in number", () => {
      dataRegister.firstNameInput(user.invalidUser3.firstName);
      dataRegister.lastNameInput(user.invalidUser3.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser3.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser3["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get("#form-validate > .account").should("contain", message.password2);
    });

    it("Create an account with a password only in special character", () => {
      dataRegister.firstNameInput(user.invalidUser4.firstName);
      dataRegister.lastNameInput(user.invalidUser4.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser4.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser4["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get("#form-validate > .account").should("contain", message.password2);
    });

    it("Create an account with a password only in number & character", () => {
      dataRegister.firstNameInput(user.invalidUser5.firstName);
      dataRegister.lastNameInput(user.invalidUser5.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser5.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser5["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get("#form-validate > .account").should("contain", message.password2);
    });

    it("create an account with a password that is not the same as the confirmed password", () => {
      dataRegister.firstNameInput(user.invalidUser6.firstName);
      dataRegister.lastNameInput(user.invalidUser6.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser6.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser6["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get("#form-validate > .account").should(
        "contain",
        message.passwordConfirmError
      );
    });

    it("Create an account with a password only in number & special character", () => {
      dataRegister.firstNameInput(user.invalidUser7.firstName);
      dataRegister.lastNameInput(user.invalidUser7.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser7.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser7["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get("#form-validate > .account").should("contain", message.password2);
    });

    it("Create an account with the registered email", () => {
      dataRegister.firstNameInput(user.validUser.firstName);
      dataRegister.lastNameInput(user.validUser.lastName);
      dataRegister.emailInput(user.validUser.email);
      dataRegister.passwordInput(user.validUser.password);
      dataRegister.confirmPasswordInput(
        user.validUser["password-confirmation"]
      );
      dataRegister.getSubmit();
      cy.get(account.Errormsg).should("contain", message.registerError2);
    });

    it("Create account with only 1 character in the first & last name", () => {
      dataRegister.firstNameInput(user.invalidUser8.firstName);
      dataRegister.lastNameInput(user.invalidUser8.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser8.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser8["password-confirmation"]
      );
      // dataRegister.getSubmit();
      cy.get(".field-name-firstname").should(($first) => {
        expect($first).to.have.text("Minimun 2 letters");
      });
    });

    it("Create account with only number in the first name", () => {
      dataRegister.firstNameInput(user.invalidUser9.firstName);
      dataRegister.lastNameInput(user.invalidUser9.lastName);
      dataRegister.emailInput(`${randomEmail}@gmail.com`);
      dataRegister.passwordInput(user.invalidUser9.password);
      dataRegister.confirmPasswordInput(
        user.invalidUser9["password-confirmation"]
      );
      // dataRegister.getSubmit();
    });
  });
});
