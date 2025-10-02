import UrlRepository from "@/repositories/URLrepository";
import { redirect } from "next/navigation";

async function fetchOriginalUrl (shortUrl: string) {
    const urlRepository = new UrlRepository();
    const response =  await urlRepository.getUrlByShortUrl(shortUrl);
    console.log('shortUrl is ', shortUrl);
    console.log('response is ', response);
    return response?.originalUrl;
}

export default async function urlRedirect({params}: {params: {id: string}}) {
    console.log(params?.id);
    const originalUrl = await fetchOriginalUrl(`${params?.id}`);
    if(originalUrl)
        redirect(originalUrl);
    redirect('/404')
    return null;
}