"use client";
import { use, useEffect, useState } from "react";
import { miniLinkClient } from "@/lib/links/client";

export default function LinkMatcher({params,}: {params: Promise<{code: string}>}) {  
    const { code } = use(params);
    const [originalUrl, setOriginalUrl] = useState("");
    const [error, setError] = useState("");
    
    useEffect(() => {
        async function fetchUrl() {
            let url = await miniLinkClient.getUrl(code as string);
            if (url !== null) {
                setOriginalUrl(url);
            } else {
                setError(`Link code or page not found`);
            }
        }
        fetchUrl();
    }, []);

    useEffect(() => {
        if (originalUrl && !error) {
            const timer = setTimeout(() => {
                window.location.href = originalUrl;
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [originalUrl, error]);

    return <div className="bg-white dark:bg-[#111827] min-h-screen min-w-screen overflow-hidden">
        {error && (
            <h1 className="mt-3 text-xl text-center text-red-500">{error}</h1>
        )}
        {originalUrl && !error && (
            <h1 className="mt-3 text-xl text-center text-[#111827]  dark:text-white">
              Redirecting to <br /> <a href={originalUrl}>{originalUrl}</a>
            </h1>
        )}
    </div>;
}