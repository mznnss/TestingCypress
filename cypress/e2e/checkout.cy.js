describe("Automation Test Store - Checkout", () => {
  const startCheckout = () => {
    cy.addFirstProductToCart();
    cy.openCart();
    cy.get("#cart").contains("Checkout").click();
    cy.get("body").should("be.visible");
    cy.contains("Guest Checkout").click();
    cy.get('button[title="Continue"]:visible, input[title="Continue"]:visible').first().click();
  };

  const field = (name) => cy.get(`#guestFrm_${name}, #AccountFrm_${name}`).first();
  const fillCheckout = (overrides = {}) => {
    const data = {
      firstname: "Muh Mizan", lastname: "Zulmi", email: "mizan.checkout@example.com",
      address_1: "Universitas Pamulang",
      city: "Tangerang Selatan", postcode: "15417", country_id: "Indonesia",
      zone_id: "Banten", ...overrides,
    };
    ["firstname", "lastname", "email", "address_1", "city", "postcode"].forEach((name) => {
      if (data[name] !== null) field(name).clear().type(data[name]);
    });
    if (data.country_id) field("country_id").select(data.country_id);
    if (data.country_id && data.zone_id) field("zone_id").select(data.zone_id);
  };
  const continueCheckout = () => cy.get('button[title="Continue"], input[title="Continue"]').last().click();

  it("TC25 - Checkout dengan data valid", () => {
    startCheckout();
    fillCheckout();
    continueCheckout();
    cy.url().should("include", "guest_step_");
    cy.get("body").invoke("text").should("match", /ORDER SUMMARY/i);
  });
  it("TC26 - Checkout tanpa mengisi nama depan", () => {
    startCheckout();
    fillCheckout({ firstname: null });
    continueCheckout();
    cy.get("body").should("contain.text", "First Name");
  });
  it("TC27 - Checkout tanpa mengisi alamat", () => {
    startCheckout();
    fillCheckout({ address_1: null });
    continueCheckout();
    cy.get("body").invoke("text").should("match", /Address|address/);
  });
  it("TC28 - Checkout tanpa memilih negara", () => {
    startCheckout();
    fillCheckout({ country_id: null });
    continueCheckout();
    cy.get("body").invoke("text").should("match", /Country|country/);
  });
  it("TC29 - Checkout tanpa memilih wilayah/state", () => {
    startCheckout();
    fillCheckout({ zone_id: null });
    continueCheckout();
    cy.get("body").invoke("text").should("match", /Region|State|zone|Zone/);
  });
  it("TC30 - Memeriksa ringkasan dan konfirmasi pesanan", () => {
    startCheckout();
    fillCheckout();
    continueCheckout();
    cy.get("body").invoke("text").should("match", /ORDER SUMMARY/i);
    cy.get("body").should("contain.text", "Skinsheen Bronzer Stick");
  });
});
