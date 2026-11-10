describe("Automation Test Store - Shopping Cart", () => {
  beforeEach(() => cy.addFirstProductToCart());

  it("TC19 - Menambahkan produk ke keranjang", () => {
    cy.openCart();
    cy.get("#cart table tbody tr").should("have.length.at.least", 1);
  });
  it("TC20 - Menambahkan dua produk berbeda", () => {
    cy.openCart();
    cy.visitHome();
    cy.get(".prdocutname").eq(1).click();
    cy.get(".cart").click();
    cy.openCart();
    cy.get("#cart table tbody tr").should("have.length.at.least", 2);
  });
  it("TC21 - Mengubah quantity produk di keranjang", () => {
    cy.openCart();
    cy.get('input[name^="quantity"]').first().clear().type("2");
    cy.get('button[title="Update"], input[title="Update"]').first().click();
    cy.get('input[name^="quantity"]').first().should("have.value", "2");
  });
  it("TC22 - Menghapus produk dari keranjang", () => {
    cy.openCart();
    cy.get("#cart table tbody tr:visible").last().find("td").last().click();
    cy.contains(/empty|no products|shopping cart/i).should("be.visible");
  });
  it("TC23 - Melanjutkan belanja dari keranjang", () => {
    cy.openCart();
    cy.get('a[title="Continue Shopping"], a').contains(/continue shopping/i).click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
  it("TC24 - Memeriksa total harga keranjang", () => {
    cy.openCart();
    cy.get("#cart table").should("be.visible").and("contain.text", "$" );
  });
});
