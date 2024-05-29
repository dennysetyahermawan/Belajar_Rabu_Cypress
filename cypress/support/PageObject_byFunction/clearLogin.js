export const clearDataLogin = () => {
  const clearEmailLogin = () => {
    cy.get("#email").clear();
  };

  const clearPassLogin = () => {
    cy.get("#pass").clear();
  };

  const clearAllLogin = () => {
    clearEmailLogin();
    clearPassLogin();
  };

  return { clearEmailLogin, clearPassLogin, clearAllLogin };
};
