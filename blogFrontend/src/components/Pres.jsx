import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '../assets/css/TypingEffect.scss';

export default function Pres(props) {

    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['欢迎来到我的博客。',
                '在这里记录我的成长 , 努力成为更好的自己 。',
                '想当一名优秀的全栈开发者。',
                '困时切莫间断 , 熬过此关 , 便可少进 。',
                '再进再困 , 再熬再奋 , 自有亨通精进之日 。',
            ],
            typeSpeed: 100,
            backSpeed: 35,
            smartBackspace: true,
            loop: true,
            shuffle: true,
            backDelay: 600,
            // cursorChar: '_'
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, [])

    return (
        <>
            <span ref={el}></span>
        </>
    );
};