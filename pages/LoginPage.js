import { LoginLocators } from "../locators/LoginLocators";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async login(username, password) {
    // use this.page and pass the values to fill()
    await this.page.fill(LoginLocators.userNameInput, username);
    await this.page.fill(LoginLocators.passwordInput, password);
    await this.page.click(LoginLocators.loginButton);
  }
}
