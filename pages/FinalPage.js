import { finalPageLocators } from "../locators/FinalPageLocators";

export class FinalPage

{
    constructor(page)
    {
        this.page=page;
    }


    async getFinalPageElements()
    {
        return {
            pageInfo: this.page.locator(finalPageLocators.pageInfo),
            sucessMsg: this.page.locator(finalPageLocators.sucessMsg),
            backHomeButton: this.page.locator(finalPageLocators.backHomeButton)
        };
    }

    async getSucessMsgText()
    {
       return await this.page.locator(finalPageLocators.sucessMsg).textContent();
    }

    async clickOnBackHomeBtn()
    {
        await this.page.locator(finalPageLocators.backHomeButton).click();
    }

}