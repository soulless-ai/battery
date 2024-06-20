import { MAIN_USERS_CONTROLLER_CONTAINER,
    MAIN_AUTH_CONTAINER,
    MAIN_GARAGE_CONTAINER,
    MAIN_AUTO_DETAILS_CONTAINER,
    MAIN_AUTO_ROUTE_CONTAINER,
    MAIN_AUTO_DEBUGGING_CONTAINER,
    MAIN_ADD_EVM_PRO_CONTAINER,
    MAIN_MAP_CONTAINER,
    MAIN_PERSONAL_OFFICE_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";
import { MainHeader } from "./MainHeader.js";

import { checkAvatar } from "../utils/avatarUtils.js";

export class UsersControl {
    constructor(userData) {
        this.userData = userData;
        this.users = [];
        this.admins = [];
        this.serviceUsers = [];
    }

    async onStart() {
        new MainHeader(
            `Управление пользователями`,
            `<button id="addUser">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM5 10C5 9.44771 5.44772 9 6 9H9V6C9 5.44772 9.44771 5 10 5C10.5523 5 11 5.44772 11 6V9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44772 15 9 14.5523 9 14V11H6C5.44772 11 5 10.5523 5 10Z" fill="white"/>
                </svg>
                <span class="link-text">Добавить пользователя</span>
            </button>`
        ).onStart();
        await this.loadUsers();
        this.render();
    }

    async loadUsers() {
        try {
            const response = await fetch("exampleUsers.json");
            const data = await response.json();
            this.users = data;
            this.admins = data.filter(user => user.key);
            this.serviceUsers = data.filter(user => user.service === true);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    }

    async render() {
        const usersHTML = await Promise.all(this.users.map(async (user) => {
            const hasAvatar = await checkAvatar(`image/${user.avatar}`);
            return `
                <div class="users-list-result">
                    <div>
                        <img src="${hasAvatar ? `image/${user.avatar}` : 'image/default-avatar.png'}" alt="Avatar" class="avatar">
                        <div class="users-list-info">
                            <h3>${user.name} ${user.lastname}</h3>
                            <h5>${user.email}</h5>
                        </div>
                        <p>id: ${user.id}</p>
                    </div>
                    <div>
                        <button>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5858 0.999849C12.3668 0.2188 13.6332 0.2188 14.4142 0.999849L17 3.58564C17.781 4.36669 17.781 5.63302 17 6.41406L13.7175 9.6966C13.714 9.70012 13.7106 9.70362 13.7071 9.70711C13.7036 9.71059 13.7001 9.71404 13.6966 9.71746L7.41406 16H17C17.5523 16 18 16.4477 18 17C18 17.5523 17.5523 18 17 18H1C0.447715 18 0 17.5523 0 17V16.9998V12.9998C0 12.7346 0.105357 12.4803 0.292893 12.2927L11.5858 0.999849ZM12.9999 7.58571L15.5858 4.99985L13 2.41406L10.4141 4.99992L12.9999 7.58571ZM8.99992 6.41414L11.5857 8.99992L4.58579 15.9998H2V13.4141L8.99992 6.41414Z" fill="#C0C3C6"/>
                            </svg>
                            <span class="link-text">Редактировать</span>
                        </button>
                        <button class="removeUser">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C7.89543 2 7 2.89543 7 4V5H6H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H18H17V4C17 2.89543 16.1046 2 15 2H9ZM15 5V4H9V5H15ZM8 7H7V20H17V7H16H8Z" fill="#C0C3C6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        })).then(htmlArray => htmlArray.join(''));
        const adminsHTML = await Promise.all(this.admins.map(async (admin) => {
            const hasAvatar = await checkAvatar(`image/${admin.avatar}`);
            return `
                <div class="users-list-result">
                    <div>
                        <img src="${hasAvatar ? `image/${admin.avatar}` : 'image/default-avatar.png'}" alt="Avatar" class="avatar">
                        <div class="users-list-info">
                            <h3>${admin.name} ${admin.lastname}</h3>
                            <h5>${admin.email}</h5>
                        </div>
                    </div>
                    <div>
                        <button>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5858 0.999849C12.3668 0.2188 13.6332 0.2188 14.4142 0.999849L17 3.58564C17.781 4.36669 17.781 5.63302 17 6.41406L13.7175 9.6966C13.714 9.70012 13.7106 9.70362 13.7071 9.70711C13.7036 9.71059 13.7001 9.71404 13.6966 9.71746L7.41406 16H17C17.5523 16 18 16.4477 18 17C18 17.5523 17.5523 18 17 18H1C0.447715 18 0 17.5523 0 17V16.9998V12.9998C0 12.7346 0.105357 12.4803 0.292893 12.2927L11.5858 0.999849ZM12.9999 7.58571L15.5858 4.99985L13 2.41406L10.4141 4.99992L12.9999 7.58571ZM8.99992 6.41414L11.5857 8.99992L4.58579 15.9998H2V13.4141L8.99992 6.41414Z" fill="#C0C3C6"/>
                            </svg>
                            <span class="link-text">Редактировать</span>
                        </button>
                        <button class="removeUser">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C7.89543 2 7 2.89543 7 4V5H6H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H18H17V4C17 2.89543 16.1046 2 15 2H9ZM15 5V4H9V5H15ZM8 7H7V20H17V7H16H8Z" fill="#C0C3C6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        })).then(htmlArray => htmlArray.join(''));
        const serviceUsersHTML = await Promise.all(this.serviceUsers.map(async (serviceUser) => {
            const hasAvatar = await checkAvatar(`image/${serviceUser.avatar}`);
            return `
                <div class="users-list-result">
                    <div>
                        <img src="${hasAvatar ? `image/${serviceUser.avatar}` : 'image/default-avatar.png'}" alt="Avatar" class="avatar">
                        <div class="users-list-info">
                            <h3>${serviceUser.name} ${serviceUser.lastname}</h3>
                            <h5>${serviceUser.email}</h5>
                        </div>
                    </div>
                    <div>
                        <button>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5858 0.999849C12.3668 0.2188 13.6332 0.2188 14.4142 0.999849L17 3.58564C17.781 4.36669 17.781 5.63302 17 6.41406L13.7175 9.6966C13.714 9.70012 13.7106 9.70362 13.7071 9.70711C13.7036 9.71059 13.7001 9.71404 13.6966 9.71746L7.41406 16H17C17.5523 16 18 16.4477 18 17C18 17.5523 17.5523 18 17 18H1C0.447715 18 0 17.5523 0 17V16.9998V12.9998C0 12.7346 0.105357 12.4803 0.292893 12.2927L11.5858 0.999849ZM12.9999 7.58571L15.5858 4.99985L13 2.41406L10.4141 4.99992L12.9999 7.58571ZM8.99992 6.41414L11.5857 8.99992L4.58579 15.9998H2V13.4141L8.99992 6.41414Z" fill="#C0C3C6"/>
                            </svg>
                            <span class="link-text">Редактировать</span>
                        </button>
                        <button class="removeUser">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2C7.89543 2 7 2.89543 7 4V5H6H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H18H17V4C17 2.89543 16.1046 2 15 2H9ZM15 5V4H9V5H15ZM8 7H7V20H17V7H16H8Z" fill="#C0C3C6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        })).then(htmlArray => htmlArray.join(''));

        const newItem = document.createElement("section");
        newItem.classList.add("usersList");
        newItem.innerHTML = `
            <ul class="users-list-grid">
                <li class="users-list-grid-item users-list-grid-item1">
                    <div class="users-list-header">
                        <h5>Пользователи</h5>
                        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8L8 1L15 8" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="users-list-result-container">${usersHTML}</div>
                </li>
                <li class="users-list-grid-item users-list-grid-item2">
                    <div class="users-list-header">
                        <h5>Администратор</h5>
                        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8L8 1L15 8" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="users-list-result-container">${adminsHTML}</div>
                </li>
                <li class="users-list-grid-item users-list-grid-item3">
                    <div class="users-list-header">
                        <h5>Сервис</h5>
                        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 8L8 1L15 8" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="users-list-result-container" >${adminsHTML + serviceUsersHTML}</div>
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
        MAIN_USERS_CONTROLLER_CONTAINER.style.paddingBottom = "13vh";
        MAIN_USERS_CONTROLLER_CONTAINER.appendChild(newItem);
    }
}