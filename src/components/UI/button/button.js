import React from 'react';
import Button from '@material-ui/core/Button';
import './button.css';

const button = (props) => <Button className="Button" onClick={props.onClickHandler} variant="outlined">{props.children}</Button>;

export default button;