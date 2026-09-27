document.addEventListener("DOMContentLoaded", function () {

    const toggleButton = document.getElementById("chatbot-toggle");
    const closeButton = document.getElementById("chatbot-close");

    const chatbotWindow = document.getElementById("chatbot-window");

    const input = document.getElementById("chatbot-input");
    const sendButton = document.getElementById("chatbot-send");

    const messages = document.getElementById("chatbot-messages");


    // Open chatbot
    toggleButton.addEventListener("click", function () {

        chatbotWindow.style.display = "flex";

        input.focus();
    });


    // Close chatbot
    closeButton.addEventListener("click", function () {

        chatbotWindow.style.display = "none";
    });


    // Add message
    function addMessage(message, type) {

        const messageDiv = document.createElement("div");

        messageDiv.classList.add(
            type === "user"
                ? "user-message"
                : "bot-message"
        );

        messageDiv.textContent = message;

        messages.appendChild(messageDiv);

        messages.scrollTop = messages.scrollHeight;
    }


    // Send message
    async function sendMessage() {

        const message = input.value.trim();

        if (!message) {
            return;
        }


        // Show user message
        addMessage(message, "user");

        input.value = "";

        sendButton.disabled = true;


        try {

            const response = await fetch("/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });


            const data = await response.json();


            if (data.success) {

                addMessage(
                    data.answer,
                    "bot"
                );

            } else {

                addMessage(
                    "Sorry, something went wrong.",
                    "bot"
                );
            }


        } catch (error) {

            console.error("Chatbot error:", error);

            addMessage(
                "Unable to connect to the chatbot.",
                "bot"
            );

        } finally {

            sendButton.disabled = false;

            input.focus();
        }
    }


    // Send button
    sendButton.addEventListener(
        "click",
        sendMessage
    );


    // Enter key
    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                sendMessage();
            }

        }
    );

});