import type { HTMLInputTypeAttribute } from 'react';

type Props = {
    labelText: string;
    labelType: HTMLInputTypeAttribute;
    labelPosition?: 'top' | 'right';
    name: string;
    state?: string;
    onChange?: (newState: string) => void;
    valid?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    //
};

export function SafeInput({ labelText, labelType, labelPosition, name, state, onChange, valid, inputRef }: Props) {
    return (
        <div
            style={
                labelPosition === 'right'
                    ? { display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-end', gap: 8 }
                    : { display: 'flex', flexDirection: 'column' }
            }
        >
            <label style={{ color: valid ? 'unset' : 'red' }}>{labelText}</label>
            <input
                type={labelType}
                name={name}
                value={state}
                onChange={(event) => {
                    if (onChange) onChange(event.target.value);
                }}
                ref={inputRef}
            />
        </div>
    );
}