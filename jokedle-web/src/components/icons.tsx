/**
 * Inline SVG rather than emoji: these need to scale, take a currentColor fill
 * and stay legible at 14px. Every one is decorative — the text beside it
 * carries the meaning — so they are all aria-hidden.
 */

interface IconProps {
  size?: number;
}

export const SunIcon = ({ size = 14 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.4v2.2M12 19.4v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.4 12h2.2M19.4 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
  </svg>
);

export const MoonIcon = ({ size = 14 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.4 14.6A8.6 8.6 0 0 1 9.4 3.6a8.6 8.6 0 1 0 11 11Z" />
  </svg>
);

export const HeartIcon = ({ size = 19 }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M12 20.6S3.6 15.3 3.6 9.5A4.85 4.85 0 0 1 12 6.5a4.85 4.85 0 0 1 8.4 3c0 5.8-8.4 11.1-8.4 11.1Z" />
  </svg>
);

export const CheckIcon = ({ size = 16 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const CrossIcon = ({ size = 16 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.8}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export const AlertIcon = ({ size = 30 }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M12 7.5v6.2" />
    <circle cx="12" cy="17.4" r="1.3" fill="currentColor" stroke="none" />
    <path d="M12 3.2 1.9 20.3h20.2L12 3.2Z" strokeLinejoin="round" />
  </svg>
);
