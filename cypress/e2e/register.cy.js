const { testData } = require("../support/test-data");

describe("Automation Test Store - Registration", () => {
  beforeEach(() => cy.visit("/index.php?rt=account/create"));

  it("TC01 - Registrasi dengan data valid", () => {
    cy.fillRegistration();
    cy.get('button[title="Continue"]').click();
    cy.contains("Your Account Has Been Created!").should("be.visible");
  });

  it("TC02 - Registrasi tanpa mengisi First Name", () => {
    cy.fillRegistration({ firstname: null });
    cy.get('button[title="Continue"]').click();
    cy.get("body").invoke("text").should("match", /First Name must be between 1 and 32 characters/i);
  });

  it("TC03 - Registrasi menggunakan email yang sudah terdaftar", () => {
    cy.createTestAccount().then((account) => {
      cy.visit("/index.php?rt=account/create");
      cy.fillRegistration({ loginname: account.loginname });
      cy.get('button[title="Continue"]').click();
      cy.get(".alert").should("be.visible");
    });
  });

  it("TC04 - Registrasi dengan password dan konfirmasi berbeda", () => {
    cy.fillRegistration({ confirm: "PasswordBeda123!" });
    cy.get('button[title="Continue"]').click();
    cy.get(".alert").should("be.visible");
  });

  it("TC05 - Registrasi tanpa menyetujui Privacy Policy", () => {
    cy.fillRegistration({ agree: false });
    cy.get('button[title="Continue"]').click();
    cy.get(".alert").should("be.visible");
  });
});
