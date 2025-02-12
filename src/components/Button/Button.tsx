import { ButtonProps } from '../../types/Button';
import './Button.scss'

export function Button({ children, ...props }: ButtonProps) {
    return (
        <button className="button" {...props}>{children}</button>
    );
}