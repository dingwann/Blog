import PythonLogo from './svg/PythonLogo'
import ReactLogo from './svg/ReactLogo'
import JsLogo from './svg/JsLogo'
import TsLogo from './svg/TsLogo'

export default function Pres2(props) {



    return (
        <>
            <div style={{ ...props.style }} className={`${props.className} flex w-full flex-wrap items-center space-x-2 text-[24px]  md:text-[32px] font-semibold text-inherit`}>
                <p className='text-nowrap'>喜欢</p>
                <span><PythonLogo /></span>
                <p className='text-[#818cf8]'>Python</p>
                <span><ReactLogo /></span>
                <p className='text-[#60a5fa]'>React</p>
                <p>和</p>
                <span><TsLogo /></span>
                <p className='text-[#818cf8]'>TypeScript</p>
            </div>
        </>
    )
};