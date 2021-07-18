import { useReducer } from 'react';
import { nanoid } from 'nanoid';

const noteReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_NOTE':
      return {
        ...state,
        isNewNote: true,
        noteUnderEdit: action.payload,
      };
    case 'CREATE_NOTE':
      return {
        ...state,
        isNewNote: true,
        noteUnderEdit: action.payload.newNote_id,
        data: [...state.data, action.payload.newNote],
      };
    case 'UPDATE_CURRENT_NOTE_STATE':
      return {
        ...state,
        isNewNote: false,
        data: state.data.map((note) => {
          if (note._id === state.noteUnderEdit) {
            return {
              ...note,
              ...action.payload,
            };
          }
          return note;
        }),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        data: state.data.filter((note) => note._id !== action.payload),
      };
    default:
      return null;
  }
};

export const useNoteState = (state, action) => {
  let init_id = nanoid();
  const [noteList, dispatchNoteList] = useReducer(noteReducer, {
    noteUnderEdit: init_id,
    isNewNote: true,
    data: [
      {
        _id: init_id,
        editorState: [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
        selection: null,
      },
    ],
  });

  const handelEditorChange = (stateToUpdate) => {
    dispatchNoteList({
      type: 'UPDATE_CURRENT_NOTE_STATE',
      payload: stateToUpdate,
    });
  };

  const getCurrentEditorState = () => {
    let noteState = noteList.data.filter(
      (note) => note._id === noteList.noteUnderEdit
    )[0];

    return {
      isNewNote: noteList.isNewNote,
      ...noteState,
    };
  };

  const handelCreateNote = () => {
    if (noteList.data.length > 20) return;
    let newNote_id = nanoid();
    dispatchNoteList({
      type: 'CREATE_NOTE',
      payload: {
        newNote: {
          _id: newNote_id,
          editorState: [
            {
              type: 'paragraph',
              children: [{ text: '' }],
            },
          ],
          selection: {
            anchor: {
              path: [0, 0],
              offset: 0,
            },
            focus: {
              path: [0, 0],
              offset: 0,
            },
          },
        },
        newNote_id: newNote_id,
      },
    });
  };

  const handelChangeCurrentNote = (note_id) => {
    dispatchNoteList({
      type: 'CHANGE_CURRENT_NOTE',
      payload: note_id,
    });
  };

  const handelDeleteNote = (note_id) => {
    if (noteList.data.length === 1) return;
    if (note_id === noteList.noteUnderEdit) {
      handelChangeCurrentNote(noteList.data[0]._id);
    }
    dispatchNoteList({
      type: 'DELETE_NOTE',
      payload: note_id,
    });
  };

  const isCurrentNote = (unsureNote_id) => {
    if (unsureNote_id === noteList.noteUnderEdit) return true;
    return false;
  };

  const noteActions = {
    createNote: handelCreateNote,
    changeCurrentNote: handelChangeCurrentNote,
    deleteNote: handelDeleteNote,
    isCurrentNote,
  };

  return [
    getCurrentEditorState(),
    handelEditorChange,
    noteList.data,
    noteActions,
  ];
};
