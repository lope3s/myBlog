import React from "react";
import { InputBox, Input, IconBox } from "./style";

interface IStyledIputBox{
    width: string
    inputPlaceholder: string
    value: string;
    secureTextEntry?: boolean
    returnKeyType?: any
    onChange: (value: any) => any
    onBlur?: (value: any) => any
    onFocus?: (value: any) => any
    refs?: (value: any) => any
    onSubmitEditing?: (value: any) => any
    blurOnSubmit?: boolean
}

const StyledInputBox: React.FC<IStyledIputBox> = ({returnKeyType, width, inputPlaceholder, onChange, onBlur, onFocus, refs, onSubmitEditing, blurOnSubmit, value, children, secureTextEntry = false}) => {
    return (
        <InputBox width = {width} >
            <IconBox>
                {children}
            </IconBox>
            <Input
                returnKeyType={returnKeyType}
                placeholderTextColor = "#fff"
                placeholder = {inputPlaceholder}
                onChangeText={onChange}
                value={value}
                onBlur = {onBlur}
                secureTextEntry = {secureTextEntry}
                onFocus = {onFocus}
                blurOnSubmit={ blurOnSubmit }
                onSubmitEditing={onSubmitEditing}
                ref={(input) => {
                    if (refs && input){
                        refs(input)
                    }
                }}
            />
        </InputBox>
    )
}

export default StyledInputBox