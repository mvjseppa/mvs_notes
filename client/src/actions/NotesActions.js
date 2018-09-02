import axios from 'axios';

export const GET_NOTES = 'GET_NOTES';
export const DELETE_NOTE = 'DELETE_NOTE';
export const CREATE_NOTE = 'CREATE_NOTE';

const apiUrl = 'https://tnwssdh396.execute-api.eu-central-1.amazonaws.com/dev/mvs-notes/';

export function getNotes(authToken) {
  console.log('get notes called: ', authToken);
  const request = axios.get(apiUrl, { headers: { Authorization: authToken } });

  return {
    type: GET_NOTES,
    payload: request,
  };
}

export function deleteNote(id, authToken) {
  const request = axios.delete(apiUrl + id, { headers: { Authorization: authToken } });

  return {
    type: DELETE_NOTE,
    payload: { id, request },
  };
}

export function createNote(data, authToken) {
  const request = axios({
    method: 'POST', url: apiUrl, headers: { Authorization: authToken }, data,
  });
  return {
    type: CREATE_NOTE,
    payload: request,
  };
}
