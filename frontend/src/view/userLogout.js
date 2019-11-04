const UserLogout = () => {
  const logout = () => {
    console.log("loggout");

    sessionStorage.clear();

    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    window.location.href = "/";
  };

  logout();
};

export default UserLogout;
