import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { BASE_URL, PASSWORD, USERNAME } from '../../utils/envConfig';
import { LoginPage } from '../../pages/LoginPage';
import { LoginLocators } from '../../locators/LoginLocators';
import { productPageLocators } from '../../locators/ProductPageLocators';
import { productsToCart } from '../../test-data/products';

test.describe('Product Page validation', () => {
  test.beforeEach(async ({ page }) => {
   const loginPage = new LoginPage(page);

   await page.goto(BASE_URL);
   await loginPage.login(USERNAME, PASSWORD);

   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Validate Logout functionality', async ({ page }) => {
   const productPage = new ProductPage(page);
   await productPage.logout();
   await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
  });

  test('About Page Validators', async ({ page }) => {
   const productPage = new ProductPage(page);
   await productPage.openaboutPage();
   await expect(page.locator(productPageLocators.bookdemo)).toBeVisible();
   await page.goBack();
   await expect(page.locator(productPageLocators.settingIcon)).toBeVisible();
  });

  test('Validate Product page', async ({ page }) => {
   const productPage = new ProductPage(page);
   await productPage.validateAllProductsDisplayed();
   await productPage.addFirstproductToCart();
   await productPage.addAllProductsToCart();
  });

  test('Validate Adding some or specific product to cart', async ({ page }) => {
   const productPage = new ProductPage(page);
   await productPage.addSpecificproductsToCart(productsToCart);
  });

  test('Filter By A to Z', async ({ page }) => {
   const productPage = new ProductPage(page);
   await productPage.filterByNameAtoZ();
   const names = await productPage.getProductNames();
   const sorted = [...names].sort();
   expect(names).toEqual(sorted);

  })

  test('Filter By Z to A', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.filterByNameZtoA();
   const names = await productPage.getProductNames();
   const sorted = [...names].sort().reverse();
   expect(names).toEqual(sorted);
  })

  test('Filter By Price Low to High', async ({ page }) => {
    const productPage = new ProductPage(page);
     await productPage.filterByLowtoHigh();
     const prices = await productPage.getProductPrices();
     const sortedPrice = [...prices].sort((a,b) => a - b);
     expect(prices).toEqual(sortedPrice);

  })

   test('Filter By Price High to Low', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.filterByHightoLow();
     const prices = await productPage.getProductPrices();
     const sortedPrice = [...prices].sort((a,b) => b - a);
     expect(prices).toEqual(sortedPrice);
  })

});