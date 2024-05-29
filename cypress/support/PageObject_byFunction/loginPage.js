export const login = () => {
  const emailLogin = (email) => {
    if (!email) {
      cy.get("#email").invoke("val", email);
    } else {
      cy.get("#email").type(email);
    }
  };

  const passwordLogin = (password) => {
    if (!password) {
      cy.get("#pass").invoke("val", password);
    } else {
      cy.get("#pass").type(password);
    }
  };

  const buttonLogin = () => {
    cy.get("#send2").click();
  };

  const checkError = (selector, messageError) => {
    cy.get(selector).should((msg) => {
      const actualError = msg.text();
      let messageFound = false;

      messageError.forEach((err) => {
        if (actualError.includes(err)) {
          expect(actualError).to.contain(err);
          messageFound = true;
        }
      });

      if (!messageFound) {
        throw new Error("Unexpected error message: " + actualError);
      }
    });
  };

  return { emailLogin, passwordLogin, buttonLogin, checkError };
};
