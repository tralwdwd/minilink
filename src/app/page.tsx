"use client";
import { miniLinkClient } from "@/lib/links/client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

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
    <div className="flex min-h-screen flex-col items-center py-2 text-[#111827] bg-white dark:bg-[#111827] dark:text-white overflow-hidden">
      <div className="flex flex-col md:flex-row w-full max-w-3xl justify-between items-stretch mt-8 md:mt-16 h-auto md:h-[60vh]">
        <div className="flex flex-col items-center w-full md:w-1/2 space-y-4 justify-center h-full px-4 md:px-0 py-8 md:py-0">
          <input
            type="text"
            placeholder="Enter URL to shorten"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border rounded-xl p-2 h-10 w-full bg-gray-100 text-[rgb(17,24,39)]"
            autoFocus
            maxLength={2048}
          />
          <button
            className="bg-gray-300 text-[#111827] rounded-xl h-10 px-6 cursor-pointer w-full"
            onClick={shortenUrl}
          >
            Shorten
          </button>
        </div>
        <div className="flex flex-col items-center h-full justify-center w-full md:w-1/2 pl-0 md:pl-8 px-4 md:px-0 py-4 md:py-0">
          <h1 className="text-2xl text-center">
            MiniLink is a fast and easy-to-use URL shortener that requires no signup. Instantly shorten your long links and share them anywhere—no accounts, no hassle, just simple and efficient link management.
          </h1>
        </div>
      </div>
      <div className="w-full max-w-3xl flex flex-col items-center">
        {shortened !== "" && (
          <div className="mt-8 flex flex-col items-center">
            <h1 className="text-xl text-center mb-2">
              Shortened URL (click to copy)<br />
              <a onClick={() => {
                navigator.clipboard.writeText(shortened);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }} className="cursor-pointer">{shortened}</a>
            </h1>
            {copied && (
              <span className="text-green-500 text-sm mt-1">Copied!</span>
            )}
          </div>
        )}
        {isLoading && (
          <h1 className="mt-8 text-xl text-center">Loading...</h1>
        )}
        {error !== "" && (
          <h1 className="mt-8 text-xl text-center text-red-500">{error}</h1>
        )}
      </div>
    </div>
  );
}
