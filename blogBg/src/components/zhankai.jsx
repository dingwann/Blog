export default function Zhankai(props) {


    return (
        <>
            {props.menu ?
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m7.4 15.375l-1.4-1.4l6-6l6 6l-1.4 1.4l-4.6-4.6z" />
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 15.375l-6-6l1.4-1.4l4.6 4.6l4.6-4.6l1.4 1.4z" />
                </svg>}
        </>
    )
};
