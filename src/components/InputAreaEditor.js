import styled from "styled-components";
import { Editor } from 'draft-js'
import { useRef } from "react";

const StyledInputAreaEdior = styled.div`
    padding: 40px;
    flex: 1;
    overflow-y: auto;
`

const StyledEditorWrapper = styled.div`
    cursor: text;
    height: 100%;
`

export const InputAreaEditor = ({ editorState, setEditorState }) => {
    const editorRef = useRef()
    
    return (
        <StyledInputAreaEdior>
            <StyledEditorWrapper>
                <Editor 
                    editorState={editorState} 
                    placeholder='Enter some text...'
                    onChange={setEditorState} 
                    ref={editorRef}
                />
            </StyledEditorWrapper>
        </StyledInputAreaEdior>
    )
}