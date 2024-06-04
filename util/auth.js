import axios from "axios";
const API_KEY = " AIzaSyCvEdkZgwI6e3bIZTL6cI3il5Yz3e9oGpw";

async function authenticate(mode, email, password) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const respones = await axios.post(URL, {
    email: email,
    password: password,
    retureSecureToken: true,
  });
  console.log(respones.data);
  const token = respones.data.idToken;
  return token;
}
export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
// /////////////////////////////////////////////////////////////

