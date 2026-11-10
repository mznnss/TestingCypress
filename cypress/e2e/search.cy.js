describe("Automation Test Store - Search", () => {
  beforeEach(() => cy.visitHome());
  const search = (value) => {
    cy.get("#filter_keyword").clear().type(value);
    cy.get(".fa-search, button[title=\"Go\"]").first().click();
  };
  it("TC11 - Search produk dengan nama lengkap", () => {
    search("Skinsheen Bronzer Stick");
    cy.get(".productname").should("contain.text", "Skinsheen Bronzer Stick");
  });
  it("TC12 - Search dengan kata kunci sebagian", () => {
    search("Skinsheen");
    cy.get(".productname").should("contain.text", "Skinsheen");
  });
  it("TC13 - Search produk tidak tersedia", () => {
    search("produkxyz123tidakada");
    cy.get("body").invoke("text").should("match", /no products|no product|not found/i);
  });
  it("TC14 - Search tanpa kata kunci", () => {
    cy.get(".fa-search, button[title=\"Go\"]").first().click();
    cy.url().should("include", "search");
  });
});
