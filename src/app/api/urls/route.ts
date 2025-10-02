import { UrlShortenerService } from "@/services/URLShortnerService";
import { NextResponse } from "next/server";
import { cache } from "react";

const fetchUrls = cache(async () => {
  const shortenerService = new UrlShortenerService();
  return await shortenerService.getAllUrls();
});

export async function GET() {
  try {
    const urls = await fetchUrls();
    console.log("Urls are",urls);

    const response = NextResponse.json({ urls });
    response.headers.set(
      "Cache-Control",
      "public, max-age=60, s-maxage=60, stale-while-revalidate=59"
    );

    console.log("Response are ", response);

    return response;
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { error: "Failed to fetch URLs" },
      { status: 500 }
    );
  }
}
