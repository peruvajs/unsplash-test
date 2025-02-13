import { useState } from "react";
import { SearchForm } from "./components/SearchForm/SearchForm";
import { ImageGrid } from "./components/ImageGrid/ImageGrid";
import "./App.scss";
import cn from "classnames";

function App() {
  const [query, setQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSearch = (query: string) => {
    setQuery(query);
    setIsSubmitted(true);
  };

  return (
    <div className={cn("UNApp", { submitted: isSubmitted })}>
      <SearchForm onSearch={handleSearch} />
      {query && <ImageGrid query={query} />}
    </div>
  );
}

export default App;