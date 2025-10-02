import { UrlShortenerService } from "@/services/URLShortnerService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { originalUrl } = await req.json();
    console.log("Original Url is: ", originalUrl);
    const shortenerService = new UrlShortenerService();
    const shortUrl = await shortenerService.shortenUrl(originalUrl);
    return NextResponse.json({shortUrl}, {status: 201})
}

export async function GET() {
    const shortenerService = new UrlShortenerService();
    const urls = await shortenerService.getAllUrls();
    console.log("shorten urls is ", urls);

    const response = NextResponse.json({urls});
    console.log("shorten reponse is ", response);
    return response;


}