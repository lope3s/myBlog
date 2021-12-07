import React, { useState } from 'react'

const useNextInput = () => {
    const [ inputs, setInputs ] = useState<any>([])

    const addInput = (input: any) => {
        if (!inputs.includes(input)){
            setInputs([...inputs, input])
        }

        return
    }

    const focusNextField = (id: number) => {
        if(inputs.length){
            inputs[id].focus()
        }
        return
    }

    return {
        inputs,
        focusNextField,
        addInput
    }
}

export default useNextInput