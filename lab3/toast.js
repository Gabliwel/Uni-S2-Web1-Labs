export class Toast {
    constructor(type, text, container) {
        this.type = type
        this.text = text
        this.container = container
    }

    toast() {
        const toast = document.createElement("div")
        toast.className = `toast ${this.type}`
        toast.innerText = this.text

        this.container.appendChild(toast)

        const children = this.container.children

        const defaultOffset = 20
        let offset = defaultOffset

        for (let i = 0; i < children.length; i++) {
            children[i].style.top = `${offset}px`
            offset += children[i].offsetHeight + defaultOffset
        }

        setTimeout(() => {
            toast.remove();
            offset = defaultOffset;
            for (let i = 0; i < children.length; i++) {
                children[i].style.top = `${offset}px`
                offset += children[i].offsetHeight + defaultOffset
            }
        }, 4200)
    }
}
