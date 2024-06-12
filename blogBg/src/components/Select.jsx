import React from 'react';
import { Select } from 'antd';
const options = [
    { value: 'Node', label: 'Node' },
    { value: 'React', label: 'React' },
    { value: 'Vue', label: 'Vue' },
    { value: 'Java', label: 'Java' },
    { value: 'Js', label: 'Js' },
    { value: 'Python', label: 'Python' },
    { value: 'HTML', label: 'HTML' },
    { value: 'Linux', label: 'Linux' },];

const handleChange = (value) => {
    console.log(`selected ${value}`);
    console.log(typeof value);
};
const Selects = (props) => (
    <Select
        size={props.size}
        maxCount={4}
        allowClear={true}
        optionFilterProp="label"
        mode="tags"
        style={{
            width: '100%',
        }}
        placeholder="Tags"
        onChange={props.setArtTag}
        options={options}
    />
);
export default Selects