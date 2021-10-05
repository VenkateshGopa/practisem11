import classes from './Modal.module.css';
import React , {Fragment} from 'react';
import ReactDom from 'react-dom';
const Backdrop = props =>{
    return<div className={classes.backdrop} onClick={props.onClick}/>
};
const ModalOverlay = props =>{
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};
const Modal = props =>{
    return <Fragment>
        {ReactDom.createPortal(<Backdrop onClick={props.onclick} />,document.getElementById("overlay"))}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById("overlay"))}
    </Fragment>
};
export default Modal;