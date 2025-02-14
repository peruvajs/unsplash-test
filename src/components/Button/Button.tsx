import { ButtonProps } from '../../types/Button';
import './Button.scss'

export function Button({ children, ...props }: ButtonProps) {
    return (
        <button className="UNButton" {...props}>
          {children}
        </button>
    );
}