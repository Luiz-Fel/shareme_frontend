export const fetchUser =  () => {
  const userInfo = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    
  return userInfo;
};

/*
    aud -> user id
    azp -> client id
    exp -> expiration time
    iat -> issued at
    iss -> issuer
    sub -> subject
*/