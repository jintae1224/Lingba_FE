import { useCallback } from "react";

import { useSearch } from "@/hooks/search/useSearch";

export function useSearchForm() {
  const { handleQueryChange, clearSearch } = useSearch();

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleQueryChange(e.target.value);
    },
    [handleQueryChange]
  );

  const handleClear = useCallback(() => {
    clearSearch();
  }, [clearSearch]);

  return {
    handleSubmit,
    handleInputChange,
    handleClear,
  };
}
