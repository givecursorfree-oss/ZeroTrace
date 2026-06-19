type IconProps = {
  className?: string;
};

export function AndroidIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8.2 3.6 6.8 2.1a.45.45 0 0 1 .64-.64l1.6 1.6a7.1 7.1 0 0 1 6.92 0l1.6-1.6a.45.45 0 1 1 .64.64l-1.4 1.5A6.55 6.55 0 0 1 20.5 10v5.5a1.5 1.5 0 0 1-1.5 1.5H18v2.25a1.25 1.25 0 1 1-2.5 0V17H8.5v2.25a1.25 1.25 0 1 1-2.5 0V17H5a1.5 1.5 0 0 1-1.5-1.5V10a6.55 6.55 0 0 1 4.7-6.4ZM7.5 11.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm9 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
        fill="#3DDC84"
      />
      <path
        d="M4.25 10.75c0-.97.79-1.75 1.75-1.75h12c.97 0 1.75.78 1.75 1.75v4.5H4.25v-4.5Z"
        fill="#2EB872"
        opacity="0.35"
      />
    </svg>
  );
}

export function WindowsIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3.2 4.6 10.4 3.5v7.2H3.2V4.6Z" fill="#00ADEF" />
      <path d="M11.4 3.3 20.8 1.8v8.9h-9.4V3.3Z" fill="#00ADEF" />
      <path d="M3.2 12.2h7.2v7.2l-7.2-1.1V12.2Z" fill="#00ADEF" />
      <path d="M11.4 12.2H20.8v9.4l-9.4-1.5V12.2Z" fill="#00ADEF" />
    </svg>
  );
}
