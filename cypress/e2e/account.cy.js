describe("Automation Test Store - Account", () => {
  beforeEach(() => {
    cy.createTestAccount().then((account) => {
      cy.login(account.loginname, account.password);
      cy.visit("/index.php?rt=account/account");
    });
  });
  it("TC31 - Melihat informasi My Account", () => {
    cy.contains("My Account").should("be.visible");
    cy.get('a[href*="account/edit"]:visible').first().should("be.visible");
  });
  it("TC32 - Membuka Order History", () => {
    cy.visit("/index.php?rt=account/history");
    cy.url().should("include", "rt=account/history");
    cy.get("body").invoke("text").should("match", /MY ORDER HISTORY/i);
  });
  it("TC33 - Mengakses My Account setelah logout", () => {
    cy.get('a[href*="account/logout"]:visible').first().click();
    cy.contains("Account Logout").should("be.visible");
    cy.visit("/index.php?rt=account/account");
    cy.url().should("include", "account/login");
  });
});
