const socket = io();
const usersOnline = document.getElementById("users");
const massageRight = document.getElementById("message-right");
const massageLeft = document.getElementById("message-left");
const chatConatiner = document.getElementById("container-chat");
const messageForm = document.getElementById("conversation-form");
const messageInput = document.getElementById("conversation-form-input");
const feedback = document.getElementById("feedback");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  sendMessage();
});

socket.on("users", (data) => {
  usersOnline.innerText = `${data} users online`;
});

function sendMessage() {
  if (messageInput.value === "") return;
  console.log(messageInput.value);
  const data = {
    message: messageInput.value,
    dateTime: new Date(),
  };
  socket.emit("message", data);
  addMessageToUI(true, data);
  messageInput.value = "";
}

socket.on("chat-message", (data) => {
  // console.log(data)
  addMessageToUI(false, data);
});

function addMessageToUI(isOwnMessage, data) {
  // clearFeedback()
  const element = `  <li class="${
    isOwnMessage ? "conversation-item me" : "conversation-item"
  }">
    <div class="conversation-item-side">
        <img class="conversation-item-image" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" alt="">
    </div>
    <div class="conversation-item-content">
        <div class="conversation-item-wrapper">
            <div class="conversation-item-box" >
                <div class="conversation-item-text">
                    <p class="message">${data.message}</p>
                    <div class="conversation-item-time">${moment(
                      data.dateTime
                    ).fromNow()}</div>
                </div>
                <div class="conversation-item-dropdown">
                    <button type="button" class="conversation-item-dropdown-toggle"><i class="ri-more-2-line"></i></button>
                    <ul class="conversation-item-dropdown-list">
                        <li><a href="#"><i class="ri-share-forward-line"></i> Forward</a></li>
                        <li><a href="#"><i class="ri-delete-bin-line"></i> Delete</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</li>
`;

  chatConatiner.innerHTML += element;
  scrollToButtom();
}

function scrollToButtom() {
  chatConatiner.scrollTo(0, chatConatiner.scrollHeight);
}

messageInput.addEventListener("focus", (e) => {
  socket.emit("feedback", {
    feedback: ` ...is typing a message`,
  });
});

messageInput.addEventListener("keypress", (e) => {
  socket.emit("feedback", {
    feedback: ` ...is typing a message`,
  });
});

messageInput.addEventListener("blur", (e) => {
  socket.emit("feedback", {
    feedback: "",
  });
});

socket.on("feedback", (data) => {
  clearFeedback();
  const element = ` 
    <li class="message-feedback">
        <p class="feedback" id="feedback">${data.feedback}</p>
    </li>`;
  chatConatiner.innerHTML += element;
});

function clearFeedback() {
  document.querySelectorAll("li.message-feedback").forEach((element) => {
    element.parentNode.removeChild(element);
  });
}
