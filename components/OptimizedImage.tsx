"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type OptimizedImageProps = Omit<ImageProps, "onLoad" | "onError"> & {
  /** Text shown if the image fails to load. Defaults to `alt`. */
  fallbackLabel?: string;
};


export default function OptimizedImage({
  fallbackLabel,
  className = "",
  alt,
  ...props
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400 text-xs px-4 text-center">
        {fallbackLabel ?? alt ?? "Image unavailable"}
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className="absolute inset-0 bg-neutral-200 animate-pulse"
          aria-hidden="true"
        />
      )}
      <Image
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        {...props}
      />
    </>
  );
}