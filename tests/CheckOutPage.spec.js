import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { BASE_URL, PASSWORD, USERNAME } from '../utils/envConfig';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckOutPage';
import { checkOutData } from '../test-data/checkoutData';

test.describe('Cart Page validation', () => {

    let loginPage;
    let productPage;
    let cartPage;
    let checkoutPage;


  test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page);
   productPage = new ProductPage(page);
   cartPage = new CartPage(page);
   checkoutPage = new CheckOutPage(page);


   await page.goto(BASE_URL);
   await loginPage.login(USERNAME, PASSWORD);
   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
   await productPage.addFirstproductToCart();
   await productPage.clickOnCartLink();
   
  })

  test('Validate checkout page elements', async({page})=>{

        await cartPage.clickcheckoutbutton();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        const elements=await checkoutPage.getCheckoutElements();
        await expect(elements.cancel).toBeVisible();
        await expect(elements.pageInfo).toBeVisible();
        await expect(elements.continue).toBeVisible();
  })

 test('Validate cancel button', async({page})=>{

      await cartPage.clickcheckoutbutton();
      await checkoutPage.clickOnCancel();
      await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  })

 test('Validate continue button', async({page})=>{

    await cartPage.clickcheckoutbutton();
    await checkoutPage.fillCheckoutDetail(
      checkOutData.firstname,
      checkOutData.lastname,
      checkOutData.postalcode
    );
    await checkoutPage.clickOnContinue();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
  })

  test('Validate the error when clicking on continue with no data',async({page})=>{

     await cartPage.clickcheckoutbutton();
     await checkoutPage.clickOnContinue();
     const error=await checkoutPage.getErrorMessage();
     expect(error?.trim()).toBe("Error: First Name is required");


  })


})