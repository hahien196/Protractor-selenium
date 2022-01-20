import { browser, element, by, ElementFinder } from "protractor";
import { BasePage } from "./BasePage";
import { ArticleModel } from "../helper/models/articles";
export class ProfilePage extends BasePage {

    private lbUserInfo = element(by.xpath('//div[@class="user-info"]'));
    private lbTitle = element(by.xpath('(//div[@class="article-preview"]/a/h1)[1]'));
    private lbDesc = element(by.xpath('(//div[@class="article-preview"]/a/p)[1]'));

    private lbTag = element(by.xpath('(//div[@class="article-preview"]/a/ul)[1]'));
    private lbTags = element.all(by.xpath('(//div[@class="article-preview"]/a/ul)[1]/li'));
    private loading = element(by.xpath('//*[contains(text(), "Loading")]'));

    async verifyArticleInfo(article: ArticleModel) {
        // await this.inVisibilityOf(this.loading);
        await this.visibilityOf(this.lbUserInfo);
        await this.visibilityOf(this.lbTitle);
        expect(await this.lbTitle.getText()).toEqual(article.article.title.trim());
        expect(await this.lbDesc.getText()).toEqual(article.article.description.trim());
        var numofTags = article.article.tagList.length;
        expect((await this.lbTags).length == numofTags);
        for (let i = 0; i < numofTags; i++) {
            expect(await this.lbTags.get(i).getText()).toEqual(article.article.tagList[i].trim());
        }
    }
       
}