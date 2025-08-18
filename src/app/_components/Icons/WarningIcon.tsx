interface WarningIconProps {
  className?: string;
}

export default function WarningIcon({ className }: WarningIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" role="img" aria-label="경고">
      <circle 
        cx="9" 
        cy="9" 
        r="7" 
        fill="rgba(251, 191, 36, 0.1)" 
        stroke="var(--warning)" 
        strokeWidth="1.5"
      />
      <path 
        d="M9 6v3" 
        stroke="var(--warning)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <circle 
        cx="9" 
        cy="12" 
        r="0.5" 
        fill="var(--warning)"
      />
    </svg>
  );
}