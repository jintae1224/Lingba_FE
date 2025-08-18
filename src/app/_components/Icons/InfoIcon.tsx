interface InfoIconProps {
  className?: string;
}

export default function InfoIcon({ className }: InfoIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" role="img" aria-label="정보">
      <circle 
        cx="9" 
        cy="9" 
        r="7" 
        fill="rgba(96, 165, 250, 0.1)" 
        stroke="var(--primary-500)" 
        strokeWidth="1.5"
      />
      <circle 
        cx="9" 
        cy="6.5" 
        r="0.5" 
        fill="var(--primary-500)"
      />
      <path 
        d="M9 9v3" 
        stroke="var(--primary-500)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
    </svg>
  );
}