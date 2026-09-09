import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { BASE_URL, PASSWORD, USERNAME } from '../../utils/envConfig';
import { LoginPage } from '../../pages/LoginPage';
import { CartPage } from '../../pages/CartPage';
import { CheckOutPage } from '../../pages/CheckOutPage';
import { CheckoutOverviewPage } from '../../pages/CheckOutOverViewPage';
import { FinalPage } from '../../pages/FinalPage';


test.describe('Final Page validation', () => {

    let loginPage;
    let productPage;
    let cartPage;
    let checkoutPage;
    let checkoutoverviewPage;
    let finalPage

    const expectedProducts = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    const firstName = 'John';
    const lastName = 'Doe';
    const postalcode = '12345';

  test.beforeEach("Final page validation",async ({ page }) => {
   loginPage = new LoginPage(page);
   productPage = new ProductPage(page);
   cartPage = new CartPage(page);
   checkoutPage = new CheckOutPage(page);
   checkoutoverviewPage=new CheckoutOverviewPage(page);
   finalPage=new FinalPage(page);


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
   await checkoutoverviewPage.clickFinish();
   
  })
   
  test('Validate checkoutOverview page and url',async({page})=>{

    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    const elements=await finalPage.getFinalPageElements();
    await expect(elements.backHomeButton).toBeVisible();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.sucessMsg).toBeVisible();
  })

  test('Validate sucess message',async({page})=>{

    const message=await finalPage.getSucessMsgText();
    expect(message).toBe("Thank you for your order!");
  })

  test('Validate Backhomebutton',async({page})=>{


    await finalPage.clickOnBackHomeBtn();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  })

   test('Validate Backhomebutton2',async({page})=>{


    await finalPage.clickOnBackHomeBtn();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

  })


})