import { browser, element, by, ElementFinder } from "protractor";
import { Const } from "../const/const";
import { ArticleModel } from "../helper/models/articles";
import { BasePage } from "./BasePage";
export class HomePage extends BasePage {

    private btnHome = element(by.xpath('//a[@routerlink="/" and contains(text(), "Home")]'));
    private btnSignIn = element(by.xpath('//a[@routerlink="/login"]'));
    private btnNewArticle = element(by.xpath('//a[@routerlink="/editor"]'));
    private btnProfile = element(by.xpath('//div[@class="container"]/ul/li[@class="nav-item"]/a[@href="/profile/' + Const.DEFAULT_USERNAME + '"]'))
    
    // Your Feed
    private btnYourFeed = element(by.xpath('//div[@class="feed-toggle"]/ul/li[1]/a'));
    private lbYF_ArticleTitleXpath = '(//a[@class="author" and contains(text(), "{title}")])[1]/../../../following-sibling::a/h1';
    private lbYF_ArticleDescXpath = '(//a[@class="author" and contains(text(), "{title}")])[1]/../../../following-sibling::a/p';
    private lbYF_ArticleTagsXpath = '(//a[@class="author" and contains(text(), "{title}")])[1]/../../../following-sibling::a/ul/li';
  
    // Global Feed
    private btnGlobaFeed = element(by.xpath('//div[@class="feed-toggle"]/ul/li[2]/a'));
    private lbGF_ArticleTitleXpath = '(//a[@class="author" and contains(text(), "{username}")])[1]/../../../following-sibling::a/h1';
    private lbGF_ArticleDescXpath = '(//a[@class="author" and contains(text(), "{username}")])[1]/../../../following-sibling::a/p';
    private lbGF_ArticleTagsXpath = '(//a[@class="author" and contains(text(), "{username}")])[1]/../../../following-sibling::a/ul/li';
    
    public async verifyCreateArticleIncludeInGlobalFeed(article: ArticleModel) {
        var username = Const.DEFAULT_USERNAME;
        var title = element(by.xpath(this.lbGF_ArticleTitleXpath.replace('{username}', username)));
        var desc = element(by.xpath(this.lbGF_ArticleDescXpath.replace('{username}', username)));
        var tags = element.all(by.xpath(this.lbGF_ArticleTagsXpath.replace('{username}', username)));
        await this.visibilityOf(title);
        expect(await title.getText()).toEqual(article.article.title.trim());
        expect(await desc.getText()).toEqual(article.article.description.trim());
        var numofTags = article.article.tagList.length;
        expect((await tags).length == numofTags);
        for (let i = 0; i < numofTags; i++) {
            expect(await tags.get(i).getText()).toEqual(article.article.tagList[i].trim());
        }
    }

    public async verifyCreateArticleIncludeInYourFeed(article: ArticleModel) {
        var artTitle = article.article.title;
        var title = element(by.xpath(this.lbYF_ArticleTitleXpath.replace('{title}', artTitle)));
        var desc = element(by.xpath(this.lbYF_ArticleDescXpath.replace('{title}', artTitle)));
        var tags = element.all(by.xpath(this.lbYF_ArticleTagsXpath.replace('{title}', artTitle)));
        await this.visibilityOf(title);
        expect(await title.getText()).toEqual(article.article.title.trim());
        expect(await desc.getText()).toEqual(article.article.description.trim());
        var numofTags = article.article.tagList.length;
        expect((await tags).length == numofTags);
        for (let i = 0; i < article.article.tagList.length; i++) {
            expect(await tags.get(i).getText()).toEqual(article.article.tagList[i].trim());
        }
    }
    public async clickHome() {
        await this.click(this.btnHome);
    }
    public async clickSignIn() {
        await browser.get(browser.baseUrl);
        await this.click(this.btnSignIn);
    }
    public async clickNewArticle() {
        await this.click(this.btnNewArticle);
    }
    public async clickProfile() {
        await this.click(this.btnProfile);
    }

    public async clickYourFeed() {
        await this.click(this.btnYourFeed);
    }
    public async clickGlobaFeed() {
        await this.click(this.btnGlobaFeed);
    }
  }