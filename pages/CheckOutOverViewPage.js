import{checkoutOverViewLocators} from "../locators/CheckoutOverviewLocators"; 
export class CheckoutOverviewPage
{
     constructor(page) {
        this.page = page;
    }

    async getCheckoutOverviewElements()
    {
        return{
            pageInfo: this.page.locator(checkoutOverViewLocators.pageInfo),
            cancelButton: this.page.locator(checkoutOverViewLocators.cancelButton),
            finishButton:  this.page.locator(checkoutOverViewLocators.finishButton)


        }
    }

    async getOverviewProducts()
    {
                const allNames = await this.page.locator(checkoutOverViewLocators.productNames).allTextContents();
                const allDescription = await this.page.locator(checkoutOverViewLocators.productDescription).allTextContents();
                const allPrices = await this.page.locator(checkoutOverViewLocators.productPrices).allTextContents();
        
                // array of objects
                const allCartProducts = allNames.map((_, i) => ({
                    name: allNames[i].trim(),
                    description: allDescription[i].trim(),
                    price: allPrices[i].trim(),
                }));
                return allCartProducts;
    }

    async getItemTotal()
    {
        const text=await this.page.locator(checkoutOverViewLocators.itemTotal).textContent();
        return parseFloat(text.trim().replace("Item total: $",""));
    }
    async getTax()
    {
           const text=await this.page.locator(checkoutOverViewLocators.tax).textContent();
            return parseFloat(text.trim().replace("Tax: $",""));
    }

    async getTotal()
    {
           const text=await this.page.locator(checkoutOverViewLocators.total).textContent();
           return parseFloat(text.trim().replace("Total: $",""));

    }

    async clickCancel()
    {
        await this.page.locator(checkoutOverViewLocators.cancelButton).click();
    }

      async clickFinish()
    {
        await this.page.locator(checkoutOverViewLocators.finishButton).click();
    }
}
