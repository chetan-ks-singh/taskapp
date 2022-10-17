import axios from "axios";

export const signup = async (name, email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/user",
      data: {
        name,
        email,
        password,
      },
    });
    if (res.data.status == "ok") {
      document.querySelector(".signup-err").textContent =
        "you have sucessfully created account";
      document.querySelector(".signup-err").style.color = "green";
      document.querySelector(".signup-err").classList.add("signup-err-state");
    }
    if (res.data.status == "fail") {
      document.querySelector(".signup-err").textContent = "User already exist";
      document.querySelector(".signup-err").style.color = "#fa5252";
      document.querySelector(".signup-err").classList.add("signup-err-state");
    }
  } catch (err) {
    //console.log('error--',err)
  }
};

export const login = async function (email, password) {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/user/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status == "fail") {
      document.querySelector(".login-err").classList.add("login-err-state");
    }
    if (res.data.status == "ok") {
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 500);
    }
  } catch (err) {
    //console.log('error---',err);
  }
};

export const logout = async () => {
  try {
    console.log("loggg");
    const res = await axios({
      method: "GET",
      url: "/api/v1/user/logout",
    });

    if (res.data.status == "ok") {
      window.setTimeout(() => {
        location.assign("/auth/login");
      }, 500);
    }
  } catch (err) {
    //console.log(err)
  }
};

export const switchDark = async (checked) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "/api/v1/user/updateMe",
      data: {
        checked,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
