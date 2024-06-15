export default function FormatDate(props) {

    // 创建日期对象
    const date = new Date(props);

    // 格式化日期
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // 组合成所需的格式
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
};

// 计算星期几
export const weekDay = function (time) {
    let datelist = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return datelist[new Date(time).getDay()];
}


export function FormatDate2(props) {

    // 创建日期对象
    const date = new Date(props);

    // 格式化日期
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');


    // 组合成所需的格式
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDate;
};