import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { BASE_URL, PASSWORD, USERNAME } from '../utils/envConfig';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test.describe('Cart Page validation', () => {

    let loginPage;
    let productPage;
    let cartPage;


  test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page);
   productPage = new ProductPage(page);
   cartPage = new CartPage(page);

   await page.goto(BASE_URL);
   await loginPage.login(USERNAME, PASSWORD);
   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
   
  })

  test('validate cart page url and UI Elements', async ({ page }) => {
      await productPage.addFirstproductToCart();
      await productPage.clickOnCartLink();
      await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

      const ui = await cartPage.getCartPageElements();
      await expect(ui.cartTitle).toBeVisible();
      await expect(ui.continueShopping).toBeVisible();
      await expect(ui.checkout).toBeVisible();
  })

  test('validate continue shopping functionality', async ({ page }) => {
      await productPage.addFirstproductToCart();
      await productPage.clickOnCartLink();
      await cartPage.continueShopping();
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  })

  test('validate First product in the cart page', async () => {
      const firstProduct = await productPage.getFirstProductDetails();
      await productPage.addFirstproductToCart();
      await productPage.clickOnCartLink();

      const cartProduct = await cartPage.getCartProducts();
      expect(cartProduct[0]).toEqual(firstProduct);
  })

  test('validate All products to the cart page', async () => {
      const allProductDetails = await productPage.getAllProductDetails();
      await productPage.addAllProductsToCart();
      await productPage.clickOnCartLink();

      const cartProduct = await cartPage.getCartProducts();
      expect(cartProduct).toEqual(allProductDetails);
  })

  test('validate Specific products to the cart page', async () => {
      const expectedProducts = [
          'Sauce Labs Backpack',
          'Test.allTheThings() T-Shirt (Red)'
      ];

      await productPage.addSpecificproductsToCart(expectedProducts);
      await productPage.clickOnCartLink();

      const cartProducts = await cartPage.getCartProducts();
      expect(cartProducts.map(product => product.name)).toEqual(expectedProducts);
  })

  test('validate remove function validation', async ({ page }) => {
      await productPage.addFirstproductToCart();
      await productPage.clickOnCartLink();

      await expect(page.locator('.cart_item')).toHaveCount(1);
      await cartPage.removeFirstProduct();
      await expect(page.locator('.cart_item')).toHaveCount(0);
  })




})