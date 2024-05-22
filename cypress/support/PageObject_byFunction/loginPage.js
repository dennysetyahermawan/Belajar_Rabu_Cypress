export const login = () => {
  //   const emailLogin = (email) => {
  //     cy.get("#email").type(email);
  //   };

  //   const passwordLogin = (password) => {
  //     cy.get("#pass").type(password);
  //   };

  const userLogin = (email, password) => {
    if (!email && !password) {
      cy.get("#email").invoke("val", email);
      cy.get("#pass").invoke("val", password);
      cy.get("#send2").click();
    }
    cy.get("#email").type(email);
    cy.get(
      ".login-container > .block-customer-login > .block-content > #login-form > .fieldset > .password > .control > #pass"
    ).type(password);
    cy.get("#send2").click();
  };

  return { userLogin };
};
