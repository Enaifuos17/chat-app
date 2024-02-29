let myForm = document.getElementById("form-id");
let emailInput = document.getElementById("email-id");
let passwordInput = document.getElementById("password-id");

let msgP = document.getElementById("msg-p");
let goodP = document.getElementById("good-p");

async function handleSubmit(e) {
  e.preventDefault();
  const userData = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  //
  console.log("before");
  //
  try {
    const response = await fetch("http://localhost:3000/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    console.log(response);
    console.log(response.ok);
    console.log(userData);
    if (response.ok) {
      console.log("GOOD");
      goodP.innerText = "You are successfully Updated your password!";
      //   window.location.href = "./chat.html";
    } else {
      console.log("fi 7alat response not ok");
      goodP.innerText = "The email is incorrect!";
    }
  } catch {
    console.log("something wrong!!");
  }
}

myForm.addEventListener("submit", handleSubmit);
