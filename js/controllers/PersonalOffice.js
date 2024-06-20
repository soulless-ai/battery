import { MAIN_PERSONAL_OFFICE_CONTAINER,
    MAIN_AUTH_CONTAINER,
    MAIN_GARAGE_CONTAINER,
    MAIN_AUTO_DETAILS_CONTAINER,
    MAIN_AUTO_ROUTE_CONTAINER,
    MAIN_AUTO_DEBUGGING_CONTAINER,
    MAIN_ADD_EVM_PRO_CONTAINER,
    MAIN_USERS_CONTROLLER_CONTAINER,
    MAIN_MAP_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { MainHeader } from "./MainHeader.js";

import { checkAvatar } from "../utils/avatarUtils.js";

export class PersonalOffice {
    constructor(userData) {
        this.userData = userData;
    }

    async onStart() {
        new MainHeader(
            `Личный кабинет`,
            ``
        ).onStart();
        this.get();
        this.setupEventListeners();

        this.lightThemeUrl = 'css/light/main.css';
    }

    get() {
        const newItem = document.createElement("section");
        const hasAvatar = checkAvatar(`image/${this.userData.avatar}`);
        newItem.classList.add("personal-office-container");
        newItem.innerHTML = `
            <ul class="personal-office-grid">
                <li class="personal-office-grid-item1">
                    <img src="${hasAvatar ? `image/${this.userData.avatar}` : 'image/man.png'}" alt="Avatar" class="avatar">
                    <button class="personal-office-add-avatar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M20 7H4C3.44772 7 3 7.44772 3 8V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V8C21 7.44772 20.5523 7 20 7Z" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.2793 4H9.72082C9.29039 4 8.90825 4.27543 8.77214 4.68377L8.4388 5.68377C8.22296 6.3313 8.70493 7 9.38749 7H14.6126C15.2952 7 15.7772 6.3313 15.5613 5.68377L15.228 4.68377C15.0919 4.27543 14.7097 4 14.2793 4Z" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="link-text">Изменить аватар</span>
                    </button>
                    <p>JPG, PNG, максимальный размер 1Mb</p>
                </li>
                <li class="personal-office-grid-item2">
                    <h5 class="personal-office-header">Информация пользователя</h5>
                    <form class="personal-office-change-form">
                        <div class="personal-office-change-col">
                            <input type="text" placeholder="Имя" value="${this.userData && this.userData.name ? this.userData.name : ''}">
                            <input type="text" placeholder="Фамилия" value="${this.userData && this.userData.lastname ? this.userData.lastname : ''}">
                        </div>
                        <input type="text" placeholder="Организация" value="${this.userData && this.userData.organization ? this.userData.organization : ''}">
                        <input type="email" placeholder="Почта" value="${this.userData && this.userData.email ? this.userData.email : ''}">
                        <input type="tel" placeholder="Номер телефона" value="${this.userData && this.userData.phone ? this.userData.phone : ''}">
                        <button id="changeInfoButton" type="submit">Сохранить изменения</button>
                    </form>
                </li>
                <li class="personal-office-grid-item3">
                    <h5 class="personal-office-header">Информация для входа</h5>
                    <form class="personal-office-change-in-form">
                        <label for="">Логин</label>
                        <div>
                            <input type="password" id="personalLoginChanger" value="${this.userData.login}">
                            <button id="showLogin">
                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.29244 0.292893C2.68297 -0.0976311 3.31613 -0.0976311 3.70666 0.292893L19.7067 16.2929C20.0972 16.6834 20.0972 17.3166 19.7067 17.7071C19.3161 18.0976 18.683 18.0976 18.2924 17.7071L15.4766 14.8913C14.1418 15.541 12.6252 16 10.9994 16C7.88987 16 5.16423 14.3233 3.29019 12.7699C2.33899 11.9815 1.5717 11.1953 1.04183 10.6063C0.749085 10.2809 0.461423 9.94976 0.198857 9.59925C-0.0658598 9.24449 -0.0664979 8.75636 0.198219 8.40161C0.328958 8.22678 0.468104 8.05838 0.608573 7.89135C0.866616 7.5845 1.24165 7.15936 1.7166 6.67711C2.47528 5.90677 3.50415 4.97507 4.73255 4.14721L2.29244 1.70711C1.90192 1.31658 1.90192 0.683417 2.29244 0.292893ZM12.2929 11.7076L13.9636 13.3782C13.0146 13.7648 12.0178 14 10.9994 14C8.58613 14 6.31177 12.6767 4.56652 11.2301C3.70808 10.5185 3.0109 9.8047 2.52871 9.2687C2.44251 9.17288 2.36338 9.08296 2.29162 9C2.50998 8.74755 2.7962 8.43116 3.14156 8.08049C3.91033 7.29991 4.95362 6.36846 6.17716 5.59182L8.29218 7.70684C8.10476 8.09855 7.99955 8.53743 7.99955 9.00019C7.99955 10.657 9.3427 12.0002 10.9996 12.0002C11.4622 12.0002 11.9011 11.895 12.2929 11.7076ZM10.3043 9.71894L10.2808 9.69546C10.2885 9.70342 10.2963 9.71125 10.3043 9.71894ZM10.9994 4C10.7063 4 10.4151 4.01946 10.1263 4.0564C9.57849 4.12648 9.07758 3.73919 9.00751 3.19137C8.93743 2.64355 9.32471 2.14264 9.87254 2.07256C10.2416 2.02535 10.6176 2 10.9994 2C14.109 2 16.8346 3.67673 18.7086 5.2301C19.6599 6.01854 20.4271 6.8047 20.957 7.3937C21.2497 7.71908 21.5376 8.05011 21.8 8.40075L21.8007 9.59827C21.5759 9.89905 21.3308 10.1844 21.0823 10.4657C20.6307 10.977 19.9761 11.6667 19.1598 12.3846C18.7451 12.7493 18.1133 12.7088 17.7485 12.2941C17.3838 11.8794 17.4243 11.2475 17.839 10.8828C18.5787 10.2322 19.174 9.60507 19.5834 9.14162C19.6268 9.09246 19.6681 9.04519 19.7072 9C19.6355 8.91704 19.5563 8.82712 19.4701 8.7313C18.9879 8.1953 18.2908 7.48146 17.4323 6.7699C15.6871 5.32327 13.4127 4 10.9994 4ZM21.8009 8.40195L21.8007 9.59827C22.0654 9.24352 22.0656 8.75671 21.8009 8.40195Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                        <label for="">Пароль</label>
                        <div>
                            <input type="password" id="personalPasswordChanger" value="${this.userData.password}">
                            <button id="showPassword">
                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.29244 0.292893C2.68297 -0.0976311 3.31613 -0.0976311 3.70666 0.292893L19.7067 16.2929C20.0972 16.6834 20.0972 17.3166 19.7067 17.7071C19.3161 18.0976 18.683 18.0976 18.2924 17.7071L15.4766 14.8913C14.1418 15.541 12.6252 16 10.9994 16C7.88987 16 5.16423 14.3233 3.29019 12.7699C2.33899 11.9815 1.5717 11.1953 1.04183 10.6063C0.749085 10.2809 0.461423 9.94976 0.198857 9.59925C-0.0658598 9.24449 -0.0664979 8.75636 0.198219 8.40161C0.328958 8.22678 0.468104 8.05838 0.608573 7.89135C0.866616 7.5845 1.24165 7.15936 1.7166 6.67711C2.47528 5.90677 3.50415 4.97507 4.73255 4.14721L2.29244 1.70711C1.90192 1.31658 1.90192 0.683417 2.29244 0.292893ZM12.2929 11.7076L13.9636 13.3782C13.0146 13.7648 12.0178 14 10.9994 14C8.58613 14 6.31177 12.6767 4.56652 11.2301C3.70808 10.5185 3.0109 9.8047 2.52871 9.2687C2.44251 9.17288 2.36338 9.08296 2.29162 9C2.50998 8.74755 2.7962 8.43116 3.14156 8.08049C3.91033 7.29991 4.95362 6.36846 6.17716 5.59182L8.29218 7.70684C8.10476 8.09855 7.99955 8.53743 7.99955 9.00019C7.99955 10.657 9.3427 12.0002 10.9996 12.0002C11.4622 12.0002 11.9011 11.895 12.2929 11.7076ZM10.3043 9.71894L10.2808 9.69546C10.2885 9.70342 10.2963 9.71125 10.3043 9.71894ZM10.9994 4C10.7063 4 10.4151 4.01946 10.1263 4.0564C9.57849 4.12648 9.07758 3.73919 9.00751 3.19137C8.93743 2.64355 9.32471 2.14264 9.87254 2.07256C10.2416 2.02535 10.6176 2 10.9994 2C14.109 2 16.8346 3.67673 18.7086 5.2301C19.6599 6.01854 20.4271 6.8047 20.957 7.3937C21.2497 7.71908 21.5376 8.05011 21.8 8.40075L21.8007 9.59827C21.5759 9.89905 21.3308 10.1844 21.0823 10.4657C20.6307 10.977 19.9761 11.6667 19.1598 12.3846C18.7451 12.7493 18.1133 12.7088 17.7485 12.2941C17.3838 11.8794 17.4243 11.2475 17.839 10.8828C18.5787 10.2322 19.174 9.60507 19.5834 9.14162C19.6268 9.09246 19.6681 9.04519 19.7072 9C19.6355 8.91704 19.5563 8.82712 19.4701 8.7313C18.9879 8.1953 18.2908 7.48146 17.4323 6.7699C15.6871 5.32327 13.4127 4 10.9994 4ZM21.8009 8.40195L21.8007 9.59827C22.0654 9.24352 22.0656 8.75671 21.8009 8.40195Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                        <button id="changeInInfoButton" type="submit">Запросить изменение</button>
                    </form
                </li>
                <li class="personal-office-grid-item4">
                    <h5 class="personal-office-header">Тема</h5>
                    <form class="custom-radio">
                        <div class="custom-radio">
                            <input type="radio" id="lightThemeRadio" name="theme" value="light">
                            <label for="lightThemeRadio">Светлая тема</label>
                        </div>
                        <br>
                        <div class="custom-radio">
                            <input type="radio" id="darkThemeRadio" name="theme" value="dark" checked>
                            <label for="darkThemeRadio">Тёмная тема</label>
                        </div>
                    </form>
                </li>
                <li class="personal-office-grid-item5">
                    <button class="">Выйти 
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H13C14.6569 20 16 18.6569 16 17V16.2C16 15.6477 15.5523 15.2 15 15.2C14.4477 15.2 14 15.6477 14 16.2V17C14 17.5523 13.5523 18 13 18H7C6.44772 18 6 17.5523 6 17V7C6 6.44772 6.44772 6 7 6H13C13.5523 6 14 6.44772 14 7V7.8C14 8.35228 14.4477 8.8 15 8.8C15.5523 8.8 16 8.35228 16 7.8V7C16 5.34315 14.6569 4 13 4H7ZM20.7071 12.7071C20.8902 12.524 20.9874 12.2877 20.9989 12.048L21 11.9908L20.9999 11.9894C20.9986 11.8577 20.9717 11.732 20.9241 11.6172C20.8753 11.4993 20.803 11.3888 20.7071 11.2929L18.7071 9.29289C18.3166 8.90237 17.6834 8.90237 17.2929 9.29289C16.9024 9.68342 16.9024 10.3166 17.2929 10.7071L17.5858 11H11C10.4477 11 10 11.4477 10 12C10 12.5523 10.4477 13 11 13H17.5858L17.2929 13.2929C16.9024 13.6834 16.9024 14.3166 17.2929 14.7071C17.6834 15.0976 18.3166 15.0976 18.7071 14.7071L20.7071 12.7071Z" fill="#C0C3C6"/>
                        </svg>
                    </button>
                </li>
            </ul>
            `;
        clearContainers([
            MAIN_AUTH_CONTAINER,
            MAIN_GARAGE_CONTAINER,
            MAIN_AUTO_DETAILS_CONTAINER,
            MAIN_AUTO_ROUTE_CONTAINER,
            MAIN_AUTO_DEBUGGING_CONTAINER,
            MAIN_ADD_EVM_PRO_CONTAINER,
            MAIN_USERS_CONTROLLER_CONTAINER,
            MAIN_MAP_CONTAINER,
            MAIN_PERSONAL_OFFICE_CONTAINER
        ]);
        MAIN_PERSONAL_OFFICE_CONTAINER.style.paddingBottom = "13vh";
        MAIN_PERSONAL_OFFICE_CONTAINER.appendChild(newItem);
    }
    setupEventListeners() {
        const showLoginButton = document.getElementById("showLogin");
        const showPasswordButton = document.getElementById("showPassword");
        const loginInput = document.querySelector("#personalLoginChanger");
        const passwordInput = document.querySelector("#personalPasswordChanger");
        showLoginButton.addEventListener("click", () => {
            if (loginInput.type === "password") {
                loginInput.type = "text";
            } else {
                loginInput.type = "password";
            }
        });

        showPasswordButton.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
            } else {
                passwordInput.type = "password";
            }
        });
        this.themeListener();
    }
    themeListener() {
        const lightThemeRadioButton = document.getElementById('lightThemeRadio');
        const darkThemeRadioButton = document.getElementById('darkThemeRadio');
        lightThemeRadioButton.addEventListener('change', () => {
            if (lightThemeRadioButton.checked) {
                this.setTheme(this.lightThemeUrl);
            }
        });
        darkThemeRadioButton.addEventListener('change', () => {
            if (darkThemeRadioButton.checked) {
                this.removeTheme(this.lightThemeUrl);
            }
        });
    }
    async setTheme(url) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = url;
        document.head.appendChild(cssLink);
    }
    async removeTheme(url) {
        const links = document.querySelectorAll('link[rel="stylesheet"][href="' + url + '"]');
        links.forEach(link => link.remove());
    }
}