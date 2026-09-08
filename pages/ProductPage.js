import { productPageLocators } from "../locators/ProductPageLocators";

export class ProductPage {
    constructor(page) {
        this.page = page;
    }

    async logout() {
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.logoutLink);
    }

    async openaboutPage() {
        await this.page.click(productPageLocators.settingIcon);
        await this.page.click(productPageLocators.aboutLink);
    }

    async validateAllProductsDisplayed() {
        const names = await this.page.locator(productPageLocators.productNames).allTextContents();
        const descriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
        const buttonCount = await this.page.locator(productPageLocators.addToCartButtons).count();

        if (names.length === 0) {
            throw new Error("No products found");
        }

        if (names.length !== descriptions.length || names.length !== prices.length || names.length !== buttonCount) {
            throw new Error("Mismatch between the product details");
        }
    }

    async addFirstproductToCart()
    {
        await this.page.locator(productPageLocators.addToCartButtons).first().click();
    }

    async addAllProductsToCart()
    {
        const buttons=this.page.locator(productPageLocators.addToCartButtons)
        const count=await buttons.count();

        for(let i=0;i<count; i++)
        {
            await buttons.nth(i).click();
            await this.page.waitForTimeout(3000);
        }
    }

    async addSpecificproductsToCart(productNames) {
        const addProducts = this.page.locator(productPageLocators.productNames);
        const totalProducts = await addProducts.count();

        for (let i = 0; i < totalProducts; i++) {
            const name = await addProducts.nth(i).textContent();
            if (name && productNames.includes(name.trim())) {
                await this.page.locator(productPageLocators.addToCartButtons).nth(i).click();
                await this.page.waitForTimeout(3000);
            }
        }
    }

    async filterByNameAtoZ()
    {
        await this.page.selectOption(productPageLocators.filterDropdown,"az");
    }
    async filterByNameZtoA()
    {
        await this.page.selectOption(productPageLocators.filterDropdown,"za");
    }
    async filterByLowtoHigh()
    {
        await this.page.selectOption(productPageLocators.filterDropdown,"lohi");
    }
    async filterByHightoLow()
    {
        await this.page.selectOption(productPageLocators.filterDropdown,"hilo");
    
    }

    async getProductNames()
    {
        return await this.page.locator(productPageLocators.productNames).allTextContents();
    }

    async getProductPrices()
    {
        const prices=await this.page.locator(productPageLocators.productPrices).allTextContents();
        return prices.map(price =>parseFloat(price.replace('$','')))
    }

    async clickOnCartLink()
    {
        await this.page.locator(productPageLocators.cartlink).click();
    }

    async getFirstProductDetails() {
        const name = await this.page.locator(productPageLocators.productNames).first().textContent();
        const description = await this.page.locator(productPageLocators.productDescription).first().textContent();
        const price = await this.page.locator(productPageLocators.productPrices).first().textContent();
        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim(),
        };
    }

    async getAllProductDetails() {
        const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
        const allDescription = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(productPageLocators.productPrices).allTextContents();

        // array of objects to send to spec
        const allProducts = allNames.map((_, i) => ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim(),
        }));
        return allProducts;
    }

    async getSpecificProductDetails(productNames) {
        const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
        const allDescription = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(productPageLocators.productPrices).allTextContents();

        // array of objects
        const allProducts = allNames.map((_, i) => ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrices[i].trim(),
        }));
        return allProducts.filter(p => productNames.includes(p.name));
    }
}