import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { BASE_URL, PASSWORD, USERNAME } from '../utils/envConfig';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckOutPage } from '../pages/CheckOutPage';
import { checkOutData } from '../test-data/checkoutData';
import { CheckoutPageLocators } from '../locators/ChecOutPageLocator';
import { CheckoutOverviewPage } from '../pages/CheckOutOverViewPage';


test.describe('Checkout overview Page validation', () => {

    let loginPage;
    let productPage;
    let cartPage;
    let checkoutPage;
    let checkoutoverviewPage;

    const expectedProducts = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    const firstName = 'John';
    const lastName = 'Doe';
    const postalcode = '12345';

  test.beforeEach(async ({ page }) => {
   loginPage = new LoginPage(page);
   productPage = new ProductPage(page);
   cartPage = new CartPage(page);
   checkoutPage = new CheckOutPage(page);
   checkoutoverviewPage=new CheckoutOverviewPage(page);


   await page.goto(BASE_URL);
   await loginPage.login(USERNAME, PASSWORD);
   await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
   //await productPage.addFirstproductToCart();
   await productPage.addSpecificproductsToCart(expectedProducts);
   await productPage.clickOnCartLink();
   await page.waitForURL('**/cart.html');
   await cartPage.clickcheckoutbutton();
   await page.waitForURL('**/checkout-step-one.html');
   await checkoutPage.fillCheckoutDetail(firstName,lastName,postalcode);
   await checkoutPage.clickOnContinue();
   await page.waitForURL('**/checkout-step-two.html');
   
  })
   
  test('Validate checkoutOverview',async({page})=>{

    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    const elements=await checkoutoverviewPage.getCheckoutOverviewElements();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.cancelButton).toBeVisible();
    await expect(elements.finishButton).toBeVisible();

  })

  test('Validate Cancel button functionality',async({page})=>{

    await checkoutoverviewPage.clickCancel();
    await page.waitForURL('**/inventory.html');
    // After clicking cancel on checkout overview, the app navigates to inventory.html
    // This is the actual behavior of the SauceDemo application

  })

  test('Validate the Item Total calculation',async({page})=>{

    const overviewproducts=await checkoutoverviewPage.getOverviewProducts();
    const calculatedTotal=overviewproducts.reduce((sum,{price})=>sum+parseFloat(price.replace("$","")),0);

    const UIItemTotal=await checkoutoverviewPage.getItemTotal();
    expect(calculatedTotal).toBeCloseTo(UIItemTotal, 2);

  })

  test('Validate Final total',async({page})=>{

    const itemTotal=await checkoutoverviewPage.getItemTotal();
    const tax=await checkoutoverviewPage.getTax();
    const finalTotal=await checkoutoverviewPage.getTotal();

    const expectedTotal=itemTotal+tax;
    expect(finalTotal).toEqual(expectedTotal);
  })

})