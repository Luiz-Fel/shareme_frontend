import Cookies from "universal-cookie";

export const fetchUser =  () => {
  const cookies = new Cookies();
  const userInfo = cookies.get('user') !== undefined ? cookies.get('user') : cookies.remove('user');
    
  return userInfo;
};

/*
    sub -> user id
    azp -> client id
    exp -> expiration time
    iat -> issued at
    iss -> issuer
    sub -> subject
*/