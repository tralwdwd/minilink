"use client";
import { miniLinkClient } from "@/lib/links/client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const shortenUrl = async () => {
    if (!isValidWebUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }
    setIsLoading(true);
    const shortcode = await miniLinkClient.newLink(url);
    setShortened(`${window.location.origin}/${shortcode}`);
    setError("");
    setIsLoading(false);
  }

  function isValidWebUrl(url: string): boolean {
    let regEx = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return regEx.test(url);
  }

  return (
    <div className="flex min-h-screen flex-col items-center py-2 text-[#111827] bg-white dark:bg-[#111827] dark:text-white">
      <h1 className="text-4xl pt-5">MiniLink</h1>
      <div className="flex items-center space-x-4 mt-5">
        <input
          type="text"
          placeholder="Enter URL to shorten"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border rounded-xl p-2 h-10 w-96 bg-gray-100 text-[rgb(17,24,39)]"
          autoFocus
        />
        <button
          className="bg-gray-300 text-[#111827] rounded-xl h-10 p-1.5 cursor-pointer"
          onClick={shortenUrl}
        >
          Shorten
        </button>
      </div>
          {!(shortened == "") && (
            <h1 className="mt-3 text-xl text-center">
              Shortened URL <br /> <a href={shortened}>{shortened}</a>
            </h1>
          )}
          {isLoading && (
            <h1 className="mt-3 text-xl text-center">Loading...</h1>
          )}
          {!(error == "") && (
            <h1 className="mt-3 text-xl text-center text-red-500">{error}</h1>
          )}

    </div>
  );
}
