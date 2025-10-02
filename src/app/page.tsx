import Link from 'next/link';
import { shortenUrl } from './serverActions/ShortenUrlAction';

   export default function Home() {
     return (
       <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
         <div className="p-10 bg-white rounded-lg shadow-2xl max-w-lg">
           <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">URL SHORTY</h1>
           <form action={shortenUrl} className="space-y-6">
             <input
               type="text"
               placeholder="Enter URL"
               name="originalUrl"
               className="w-full py-2 px-4 border border-gray-300 rounded text-black font-bold"
             />
             <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">
               Shorten
             </button>
           </form>
           <div className="mt-6 text-center">
             <Link href="/urls">
               <span className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                 View All Shortened URLs
               </span>
             </Link>
           </div>
         </div>
       </div>
     );
   }