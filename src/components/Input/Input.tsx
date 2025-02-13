import SearchIcon from "../../assets/Input/search.svg?react";
import ClearIcon from "../../assets/Input/clear.svg?react";
import './Input.scss'
import { forwardRef } from 'react';
import { type InputProps } from "../../types/Input";
import cn from 'classnames';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, onClear, isError }, ref) => {
    return (
      <div className={cn("UNInput__wrapper", [{"UNInput__wrapper-error": isError}])}>
        <SearchIcon className="UNInput__icon-search" />
        {value && <ClearIcon className="UNInput__icon-clear" onClick={onClear} />}
        <input 
          ref={ref} 
          className="UNInput" 
          placeholder="Телефоны, яблоки, груши..." 
          value={value} 
          onChange={onChange} 
        />
      </div>
    );
  }
);