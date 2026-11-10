describe("Automation Test Store - Product", () => {
  it("TC15 - Melihat detail produk", () => {
    cy.openFirstProduct();
    cy.get(".productname, .product-info").should("be.visible");
    cy.get(".price, .productprice").should("be.visible");
    cy.get(".productdetails, .productinfo").should("exist");
  });
  it("TC16 - Memilih opsi produk sebelum Add to Cart", () => {
    cy.visit("/index.php?rt=product/product&product_id=116");
    cy.get("select").then(($selects) => {
      if (!$selects.length) {
        cy.then(function () { this.skip(); });
        return;
      }
      cy.wrap($selects).first().find("option").eq(1).then(($option) => {
      cy.get("select").first().select($option.val());
      });
    });
    cy.get("body").should("be.visible");
  });
  it("TC17 - Menambahkan produk tanpa memilih opsi wajib", () => {
    cy.visit("/index.php?rt=product/product&product_id=116");
    cy.get("select").then(($selects) => {
      if (!$selects.length) {
        cy.then(function () { this.skip(); });
        return;
      }
      cy.get(".cart").click();
      cy.get(".alert, .error").should("be.visible");
    });
  });
  it("TC18 - Mengubah jumlah produk pada detail", () => {
    cy.openFirstProduct();
    cy.get("#product_quantity").clear().type("2");
    cy.get(".cart").click();
    cy.openCart();
    cy.get('input[name^="quantity"]').first().should("have.value", "2");
  });
});
