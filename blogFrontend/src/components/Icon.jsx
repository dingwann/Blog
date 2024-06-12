import MdiGithub from "./svg/MdiGithub"
import RiBilibiliFill from "./svg/Bilibili"
import Email from "./svg/Email"
import Juejin from "./svg/Juejinlogo"

export default function Icon(props) {

    return (
        <>
            <div style={{ ...props.style }} className={`${props.className} flex space-x-4`}>
                <a className="iconsize" href="http://github.com/dingwann" target="_blank" rel="author github">
                    <MdiGithub className='iconComponent'>
                    </MdiGithub>
                </a>
                <a className="iconsize" href="https://space.bilibili.com/87104532" target="_blank" rel="author bilibili">
                    <RiBilibiliFill className='iconComponent'>
                    </RiBilibiliFill>
                </a>
                <a className="iconsize" href="/" rel="author juejin">
                    <Juejin className='iconComponent'>
                    </Juejin>
                </a>
                <a className="iconsize" href="mailto:catchskatecc@gmail.com" rel="contact author">
                    <Email className='iconComponent'>
                    </Email>
                </a>
            </div>
        </>
    )
};