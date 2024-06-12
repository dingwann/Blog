import React, { useEffect, useState } from 'react';
import Bytemd from '../components/Bytemd';// 引入组件
import http from './Axiosconfig' // 引入请求接口


const ArticleDetail = (props) => {
    // 单独存取markdown值，因为我们不仅有新增还有编辑文章的场景
    const { value, setValue } = props
    // useEffect(() => {
    //     getDetail();
    // }, []);
    // // 获取数据
    // const getDetail = async () => {
    //     const res = await getArticleDetail({ id: query.id });
    //     if (res.code === 200) {
    //         setValue(res.data.content);// 赋值
    //     }
    // };
    return (
        <Bytemd value={value || ''} setValue={setValue} />
    )
}
export default ArticleDetail