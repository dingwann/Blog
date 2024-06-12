export default function Home(props) {


    return (
        <>
            <div className="m-2 w-full h-full p-2 border-2 rounded-lg">
                <div className="p-2 space-y-4">
                    <h2>统计</h2>
                    <hr className="my-2 mb-6" />
                    <div className="flex justify-between">
                        <div className="stats shadow">

                            <div className="stat">
                                <div className="stat-title">Total Page Views</div>
                                <div className="stat-value">89,400</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>

                        </div>

                        <div className="stats shadow">

                            <div className="stat">
                                <div className="stat-title">Total User Views</div>
                                <div className="stat-value">89,400</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>

                        </div>

                        <div className="stats shadow">

                            <div className="stat">
                                <div className="stat-figure text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </div>
                                <div className="stat-title">Total Likes</div>
                                <div className="stat-value text-primary">25.6K</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>

                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                </div>
                                <div className="stat-title">Page Views</div>
                                <div className="stat-value text-secondary">2.6M</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>

                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <div className="avatar online">
                                        <div className="w-16 rounded-full">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                </div>
                                <div className="stat-value">86%</div>
                                <div className="stat-title">Tasks done</div>
                                <div className="stat-desc text-secondary">31 tasks remaining</div>
                            </div>

                        </div>


                        {/* <div className="border-2 rounded-lg p-3 my-2 mr-6">
                            <span className="text-lg font-medium text-inherit">
                                文章总数
                            </span>
                            <p className="mt-2 pl-20 text-3xl font-bold">121</p>
                        </div>

                        <div className="border-2 rounded-lg p-3 my-2 mr-6">
                            <span className="text-lg font-medium text-inherit">
                                PV
                            </span>
                            <p className="mt-2 pl-10 text-3xl font-bold">1299</p>
                        </div>

                        <div className="border-2 rounded-lg p-3 my-2 mr-6">
                            <span className="text-lg font-medium text-inherit">
                                UV
                            </span>
                            <p className="mt-2 pl-10 text-3xl font-bold">12</p>
                        </div>

                        <div className="border-2 rounded-lg p-3 my-2 mr-6">
                            <span className="text-lg font-medium text-inherit">
                                留言数
                            </span>
                            <p className="mt-2 pl-16 text-3xl font-bold">12</p>
                        </div> */}
                    </div>

                    {/* 第二行 */}
                    <div className="flex gap-14">
                        <div className="stats shadow">

                            <div className="stat">
                                <div className="stat-title">Total Messages</div>
                                <div className="stat-value">400</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>

                        </div>

                        <div className="stats shadow">

                            <div className="stat">
                                <div className="stat-title">Total Friends</div>
                                <div className="stat-value">5</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
