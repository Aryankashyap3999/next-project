import Link from "next/link";

async function fetchUrls() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`, {
    cache: "default", // Disable caching to ensure fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch URLs");
  }

  const data = await response.json();
  console.log("Final response is", data);
  return data.urls; // Extract the `urls` array directly
}

export default async function UrlList() {
  let urls;

  try {
    urls = await fetchUrls();
    console.log("Fetched URLs are", urls);
  } catch (error) {
    console.error(error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Error</h1>
          <p className="text-red-600 dark:text-red-400 mb-6">Failed to load URLs. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors duration-200">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100">All Short URLs</h1>
          {urls.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 italic text-lg">No URLs found.</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Start by creating a new short URL!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 dark:border-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Original URL</th>
                    <th className="text-left px-6 py-4 font-semibold text-gray-900 dark:text-gray-100">Short URL</th>
                  </tr>
                </thead>
                <tbody>
                  {urls.map((url: { _id: string; originalUrl: string; shortUrl: string }) => (
                    <tr
                      key={url._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-200 break-words max-w-[50vw] sm:max-w-[30vw]">
                        <a
                          href={url.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                          title={url.originalUrl}
                        >
                          {url.originalUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-gray-700 dark:text-gray-200">
                        <a
                          href={`${process.env.NEXT_PUBLIC_BASE_URL}/urls/${url.shortUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        >
                          {`${process.env.NEXT_PUBLIC_BASE_URL}/urls/${url.shortUrl}`}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Link href='/'>Go to Home</Link>
        </div>
        
      </div>
    </div>
  );
}