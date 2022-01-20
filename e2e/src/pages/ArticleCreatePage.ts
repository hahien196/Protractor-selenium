import { browser, element, by, ElementFinder } from "protractor";
import { BasePage } from "./BasePage";
import { ArticleModel } from "../helper/models/articles";
export class ArticleCreatePage extends BasePage {
    
    private txtTitle = element(by.xpath('//input[@formcontrolname="title"]'));
    private txtDescription = element(by.xpath('//input[@formcontrolname="description"]'));
    private txtArticleBody = element(by.xpath('//textarea[@formcontrolname="body"]'));
    private txtTag = element(by.xpath('//input[@placeholder="Enter tags"]'));
    private btnPublish = element(by.xpath('//button[contains(text(), "Publish Article")]'));

    async setTitle(input: string) {
        await this.type(this.txtTitle, input)
    }

    async setDescription(input: string) {
        await this.type(this.txtDescription, input)
    }

    async setArticleBody(input: string) {
        await this.type(this.txtArticleBody, input)
    }

    async setTags(tags: string[]) {
        for (let i = 0; i < tags.length; i ++) {             
            await this.typeAndEnter(this.txtTag, tags[i]);
        }
    }

    async inputData(article: ArticleModel) {
        await this.setTitle(article.article.title);
        await this.setDescription(article.article.description);
        await this.setArticleBody(article.article.body);
        await this.setTags(article.article.tagList);
    }

    async clickPublish() {
        await this.click(this.btnPublish);
    }
       
}