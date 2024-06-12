import React from 'react';
import { Editor } from '@bytemd/react';
import zhHans from 'bytemd/lib/locales/zh_Hans.json';// 中文插件
import gfm from '@bytemd/plugin-gfm';// 支持GFM
import highlight from '@bytemd/plugin-highlight';// 代码高亮
import '../assets/css/highlight.scss'  // 高亮主题
import frontmatter from '@bytemd/plugin-frontmatter';// 解析前题
import mediumZoom from '@bytemd/plugin-medium-zoom';// 缩放图片
import gemoji from '@bytemd/plugin-gemoji';// 支持Gemoji
import '../assets/css/index.css'
// import 'bytemd/dist/index.css' // bytemd基础样式
import 'juejin-markdown-themes/dist/juejin.css';// 掘金同款样式
import math from '@bytemd/plugin-math';
import breaks from '@bytemd/plugin-breaks';
import http, { baseURL } from './Axiosconfig' // 引入请求接口

const plugins = [
    gfm(), // GFM
    highlight(), // 代码高亮
    frontmatter(), // 解析前题
    mediumZoom(), // 图片缩放
    gemoji(), // Gemoji短代码
    math(), // 数学公式
    breaks(), // 中断
]


export default function Bytemd(props) {

    return (
        <>
            <div className=''>
                <Editor
                    locale={zhHans}
                    plugins={plugins}
                    value={props.value}
                    onChange={(v) => props.setValue(v)}
                    uploadImages={async (file) => {
                        let imgUrl = '';
                        let fromData = new FormData();
                        fromData.append('file', file[0]);
                        const res = await http.post('/api/upload', fromData)
                        if (res && res.data.code === 1) {
                            console.log(res.data)
                            imgUrl = res.data.data;// 这里是上传成功后，服务端返回的图片地址
                        } else {
                            notification.error({
                                message: '图片上传失败',
                            });
                        }
                        return [
                            {
                                title: file.map((i) => i.name),
                                url: baseURL + imgUrl,
                            },
                        ];
                    }}
                />
            </div>
        </>
    )
}