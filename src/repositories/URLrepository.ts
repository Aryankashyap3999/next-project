import connectDB from "@/config/db";
import Url, { IUrl } from "@/models/URL";

class UrlRepository {
    private urlModel;
    constructor() {
        connectDB();
        this.urlModel = Url;
    }

    async getUrlById(id: string) : Promise<IUrl | null> {
        return await this.urlModel.findById(id).lean();
    }

    async getUrlByShortUrl(shortUrl: string) : Promise<IUrl | null> {
        return await this.urlModel.findOne({shortUrl}).lean();
    }

    async getUrlByOriginalUrl(originalUrl: string) : Promise<IUrl | null> {
        return await this.urlModel.findOne({originalUrl}).lean();
    }

    async getAllUrls() : Promise<IUrl[] | null> {
        return await this.urlModel.find().lean();
    }

    async deleteUrlById(id: string) : Promise<IUrl | null> {
        return await this.urlModel.findByIdAndDelete(id).lean();
    }

    async createUrl(originalUrl: string, shortUrl: string) : Promise<IUrl | null> {
        return await this.urlModel.create({shortUrl, originalUrl})
    }

    async updateUrl(id: string, updatedUrl: string) : Promise<IUrl | null> {
        return await this.urlModel.findByIdAndUpdate({id, updatedUrl})
    }
}