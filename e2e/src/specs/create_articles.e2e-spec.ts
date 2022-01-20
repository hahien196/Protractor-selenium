import { Link } from '../const/api-link';
import { Const } from '../const/const';
import { HttpRequest } from '../helper/http-request';
import { ArticleModel } from '../helper/models/articles';
import { LoginModel } from '../helper/models/login';
import { ArticleCreatePage } from '../pages/ArticleCreatePage';
import { ArticleDetailPage } from '../pages/ArticleDetailPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';

describe('Create Articles: ', () => {

  let loginPage = new LoginPage;
  let homePage = new HomePage;
  let articleCreatePage = new ArticleCreatePage;
  let articleDetailPage = new ArticleDetailPage;
  let profilePage = new ProfilePage;
  const testData = require('../testData/create-articles.json');
  let token: string;
  let httpRequest = new HttpRequest();

  const loginModel: LoginModel = {
    user: {
      email: Const.DEFAULT_EMAIL,
      password: Const.DEFAULT_PASSWORD
    }
  };

  beforeAll(async () => {
    // setup: remove all my articles before testing
    token = await httpRequest.getToken(loginModel);
    const articleResponse = await httpRequest.getList(token, Link.ARTICLES, { author: Const.DEFAULT_USERNAME });           
    var slugs = articleResponse.articles.map(article => article.slug);  
    slugs.forEach(async slug => {
      await httpRequest.deleteArticles(token, slug);
    });

    await homePage.clickSignIn();
    await loginPage.doLogin(loginModel);

  });

  beforeEach(async () => {
    await homePage.clickNewArticle();
  });

  for (let i = 0; i < testData.length; i++) {
    it(testData[i].testcaseID, async () => {
      const articleModel: ArticleModel = {
        article: {
          title: testData[i].title,
          description: testData[i].desciption,
          body: testData[i].body,
          tagList: testData[i].tags
        }
      };    
      await articleCreatePage.inputData(articleModel);
      if (testData[i].isSuccess == true) {        
        await articleCreatePage.clickPublish();
        await articleDetailPage.verifyCreatedArticleInfo(articleModel);
        await homePage.clickHome();
        await homePage.clickGlobaFeed();
        await homePage.verifyCreateArticleIncludeInGlobalFeed(articleModel);
        // comment below 2 commands to by pass and check other checkpoint
        // await homePage.clickYourFeed();
        // await homePage.verifyCreateArticleIncludeInYourFeed(articleModel);
        await homePage.clickProfile();
        await profilePage.verifyArticleInfo(articleModel);
      }
            
    });
  }

  it("IT-CreateArticles-002", async () => {
    const articleModel: ArticleModel = {
      article: {
        title: 'existed',
        description: "desc",
        body: "body",
        tagList: []
      }
    };
    // create an article by API before creating the same article in UI
    await httpRequest.createArticle(token, articleModel);

    await articleCreatePage.inputData(articleModel); 
    await articleCreatePage.clickPublish();
    await articleDetailPage.verifyCreatedArticleInfo(articleModel);
    await homePage.clickHome();
    await homePage.clickGlobaFeed();
    await homePage.verifyCreateArticleIncludeInGlobalFeed(articleModel);
    await homePage.clickYourFeed();
    await homePage.verifyCreateArticleIncludeInYourFeed(articleModel);   
    await homePage.clickProfile();
    await profilePage.verifyArticleInfo(articleModel);     
  });
});
