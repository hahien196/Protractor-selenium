import { HttpClient } from 'protractor-http-client';
import { Link } from '../const/api-link';
import { Const } from '../const/const';
import { ArticleModel } from './models/articles';
import { LoginModel } from './models/login';

const http = new HttpClient(Link.API_BASE);
export class HttpRequest { 
    private headers = {
        "Authorization" : Const.AUTHORIZATION,
        "Content-Type":Const.CONTENT_TYPE
    }
    
    async getToken(loginModel: LoginModel) {
        const response = await http.post(Link.LOGIN, loginModel, this.headers);
        return 'Token ' + response.body.user.token;
    }

    async createArticle(token: string, articleModel: ArticleModel) {
        this.headers["jwtauthorization"] = token;
        const response = await http.post(Link.ARTICLES, articleModel, this.headers);
        return await response.body.article.slug;
    }

    async getList(token: string, link: string, params?: any) {
        this.headers["jwtauthorization"] = token;
        if (params) {
            const response = await http.get(link + "?" + this.encodeQueryData(params), this.headers);
            return JSON.parse(response.body);
        } else {
            const response = await http.get(link, this.headers); 
            return JSON.parse(response.body);
        }
    }

    async deleteArticles(token: string, slug: string) {
        this.headers["jwtauthorization"] = token;
        const response = await http.delete(Link.ARTICLES_DETAIL.replace('{slug}', slug), this.headers); 
        return response.body;
    }

    encodeQueryData(data: any) {
        const ret = [];
        for (const d in data)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    
}
