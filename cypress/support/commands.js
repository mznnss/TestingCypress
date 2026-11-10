const { testData } = require("./test-data");

const selectors = {
  loginName: "#loginFrm_loginname",
  password: "#loginFrm_password",
  loginButton: 'button[title="Login"]',
};

Cypress.Commands.add("visitHome", () => cy.visit("/"));
Cypress.Commands.add("visitLogin", () => cy.visit("/index.php?rt=account/login"));

Cypress.Commands.add("login", (loginName = testData.loginName, password = testData.loginPassword) => {
  cy.session([loginName, password], () => {
    cy.visitLogin();
    cy.get(selectors.loginName).should("be.visible").clear().type(loginName);
    cy.get(selectors.password).should("be.visible").clear().type(password);
    cy.get(selectors.loginButton).click();
    cy.url().should("include", "rt=account/account");
    cy.contains("My Account").should("be.visible");
  }, { cacheAcrossSpecs: false });
});

Cypress.Commands.add("openFirstProduct", () => {
  cy.visitHome();
  cy.get(".prdocutname").first().should("be.visible").click();
  cy.get(".productname").should("be.visible");
});

Cypress.Commands.add("addFirstProductToCart", (quantity = 1) => {
  cy.openFirstProduct();
  cy.get("#product_quantity").clear().type(String(quantity));
  cy.get(".cart").should("be.visible").click();
});

Cypress.Commands.add("openCart", () => {
  cy.visit("/index.php?rt=checkout/cart");
  cy.get("#cart").should("be.visible");
});

Cypress.Commands.add("fillRegistration", (overrides = {}) => {
  const data = {
    firstname: "Muh Mizan", lastname: "Zulmi",
    email: `mizan.${Date.now()}@example.com`, telephone: "08976272428",
    address: "Universitas Pamulang", city: "Tangerang Selatan",
    zone: "Banten", postcode: "15417", country: "Indonesia",
    loginname: `mizan${Date.now()}`, password: testData.registrationPassword,
    confirm: testData.registrationPassword, ...overrides,
  };
  const fields = {
    firstname: "#AccountFrm_firstname", lastname: "#AccountFrm_lastname",
    email: "#AccountFrm_email", telephone: "#AccountFrm_telephone",
    address: "#AccountFrm_address_1", city: "#AccountFrm_city",
    postcode: "#AccountFrm_postcode", loginname: "#AccountFrm_loginname",
    password: "#AccountFrm_password", confirm: "#AccountFrm_confirm",
  };
  Object.entries(fields).forEach(([key, selector]) => {
    if (data[key] !== null && data[key] !== undefined) cy.get(selector).clear().type(data[key]);
  });
  cy.get("#AccountFrm_country_id").select(data.country);
  cy.get("#AccountFrm_zone_id").select(data.zone);
  if (overrides.agree !== false) cy.get("#AccountFrm_agree").check();
});

Cypress.Commands.add("createTestAccount", () => {
  const stamp = Date.now();
  const account = {
    firstname: "Cypress",
    lastname: "Automation",
    email: `cypress.${stamp}@example.com`,
    telephone: "08123456789",
    address: "Universitas Pamulang",
    city: "Tangerang Selatan",
    zone: "Banten",
    postcode: "15417",
    country: "Indonesia",
    loginname: `cypress${stamp}`,
    password: testData.registrationPassword,
    confirm: testData.registrationPassword,
  };

  cy.visit("/index.php?rt=account/create");
  cy.fillRegistration(account);
  cy.get('button[title="Continue"]').click();
  cy.contains("Your Account Has Been Created!").should("be.visible");
  cy.get('a[href*="account/logout"]:visible').first().click();
  cy.contains("Account Logout").should("be.visible");
  return cy.wrap(account);
});
