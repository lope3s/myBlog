import React from "react"
import { InputBox, Input, IconBox } from "./style"

interface IStyledIputBox{
    width: string
    inputPlaceholder: string
    onChange: (value: any) => any
    onBlur?: (value: any) => any
    value: string;
    secureTextEntry?: boolean
}

const StyledInputBox: React.FC<IStyledIputBox> = ({width, inputPlaceholder, onChange, onBlur, value, children, secureTextEntry = false}) => {
    return (
        <InputBox width = {width} >
            <IconBox>
                {children}
            </IconBox>
            <Input

                placeholderTextColor = "#fff"
                placeholder = {inputPlaceholder}
                onChangeText={onChange}
                value={value}
                onBlur = {onBlur}
                secureTextEntry = {secureTextEntry}
            />
        </InputBox>
    )
}

export default StyledInputBox