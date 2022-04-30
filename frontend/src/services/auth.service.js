import axios from "axios";
const API_URL = "http://localhost:8000/user/";
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login/", {
        email,
        password
      })
      .then(response => {
        if (response.data.access) {
            console.log("HERE")
          localStorage.setItem("user", JSON.stringify(response.data));
          document.location.reload();
        }
        return response.data;
      });
  }
  logout() {
    console.log("LOGGED OUT")
    localStorage.removeItem("user");
    localStorage.removeItem("restaurant");
    localStorage.removeItem("step");
    document.location.reload();
  }
  register(avatar, email, password, first_name, last_name, phone_number) {
    return axios.post(API_URL + "register", {
      email,
      first_name,
      last_name,
      password,
      avatar,
      phone_number
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();