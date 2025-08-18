interface ErrorIconProps {
  className?: string;
}

export default function ErrorIcon({ className }: ErrorIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" role="img" aria-label="오류">
      <circle 
        cx="9" 
        cy="9" 
        r="7" 
        fill="rgba(248, 113, 113, 0.1)" 
        stroke="var(--error)" 
        strokeWidth="1.5"
      />
      <path 
        d="M6.5 6.5l5 5M11.5 6.5l-5 5" 
        stroke="var(--error)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}