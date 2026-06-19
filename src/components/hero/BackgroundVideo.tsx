'use client';

import { useEffect, useRef } from 'react';

export const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {
        // Autoplay may be blocked; ignore without surfacing a runtime error.
      });
    };

    video.addEventListener('loadeddata', play);
    return () => video.removeEventListener('loadeddata', play);
  }, []);

  return (
    <video
      ref={videoRef}
      className="protected-asset absolute inset-0 z-0 h-full w-full object-cover"
      data-protected-asset="true"
      draggable={false}
      autoPlay
      muted
      loop
      playsInline
      onError={() => {
        // Swallow media error events — a broken CDN URL must not crash the page.
      }}
      aria-hidden="true"
    >
      <source src={HERO_VIDEO_URL} type="video/mp4" />
    </video>
  );
}
