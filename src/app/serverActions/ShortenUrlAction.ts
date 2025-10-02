import { UrlShortenerService } from "@/services/URLShortnerService";

export const shortenUrl = async (formData: FormData) => {
    'use server'
    const originalUrl: string = formData.get('originalUrl') as string;
    console.log("Original Url is ", originalUrl);

    const shortenService = new UrlShortenerService();
    const shortUrl = await shortenService.shortenUrl(originalUrl);
}