import { browser, element, by, ElementFinder } from "protractor";
import { BasePage } from "./BasePage";
import { LoginModel } from "../helper/models/login";
export class LoginPage extends BasePage {
    
    private txtEmail = element(by.xpath('//input[@formcontrolname="email"]'));
    private txtPassword = element(by.xpath('//input[@formcontrolname="password"]'));
    private btnSubmit = element(by.xpath('//button[@type="submit"]'));
    private btnProfileXpath = '//a[@href="/profile/{username}"]';

    public async setEmail(input: string) {
        await this.type(this.txtEmail, input)
    }

    public async setPassword(input: string) {
        await this.type(this.txtPassword, input)
    }

    public async clickSubmit() {
        await this.click(this.btnSubmit);
    }
    public async clickProfile(username: string) {
        await this.click(element(by.xpath(this.btnProfileXpath.replace('{username}', username))));
    }

    public async doLogin(loginModel: LoginModel) {
        await this.setEmail(loginModel.user.email);
        await this.setPassword(loginModel.user.password);
        await this.click(this.btnSubmit);
    }
    
}