import React from 'react';
import { Input } from 'antd';

// const onChange = (e) => {
//     console.log(e.target.value);
// };

// Inputs 组件
const Inputs = (props) => (
    <>
        <Input size={props.size} value={props.value} placeholder={props.text} allowClear onChange={props.onChange} />
    </>
);
export default Inputs