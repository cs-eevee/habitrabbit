export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

export function loginUser(username, password) {
  return function(dispatch) {
    const data = {
      username,
      password,
    };
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(user => {
        console.log(user);
        return dispatch({
          type: LOGIN_USER,
          payload: { username: user.username, userId: user._id },
        });
      })
      .catch(err => {
        console.log(err);
        alert('🐰 did not find user with that password');
      });
  };
}
