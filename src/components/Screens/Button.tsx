import React from 'react';
import "./Button.css";

const STYLES = [
    "btn--primary",
    "btn--outline"
]

const SIZES = [
    "btn--medium",
    "btn--large"
]



export const Button = ({
    buttonStyle,
    buttonSize,
    props
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return(
        <a className={`btn ${checkButtonStyle} ${checkButtonSize}`} href={props[1]} onClick={eval(props[2])} >
            {props[0]}
        </a>
    )
}