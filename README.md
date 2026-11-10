# Automation Test Store - Cypress Testing

Automation testing untuk website [Automation Test Store](https://automationteststore.com/) menggunakan Cypress.

Suite ini mencakup 33 test case:

- TC01-TC05: Registration
- TC06-TC10: Login dan logout
- TC11-TC14: Product search
- TC15-TC18: Product detail dan option
- TC19-TC24: Shopping cart
- TC25-TC30: Checkout
- TC31-TC33: My Account dan order history

## Prasyarat

- Node.js dan npm
- Google Chrome
- Koneksi internet
- Cypress 16.2.1, dipasang otomatis melalui `npm install`

## Instalasi

```bash
git clone https://github.com/mznnss/TestngCypress.git
cd TestngCypress
npm install
```

## Menjalankan test

Gunakan browser headed karena website dapat memblokir Cypress dalam mode headless:

```bash
npm run test:headed
```

Menjalankan Cypress interactive:

```bash
npm run test:open
```

Menjalankan mode headless:

```bash
npm test
```

Catatan: mode headless dapat menerima halaman anti-bot dari website publik. Jika itu terjadi, gunakan `npm run test:headed`.

## Data test

Data login negatif dan password registrasi berada di [cypress/support/test-data.js](cypress/support/test-data.js).

Test valid membuat akun baru secara otomatis menggunakan email dan username dengan timestamp agar tidak bentrok dengan data lama. Data default yang digunakan:

```text
First Name       : Cypress
Last Name        : Automation
Email            : cypress.<timestamp>@example.com
Username         : cypress<timestamp>
Password         : QaTest123!
Telephone        : 08123456789
Address          : Universitas Pamulang
City             : Tangerang Selatan
Country          : Indonesia
Region           : Banten
Postcode         : 15417
```

## Struktur project

```text
cypress/
├── e2e/
│   ├── account.cy.js
│   ├── cart.cy.js
│   ├── checkout.cy.js
│   ├── login.cy.js
│   ├── product.cy.js
│   ├── register.cy.js
│   └── search.cy.js
└── support/
    ├── commands.js
    ├── e2e.js
    └── test-data.js
```

## Perintah test per fitur

```bash
npx cypress run --headed --browser chrome --spec cypress/e2e/register.cy.js
npx cypress run --headed --browser chrome --spec cypress/e2e/login.cy.js
npx cypress run --headed --browser chrome --spec cypress/e2e/search.cy.js
npx cypress run --headed --browser chrome --spec cypress/e2e/product.cy.js
npx cypress run --headed --browser chrome --spec cypress/e2e/cart.cy.js
npx cypress run --headed --browser chrome --spec cypress/e2e/checkout.cy.js
npx cypress run --headed --browser chrome --spec cypress/e2e/account.cy.js
```

## Catatan test case

- TC03 menguji login name duplikat karena website tidak selalu menolak email duplikat.
- TC16-TC17 bergantung pada ketersediaan product option di website publik.
- Checkout menggunakan alur Guest Checkout yang tersedia pada website saat ini.
- Karena target adalah website publik, perubahan UI, data produk, anti-bot, atau downtime dapat memengaruhi hasil test.
