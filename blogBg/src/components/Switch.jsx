import React from 'react';
import { Switch } from 'antd';

const onChange = (checked) => {
    console.log(`switch to ${checked}`);
};

const Switchs = (props) => {

    // console.log(props.artShow);

    return (
        <>
            <Switch defaultChecked={props.artShow} onClick={props.Changeshow} onChange={props.Switch} />
        </>
    )
};
export default Switchs