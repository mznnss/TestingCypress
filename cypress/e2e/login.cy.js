const { testData } = require("../support/test-data");

describe("Automation Test Store - Login", () => {
  beforeEach(() => cy.visitLogin());

  const submit = (name, password) => {
    cy.get("#loginFrm_loginname").clear().type(name);
    cy.get("#loginFrm_password").clear().type(password);
    cy.get('button[title="Login"]').click();
  };

  it("TC06 - Login dengan kredensial valid", () => {
    cy.createTestAccount().then((account) => {
      cy.visitLogin();
      submit(account.loginname, account.password);
      cy.contains("My Account").should("be.visible");
    });
  });
  it("TC07 - Login dengan password salah", () => {
    submit(testData.loginName, "PasswordSalah123!");
    cy.get(".alert").should("be.visible");
  });
  it("TC08 - Login dengan email yang belum terdaftar", () => {
    submit("username_tidak_ada_xyz", testData.loginPassword);
    cy.get(".alert").should("be.visible");
  });
  it("TC09 - Login tanpa mengisi email", () => {
    cy.get("#loginFrm_password").type(testData.loginPassword);
    cy.get('button[title="Login"]').click();
    cy.get(".alert").should("be.visible");
  });
  it("TC10 - Logout dari akun", () => {
    cy.createTestAccount().then((account) => {
      cy.visitLogin();
      submit(account.loginname, account.password);
      cy.get('a[href*="account/logout"]:visible').first().click();
      cy.contains("Account Logout").should("be.visible");
    });
  });
});
