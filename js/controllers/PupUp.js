import { MAIN_PUP_UP_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

export class PupUp {
    constructor(label, main) {
        this.label = label;
        this.main = main;
    }

    onStart() {
        const newItem = document.createElement("section");
        newItem.classList.add("pup-up");
        newItem.innerHTML = `
            <div class="pup-up-container">
                <div class="pup-up-header">
                    <h1>${this.label}</h1>
                    <button id="pupUpExit">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 18L6 6" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18 6L6 18" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                ${this.main}
            </div>
        `;
        this.close();
        this.onClickExit(newItem.querySelector("#pupUpExit"));
        MAIN_PUP_UP_CONTAINER.appendChild(newItem);
    }

    async close() {
        clearContainers([
            MAIN_PUP_UP_CONTAINER
        ]);
    }
    async onClickExit(button) {
        button.addEventListener("click", () => {
            this.close();
        })
    }
}