/* const options = {
  error: "Countrie not found",
  icon: "far fa-flag error-icon",
};
 */
export default function createErrorMessage(options) {
  const errorMessage = document.createElement("p");
  const messageIcon = document.createElement("p");
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message-container");
  messageIcon.classList = [options.icon];
  errorMessage.classList.add("error-message");
  errorMessage.textContent = options.error;
  messageContainer.appendChild(messageIcon);
  messageContainer.appendChild(errorMessage);

  return messageContainer;
}
