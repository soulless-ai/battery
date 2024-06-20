import { HEADER_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { Garage } from "./Garage.js";
import { EVMPro } from "./EVMPro.js";
import { Map } from "./Map.js";
import { PersonalOffice } from "./PersonalOffice.js";
import { UsersControl } from "./UsersControl.js";
import { checkAvatar } from "../utils/avatarUtils.js";

export class Header {
    constructor(userData, avatar = 'default-avatar.png') {
        this.userData = userData;
        this.avatar = `image/${avatar}`;
    }
    
    async onStart() {
        this.get();
    }

    async get() {
        const newItem = document.createElement("section");
        newItem.classList.add("header-main");
        newItem.innerHTML = `
            <h1 id="icon">
                <svg width="165" height="40" viewBox="0 0 165 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.05993 32.9529V26.7352V7.07202H37.6876L14.1458 22.7974L17.9873 28.5487L44.7994 10.6731C45.3445 10.3104 46.0194 9.86995 47.1614 9.11866C48.7966 8.03057 48.7966 6.24301 47.1614 5.15492C45.9674 4.35182 43.7353 2.82332 42.0481 1.70933C40.7504 0.854406 39.9717 0.0253906 37.7135 0.0253906H12.277C11.109 0.0253906 9.73337 0.232644 8.51345 1.06166L1.24587 5.93213C0.41529 6.52798 0 7.87513 0 9.06684V30.9321C0 32.0979 0.41529 33.471 1.24587 34.0668L8.53941 38.9373C9.75932 39.7922 11.109 39.9736 12.303 39.9736H24.7357H47.1614V32.9269L7.05993 32.9529Z" fill="#FF3722"/>
                <path d="M165 39.9995V7.30524C165 6.65757 164.637 5.93218 164.144 5.6213L157.135 0.880369C156.409 0.388141 155.838 -0.0263672 155.111 -0.0263672C154.384 -0.0263672 153.813 0.0254462 153.034 0.543581L139.875 9.42959L146.13 13.6524L157.94 5.75083V39.9995H165Z" fill="#FF3722"/>
                <path d="M103.719 39.9995V7.30524C103.719 6.65757 104.108 5.984 104.575 5.6213L111.583 0.880369C112.31 0.388141 112.881 -0.0263672 113.608 -0.0263672C114.335 -0.0263672 114.906 0.0254462 115.684 0.543581L140.602 17.3052L134.346 21.5021L110.779 5.69902V39.9477H103.719V39.9995Z" fill="#FF3722"/>
                <path d="M91.9343 0V12.2021L58.9447 34.2487V0H51.8848V32.6943C51.8848 33.342 52.3001 34.0415 52.7413 34.3782L59.6195 39.1192C60.3463 39.6114 60.9173 40.0259 61.6441 40.0259C62.3708 40.0259 62.9419 39.9741 63.7205 39.456L96.6582 17.487C98.6828 16.114 99.0202 14.2487 99.0202 12.9534V0H91.9343Z" fill="#FF3722"/>
                </svg>
            </h1>
            <nav>
                <ul>
                    <li id="headerAddEVMPro"><a href="#">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C8 0.447715 7.55228 0 7 0C6.44772 0 6 0.447715 6 1V6H1C0.447715 6 0 6.44772 0 7C0 7.55228 0.447715 8 1 8H6V13C6 13.5523 6.44772 14 7 14C7.55229 14 8 13.5523 8 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44772 13.5523 6 13 6H8V1Z" fill="#C0C3C6"/>
                        </svg>
                    </a></li>
                    ${this.userData.key || this.userData.service ? 
                        `<li id="headerUsersControl"><a href="#">
                            <svg class="icon_right_padding" width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C12 0.447715 12.4477 0 13 0C15.7614 0 18 2.23858 18 5C18 7.76142 15.7614 10 13 10C12.4477 10 12 9.55229 12 9C12 8.44772 12.4477 8 13 8C14.6569 8 16 6.65685 16 5C16 3.34315 14.6569 2 13 2C12.4477 2 12 1.55228 12 1ZM2 16C2 15.3338 2.40506 14.6083 3.31206 14.0036C4.21207 13.4036 5.51303 13 7 13C8.48697 13 9.78793 13.4036 10.6879 14.0036C11.5949 14.6083 12 15.3338 12 16C12 16.5523 12.4477 17 13 17C13.5523 17 14 16.5523 14 16C14 14.457 13.0619 13.1826 11.7973 12.3395C10.5258 11.4918 8.82674 11 7 11C5.17326 11 3.47422 11.4918 2.20266 12.3395C0.938089 13.1826 0 14.457 0 16C0 16.5523 0.447715 17 1 17C1.55228 17 2 16.5523 2 16ZM15.2296 11.2544C14.692 11.1278 14.1535 11.4608 14.0269 11.9984C13.9002 12.536 14.2333 13.0744 14.7709 13.2011C16.9278 13.7094 18.0002 14.9575 18.0002 16.0002C18.0002 16.5524 18.4479 17.0002 19.0002 17.0002C19.5525 17.0002 20.0002 16.5524 20.0002 16.0002C20.0002 13.5595 17.7334 11.8444 15.2296 11.2544ZM4 5C4 3.34315 5.34315 2 7 2C8.65685 2 10 3.34315 10 5C10 6.65685 8.65685 8 7 8C5.34315 8 4 6.65685 4 5ZM7 0C4.23858 0 2 2.23858 2 5C2 7.76142 4.23858 10 7 10C9.76142 10 12 7.76142 12 5C12 2.23858 9.76142 0 7 0Z" fill="#C0C3C6"/>
                            </svg>
                            <span class="link-text">Управление пользователями</span>
                        </a></li>` : ''}
                    <li id="searcher"><a href="#">
                        <svg class="icon_right_padding" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.5 18C14.6421 18 18 14.6421 18 10.5C18 6.35786 14.6421 3 10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18Z" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 16L21 21" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="link-text">Поиск по номеру</span>
                    </a></li>
                    <li id="headerMap"><a href="#">
                        <svg class="icon_right_padding" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 5.61884L14 7.61884V18.3247L10 16.5747V5.61884ZM15.7626 20.5015C15.491 20.8192 15.0284 20.9577 14.5992 20.7699L9.06667 18.3494L4.44721 20.6592C3.78231 20.9916 3 20.5081 3 19.7647V6.96309C3 6.60423 3.19229 6.27289 3.50386 6.09485L8.18465 3.42011C8.45589 3.0417 8.98048 2.87301 9.44721 3.10637L14.9333 5.84944L19.5039 3.2377C20.1705 2.85676 21 3.33813 21 4.10595V17.2647C21 17.6435 20.786 17.9898 20.4472 18.1592L15.7626 20.5015ZM16 18.1467L19 16.6467V5.82913L16 7.54341V18.1467ZM5 18.1467L8 16.6467V5.82913L5 7.54341V18.1467Z" fill="#C0C3C6"/>
                        </svg>
                        <span class="link-text">Карта</span>
                    </a></li>
                    <li id="headerAvatar" style="margin-right: 0px;">
                        <a href="#">
                        ${checkAvatar() ? `<img src="${this.avatar}" alt="Avatar" class="avatar">` : '<img src="image/default-avatar.png" alt="Default Avatar" class="avatar">'}
                    </a></li>
                </ul>
            </nav>
            `;
        clearContainers([
            HEADER_CONTAINER
        ])
        HEADER_CONTAINER.appendChild(newItem);

        this.onClickIcon(document.querySelector("#icon"));
        this.onClickAddEVMPro(document.querySelector("#headerAddEVMPro"));
        this.onClickUsersControl(document.querySelector("#headerUsersControl"));
        this.onClickMap(document.querySelector("#headerMap"));
        this.onClickAuth(document.querySelector("#headerAvatar"));
    }

    async onClickIcon(button) {
        button.addEventListener("click", () => {
            this.removeActiveClassFromAllButtons();
            button.classList.add("active");
            new Garage(this.userData).onStart();
        });
    }

    async onClickAddEVMPro(button) {
        button.addEventListener("click", () => {
            this.removeActiveClassFromAllButtons();
            button.classList.add("active");
            new EVMPro(this.userData).onStart();
        });
    }

    async onClickUsersControl(button) {
        if(!button) return null;
        button.addEventListener("click", () => {
            this.removeActiveClassFromAllButtons();
            button.classList.add("active");
            new UsersControl(this.userData).onStart();
        });
    }

    async onClickMap(button) {
        button.addEventListener("click", () => {
            this.removeActiveClassFromAllButtons();
            button.classList.add("active");
            new Map(this.userData).onStart();
        });
    }

    async onClickAuth(button) {
        button.addEventListener("click", () => {
            this.removeActiveClassFromAllButtons();
            button.classList.add("active");
            new PersonalOffice(this.userData).onStart();
        });
    }

    removeActiveClassFromAllButtons() {
        const buttons = document.querySelectorAll("nav ul li");
        buttons.forEach(button => {
            button.classList.remove("active");
        });
    }
}