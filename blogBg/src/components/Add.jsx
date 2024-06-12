import React, { useState, useEffect } from 'react';
import Inputs from "./Input";
import Selects from "./Select";
import Switchs from "./Switch";
import ArticleDetail from "./articleDetail";
import http from './Axiosconfig'; // 引入请求接口
import { ToastContainer, toast } from 'react-toastify';

export default function Add(props) {
    //文章标题
    const [artTitle, setArtTitle] = useState('');
    //文章描述
    const [artDesc, setArtDesc] = useState('');
    //文章标签
    const [artTag, setArtTag] = useState();
    //文章内容
    const [artContent, setArtContent] = useState('');
    //文章作者
    const [artAuthor, setArtAuthor] = useState('');
    //文章是否公开
    const [artPublic, setArtPublic] = useState(true);

    // 点击加载状态
    const [loading, setLoading] = useState(false);

    const [shuaxin, setShuaxin] = useState(false);

    function Switch(checked) {
        checked = !checked;
    }

    async function SubmitArt() {
        setLoading(true);
        try {
            // 发送请求
            const res = await http.post('/api/articles', {
                title: artTitle,
                desc: artDesc,
                tag: artTag,
                content: artContent,
                auth: artAuthor,
                public: artPublic
            });
            // 返回结果
            console.log(res);
            if (res.data.code === 1) {
                // 清空
                Switch(artPublic)
                setArtTitle('');
                setArtTag();
                setArtDesc('');
                setArtContent('');
                setArtAuthor('');
                setShuaxin(!shuaxin); // 触发重新渲染
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    function Changeshow() {
        setArtPublic(!artPublic);
    }

    return (
        <>
            <div className="p-2 w-full h-auto border-l-2 border-solid rounded-md">
                <div className="p-2 w-full">
                    <h2>新增文章</h2>
                    <hr className="my-2" />
                    <div className="my-2">
                        <span className="text-inherit font-medium space-y-2">
                            <span className="text-lg">标题</span>
                            <Inputs value={artTitle} onChange={(e) => setArtTitle(e.target.value)} size='large' text="文章标题" />
                        </span>
                    </div>

                    <div className="my-2">
                        <span className="text-inherit font-medium space-y-2">
                            <span className="text-lg">文章描述</span>
                            <Inputs value={artDesc} onChange={(e) => setArtDesc(e.target.value)} size='large' text="文章描述" />
                        </span>
                    </div>

                    <div className="my-2">
                        <span className="text-inherit font-medium space-y-2">
                            <span className="text-lg">标签</span>
                            <Selects setArtTag={setArtTag} size='large' />
                        </span>
                    </div>

                    <div className="my-2">
                        <span className="text-inherit font-medium space-y-2">
                            <span className="text-lg">作者</span>
                            <Inputs value={artAuthor} onChange={(e) => setArtAuthor(e.target.value)} size='large' text="Author" />
                        </span>
                    </div>

                    <div className="my-2">
                        <span className="text-inherit font-medium space-y-2">
                            <span className="text-lg">公开文章</span>
                            <br />
                            <Switchs value={artPublic} artShow={artPublic} Switch={Switch} Changeshow={Changeshow} />
                        </span>
                    </div>

                    <div className="my-2 mt-4">
                        <span className="text-inherit font-medium space-y-2">
                            <span className="text-lg">文章内容</span>
                            <br />
                            {/* bytemd */}
                            <div className="">
                                <ArticleDetail
                                    key={shuaxin} // 使用 key 强制重新渲染
                                    value={artContent}
                                    setValue={setArtContent}
                                />
                            </div>
                        </span>
                    </div>

                    <div className="mb-2 mt-8">
                        <span className="text-inherit font-medium space-y-2">
                            <button onClick={SubmitArt} disabled={loading} className="btn w-[160px] bg-[#1677FF] hover:bg-[#1688FF] text-white">
                                {loading ? '发布中...' : '发布'}
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
