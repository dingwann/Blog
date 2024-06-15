import { Button } from '@nextui-org/react'
import Pres from './Pres'
import Pres2 from './Pres2'
import Icon from './Icon'
import { Link } from 'react-router-dom'

export default function GridOne(props) {

    return (
        <div className="mx-[20px] lg:col-span-5 flex flex-col justify-between space-y-2 gap-4">

            <div className='animate-fade-up easeinout' style={{ animationDelay: '200ms' }}>
                <div className='flex'>
                    <p className='font-bold text-inherit text-6xl'>Hi!</p>
                    <span className='mx-2 text-5xl'>👋</span>
                </div>
            </div>

            <div className='animate-fade-up easeinout' style={{ animationDelay: '400ms' }}>
                <p className='font-bold text-inherit text-5xl md:text-6xl whitespace-nowrap shrink'>
                    I'm <span className='text-[#818cf8]'>DingWan</span>
                </p>
            </div>

            <div style={{ animationDelay: '600ms' }} className='easeinout animate-fade-up text-wrap font-semibold text-inherit text-[28px] md:text-[33px]'>
                <Pres></Pres>
            </div>

            <Pres2 style={{ animationDelay: '800ms' }} className="easeinout animate-fade-up"></Pres2>

            <div style={{ animationDelay: '1000ms' }} className='easeinout animate-fade-up space-x-3'>
                <Button color='primary' variant="ghost" className='border-inherit font-semibold text-inherit'><Link to={'blog'}>我的博客</Link></Button>
                <Button color='primary' variant="ghost" className='border-inherit font-semibold text-inherit'><Link to={"about"}>关于我</Link></Button>
            </div>

            <Icon style={{ animationDelay: '1200ms' }} className="easeinout animate-fade-up"></Icon>
        </div>
    )
};
