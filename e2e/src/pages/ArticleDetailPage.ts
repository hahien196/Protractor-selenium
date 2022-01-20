import { browser, element, by, ElementFinder } from "protractor";
import { BasePage } from "./BasePage";
import { ArticleModel } from "../helper/models/articles";
export class ArticleDetailPage extends BasePage {

    private lbTitle = element(by.xpath('//div[@class="article-page"]/div/div/h1'));
    private lbBody = element(by.xpath('//div[@class="row article-content"]/div/div'));
    private lbTags = element.all(by.xpath('//div[@class="row article-content"]/div/ul/li'));

    async verifyCreatedArticleInfo(article: ArticleModel) {
        await this.visibilityOf(this.lbTitle);
        expect(await this.lbTitle.getText()).toEqual(article.article.title.trim());
        expect(await this.lbBody.getText()).toEqual(article.article.body.trim());
        for (let i = 0; i < article.article.tagList.length; i++) {
            expect(await this.lbTags.get(i).getText()).toEqual(article.article.tagList[i].trim());
        }
    }
       
}