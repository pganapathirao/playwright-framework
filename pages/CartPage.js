import { cartPagelocators } from "../locators/CartPageLocators";

export class CartPage {
    constructor(page) {
        this.page = page;
    }

    async clickOnContinueShopping() {
        await this.page.click(cartPagelocators.continueshopping);
    }

    async continueShopping() {
        await this.clickOnContinueShopping();
    }

    async getCartPageElements() {
        return {
            cartTitle: this.page.locator(cartPagelocators.cartTitle),
            continueShopping: this.page.locator(cartPagelocators.continueshopping),
            checkout: this.page.locator(cartPagelocators.checkout),
        };
    }

    async getCartProducts() {
        const allNames = await this.page.locator(cartPagelocators.productNames).allTextContents();
        const allDescription = await this.page.locator(cartPagelocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(cartPagelocators.productPrices).allTextContents();

        // array of objects
        const allCartProducts = allNames.map((_, i) => ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim(),
        }));
        return allCartProducts;
    }

    async removeFirstProduct() {
        await this.page.locator(cartPagelocators.removebutton).first().click();
    }

    async clickcheckoutbutton()
    {
         await this.page.locator(cartPagelocators.checkout).first().click();
    }
}
