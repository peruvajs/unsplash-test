import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useState, useEffect } from "react";
import "./SearchForm.scss";
import { SearchFormProps } from "../../types/SearchForm";

export function SearchForm({ onSearch }: SearchFormProps) {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => setIsError(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    if (!query) {
      setIsError(true);
      return;
    }
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="UNSearchForm">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
        isError={isError}
      />
      <Button type="submit">Искать</Button>
    </form>
  );
}