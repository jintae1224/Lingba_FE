interface SuccessIconProps {
  className?: string;
}

export default function SuccessIcon({ className }: SuccessIconProps) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" role="img" aria-label="성공">
      <circle 
        cx="9" 
        cy="9" 
        r="7" 
        fill="rgba(34, 197, 94, 0.1)" 
        stroke="var(--success)" 
        strokeWidth="1.5"
      />
      <path 
        d="M6 9l2 2 4-4" 
        stroke="var(--success)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}