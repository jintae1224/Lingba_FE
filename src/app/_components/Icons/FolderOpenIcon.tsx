interface FolderOpenIconProps {
  className?: string;
}

export default function FolderOpenIcon({ className }: FolderOpenIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      <path d="M2 13l6-2 4 4 6-4" />
    </svg>
  );
}