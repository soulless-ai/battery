import { MAIN_MAP_CONTAINER,
    MAIN_AUTH_CONTAINER,
    MAIN_GARAGE_CONTAINER,
    MAIN_AUTO_DETAILS_CONTAINER,
    MAIN_ADD_EVM_PRO_CONTAINER,
    MAIN_USERS_CONTROLLER_CONTAINER,
    MAIN_PERSONAL_OFFICE_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { MainHeader }from "./MainHeader.js";

export class Map {
    constructor(userData) {
        this.userData = userData;
    }

    async onStart() {
        new MainHeader(
            `Карта EVM PRO`,
            ``
        ).onStart();
        this.render();
    }
    async render() {
        const newItem = document.createElement("section");
        newItem.classList.add("map");
        newItem.innerHTML = `
            <iframe src="https://q.apocalyptic.world/testmap.html" width="100%" height="600" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            `;
        clearContainers([
            MAIN_AUTH_CONTAINER,
            MAIN_GARAGE_CONTAINER,
            MAIN_AUTO_DETAILS_CONTAINER,
            MAIN_ADD_EVM_PRO_CONTAINER,
            MAIN_USERS_CONTROLLER_CONTAINER,
            MAIN_MAP_CONTAINER,
            MAIN_PERSONAL_OFFICE_CONTAINER
        ]);
        MAIN_MAP_CONTAINER.style.paddingBottom = "13vh";
        MAIN_MAP_CONTAINER.appendChild(newItem);
    }
}