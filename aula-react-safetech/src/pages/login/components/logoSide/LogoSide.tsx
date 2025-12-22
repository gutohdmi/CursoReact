import { useRef } from 'react';

export function LogoSide() {
    const logo1Ref = useRef<HTMLImageElement>(null);
    const logo2Ref = useRef<HTMLImageElement>(null);
    const logo3Ref = useRef<HTMLImageElement>(null);

    return (
        <div style={{ display: 'flex', flexGrow: 1, maxWidth: '50%', justifyContent: 'center', alignItems: 'center',flexDirection:'column' }}>
            <img
                ref={logo1Ref}
                onClick={() => {
                    logo3Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                src="../../../../../src/assets/fruitgearaero.png"
                alt="Logo da SafeTech"
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
            <img
                ref ={logo2Ref}
                src="../../../../../src/assets/fruitgearaero.png"
                alt="Logo da SafeTech"
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
            <img
                ref ={logo3Ref}
                onClick={() => {
                    logo1Ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                src="../../../../../src/assets/fruitgearaero.png"
                alt="Logo da SafeTech"
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </div>
    );
}   