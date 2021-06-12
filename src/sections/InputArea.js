import styled from "styled-components";

import { InputAreaEditor } from '../components/InputAreaEditor'

const StyledInputArea = styled.div`
    background-color: none;
    flex: 1;
    display: flex;
    flex-direction: column;
`

export const InputArea = ({ editorState, setEditorState }) => {
    return (
        <StyledInputArea>
            <InputAreaHeader />
            <InputAreaEditor editorState={editorState} setEditorState={setEditorState} />
        </StyledInputArea>
    )
}

const StyledInputAreaHeader = styled.div`
    background-color: #324A5F;
    color: white;
    padding: 5px;
`

const InputAreaHeader = () => {
    return (
        <StyledInputAreaHeader>
            Editor Area
        </StyledInputAreaHeader>
    )
}