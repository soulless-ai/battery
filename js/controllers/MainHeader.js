import { MAIN_HEADER_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

export class MainHeader {
    constructor(label, buttons) {
        this.label = label;
        this.buttons = buttons;
    }

    async onStart() {
        const newItem = document.createElement("section");
        newItem.classList.add("main-header-container");
        newItem.innerHTML = `
                <h1>${this.label}</h1>
                <div>${this.buttons}</div>
        `;
        clearContainers([
            MAIN_HEADER_CONTAINER
        ]);
        MAIN_HEADER_CONTAINER.appendChild(newItem);
    }
}