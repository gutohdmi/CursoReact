import type {HTMLInputTypeAttribute} from 'react' ;

type Props ={
    labelText: string,
    labelType: HTMLInputTypeAttribute
    labelPosition?: 'top'| 'right'
}

export function SafeInput({ labelText, labelType,labelPosition}: Props) {

    return(
    <div style={labelPosition === 'right'? {display:'flex', flexDirection:'row-reverse', marginBottom: '10px'}
        :{display:'flex', flexDirection:'column', marginBottom: '10px'}
    }>
        <label> {labelText}</label>
        <input type={labelType} />
    </div>
);
}

export default SafeInput;