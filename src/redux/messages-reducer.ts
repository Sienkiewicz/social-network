import { InferActionTypes } from './redux-store'

let initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How is your learning?' },
    { id: 3, message: 'Good' },
  ] as MessageType[],
  newMessageText: '' as null | string,
  dialogs: [
    { id: 1, name: 'Piotr', imgUrl: 'https://freesvg.org/img/Male-Avatar.png' },
    {
      id: 2,
      name: 'Rusia',
      imgUrl:
        'https://images.cdn1.stockunlimited.net/preview1300/fashionable-woman-avatar_1534607.jpg',
    },
    {
      id: 3,
      name: 'Dara',
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSJ5WrW4Y1UCdF-80yfH3W69bDnkPJKDt_W35fb9QAfZUSLSzaK&usqp=CAU',
    },
    {
      id: 4,
      name: 'Masha',
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT43qs2HeDTQjwBCuZNzn26Pvbuvkt-Gb1NztPNk5Ep8A9WJNJz&usqp=CAU',
    },
    {
      id: 5,
      name: 'Ania',
      imgUrl:
        'https://image.shutterstock.com/z/stock-vector-flat-cartoon-vector-icon-illustration-of-kawaii-redheaded-girl-with-fox-ears-and-tail-portrait-396862483.jpg',
    },
    {
      id: 6,
      name: 'Wita',
      imgUrl:
        'https://thumbs.dreamstime.com/z/pretty-young-brunette-latina-mexican-woman-smiling-face-expression-avatar-105320579.jpg',
    },
    {
      id: 7,
      name: 'Artem',
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS6O5kMcloxGsa4B_cqDg6Br3BIe6O9Pi-F6CP52TgA4NnkgIa6&usqp=CAU',
    },
    {
      id: 8,
      name: 'Dania',
      imgUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT45eX9sO7ppOLL4Rt7G3q8TcjJA33I9jeAMLFhnelPBl8SeAQ8&usqp=CAU',
    },
  ] as DialogType[],
}

const messagesReducer = (
  state: InitialStateMessagesType = initialState,
  action: ActionTypes
): InitialStateMessagesType => {
  switch (action.type) {
    case 'SN/MESS/ADD_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: 4,
            message: action.textOfNewMessage,
          },
        ],
      }
    default:
      return state
  }
}

export const actions = {
  addMessageActionCreator: (textOfNewMessage: string) =>
    ({ type: 'SN/MESS/ADD_MESSAGE', textOfNewMessage } as const),
}

export default messagesReducer

export type InitialStateMessagesType = typeof initialState
type ActionTypes = InferActionTypes<typeof actions>
type MessageType = { id: number; message: string }
type DialogType = { id: number; name: string; imgUrl: string }
