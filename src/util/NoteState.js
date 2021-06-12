import { useReducer } from "react";
import { EditorState } from 'draft-js'
import { nanoid } from 'nanoid'

const noteReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENT_NOTE':
            return {
                ...state,
                newNoteFocus: true,
                noteUnderEdit: action.payload
            }
        case 'CREATE_NOTE':
            return {
                ...state,
                newNoteFocus: true,
                noteUnderEdit: action.payload.newNote_id,
                data: [
                    ...state.data,
                    action.payload.newNote
                ]
            }
        case 'UPDATE_CURRENT_NOTE_STATE':
            return {
                ...state,
                newNoteFocus: false,
                data: state.data.map(note => {
                    if(note._id === state.noteUnderEdit) {
                        return {
                            ...note,
                            editorState: action.payload
                        }
                    }
                    return note
                })
            }
    }
}

export const useNoteState = (state, action) => {
    let init_id = nanoid()
    const [noteList, dispatchNoteList] = useReducer( noteReducer, {
        noteUnderEdit: init_id,
        newNoteFocus: true,
        data: [
            {
                _id: init_id,
                editorState: EditorState.createEmpty()
            }
        ]
    })

    const handelEditorChange = (stateToUpdate) => {
        dispatchNoteList({
            type: 'UPDATE_CURRENT_NOTE_STATE',
            payload: stateToUpdate
        })
    }


    const getCurrentEditorState = () => {
        let noteState = noteList.data.filter(note => note._id === noteList.noteUnderEdit)[0].editorState
        let selectState = noteState.getSelection()
        return EditorState.forceSelection(
            noteState,
            selectState
        )
    }

    const handelCreateNote = () => {
        if (noteList.data.length > 20) return
        let newNote_id = nanoid()
        dispatchNoteList({
            type: 'CREATE_NOTE',
            payload: {
                newNote: {
                    _id: newNote_id,
                    editorState: EditorState.moveFocusToEnd(
                         EditorState.createEmpty()
                    )
                },
                newNote_id: newNote_id
            }
        })
    }

    const handelChangeCurrentNote = note_id => {
        dispatchNoteList({
            type: 'CHANGE_CURRENT_NOTE',
            payload: note_id
        })
    }

    const isCurrentNote = unsureNote_id => {
        if (unsureNote_id === noteList.noteUnderEdit) return true
        return false
    }

    const isNoteFocus = () => {
        return noteList.newNoteFocus
    }

    const noteActions = {
        createNote: handelCreateNote,
        changeCurrentNote: handelChangeCurrentNote,
        isCurrentNote,
        isNoteFocus
    }

    return [getCurrentEditorState() , handelEditorChange, noteList.data, noteActions]
}