import React from "react"
import { InputBox, Input, IconBox } from "./style"

interface IStyledIputBox{
    width: string
    inputPlaceholder: string
}

const StyledInputBox: React.FC<IStyledIputBox> = ({width, inputPlaceholder,  children}) => {
    return (
        <InputBox width = {width} >
            <IconBox>
                {children}
            </IconBox>
            <Input
                placeholderTextColor = "#fff"
                placeholder = {inputPlaceholder}
            />
        </InputBox>
    )
}

export default StyledInputBox