import SearchIcon from "../../assets/Input/search.svg?react";
import ClearIcon from "../../assets/Input/clear.svg?react";
import './Input.scss'
import { useState } from 'react';

export function Input() {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const clearInput = () => {
        setValue("");
    }

    return (
      <div className="UNInput__wrapper">
        <SearchIcon className="UNInput__icon-search" />
        {value && (
            <ClearIcon className="UNInput__icon-clear" onClick={clearInput} />
        )}
        <input 
          className="UNInput" 
          placeholder='Телефоны, яблоки, груши...' 
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }