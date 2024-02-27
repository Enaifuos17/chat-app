let myForm = document.getElementById("form-id");
let usernameInput = document.getElementById("username-id");
let emailInput = document.getElementById("email-id");
let passwordInput = document.getElementById("password-id");
let alreadySPP = document.getElementById("msg-p");
let createdP = document.getElementById("return-p");

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
    email: emailInput.value,
    password: passwordInput.value,
  };

  try {
    const dataArray = await getData();
    const check = dataArray.find(
      (user) =>
        usernameInput.value.toLowerCase() === user.username ||
        emailInput.value === user.email
    );
    if (check) {
      alreadySPP.classList.remove("hidden");
      createdP.classList.add("hidden");
      console.log("YES ITS HERE");
    } else {
      alreadySPP.classList.add("hidden");
      createdP.classList.remove("hidden");
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log(userData);
        console.log("ADDED");
      } else {
        console.log("Something with the adding");
      }
    }
  } catch (err) {
    console.log(err.message);
  }
}

myForm.addEventListener("submit", handleSubmit);
