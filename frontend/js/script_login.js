let myForm = document.getElementById("form-id");
let usernameInput = document.getElementById("username-id");
let passwordInput = document.getElementById("password-id");
let dontHaveAccP = document.getElementById("first-p");
let wrongP = document.getElementById("msg-p");
let goodLogInP = document.getElementById("return-p");

const myApi = "http://localhost:3000/api";

async function getData() {
  const data = await fetch(myApi);
  const res = await data.json();
  if (res) {
    return res;
  } else {
    return "error while reading the file";
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const userData = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(response);
    console.log(response.ok);
    if (response.ok) {
      goodLogInP.classList.remove("hidden");
      wrongP.classList.add("hidden");
      console.log("user found!");
      //   window.location.href = "./chat.html";
    } else {
      goodLogInP.classList.add("hidden");
      wrongP.classList.remove("hidden");
      console.log("user not found");
    }
  } catch {
    console.log("something wrong!!");
  }
}

myForm.addEventListener("submit", handleSubmit);
