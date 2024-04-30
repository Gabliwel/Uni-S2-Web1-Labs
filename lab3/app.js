import { Toast } from "./toast.js"

const buttons = Array.from(document.getElementsByClassName("toast-button"))
const input = document.getElementById("toast-text")

buttons.forEach((b) => {
    b.addEventListener("click", (event) => {
        if (input.value.length !== 0) {
            const toast = new Toast(
                event.target.dataset.type,
                input.value,
                document.getElementById("toast-container")
            )
            toast.toast()
        }
    })
})
