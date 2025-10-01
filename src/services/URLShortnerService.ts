import UrlRepository from "@/repositories/URLrepository";
import shortId from "shortid";

export class Urls {
  private urlRepository;

  constructor() {
    this.urlRepository = new UrlRepository();
  }

  async shortenUrl(originalUrl: string): Promise<string> {
    // Check if URL already exists
    let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
    if (url) {
      return url.shortUrl;
    }

    // Generate a new short URL
    let shortUrl = shortId.generate();

    url = await this.urlRepository.getUrlByShortUrl(shortUrl);
    while(url) {
        shortUrl = shortId();
        url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
    }

    await this.urlRepository.createUrl(originalUrl, shortUrl);
    return shortUrl;

  }

  async getAllUrls() {
    await this.urlRepository.getAllUrls();
  }

  async getUrlByShortUrl(shortUrl: string) {
    await this.urlRepository.getUrlByShortUrl(shortUrl);
  }
}
