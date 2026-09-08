import { CheckoutPageLocators } from "../locators/ChecOutPageLocator"; 
export class CheckOutPage
{
    constructor(page)
    {
        this.page = page;
    }


    async getCheckoutElements()
    {
        return {
            pageInfo: this.page.locator(CheckoutPageLocators.pageInfo),
            cancel: this.page.locator(CheckoutPageLocators.cancelButton),
            continue: this.page.locator(CheckoutPageLocators.continueButton)
        };
    }

    async fillCheckoutDetail(firstName,lastName,postalcode)
    {
        await this.page.fill(CheckoutPageLocators.firstName, firstName);
        await this.page.fill(CheckoutPageLocators.lastName, lastName);
        await this.page.fill(CheckoutPageLocators.postalcode, postalcode);
    }

    async clickOnCancel()
    {
        await this.page.click(CheckoutPageLocators.cancelButton);
    }

    async clickOnContinue()
    {
        await this.page.click(CheckoutPageLocators.continueButton);
    }

    async getErrorMessage()
    {
        return await this.page.locator(CheckoutPageLocators.errorMsg).textContent();
    }
}