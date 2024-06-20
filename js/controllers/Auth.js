import { MAIN_AUTH_CONTAINER,
    HEADER_CONTAINER,
    MAIN_HEADER_CONTAINER,
    MAIN_GARAGE_CONTAINER,
    MAIN_AUTO_DETAILS_CONTAINER,
    MAIN_AUTO_ROUTE_CONTAINER,
    MAIN_AUTO_DEBUGGING_CONTAINER,
    MAIN_ADD_EVM_PRO_CONTAINER,
    MAIN_USERS_CONTROLLER_CONTAINER,
    MAIN_MAP_CONTAINER,
    MAIN_PERSONAL_OFFICE_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { User } from "./User.js";
import { Garage } from "./Garage.js";

export class Auth {
    constructor() {
        this.authHeader;
        this.forgotButton;
        
        this.in;
        this.up;
        this.forgot;
        this.forgotVer;
    }

    async onStart() {
        this.get();
    }
    async get() {
        const newItem = document.createElement("section");
        newItem.classList.add("auth");
        newItem.innerHTML = `
            <div id="auth-container">
                <div class="btn-group">
                    <h1 id="authHeader">Вход</h1>
                </div>
                <div id="loginForm">
                    <form>
                        <div class="form-group">
                            <label for="loginUsername">Логин:</label>
                            <input type="text" id="loginUsername" name="loginUsername">
                        </div>
                        <div class="form-group">
                            <label for="loginPassword">Пароль:</label>
                            <input type="password" id="loginPassword" name="loginPassword">
                        </div>
                        <div class="form-group">
                            <button id="submitIn" type="submit">Войти</button>
                        </div>
                        <div class="form-group">
                            <a id="forgot" href="#">Не помню логин / пароль</a>
                        </div>
                    </form>
                </div>
                <div id="registrationForm" style="display: none;">
                    <form>
                        <!-- Форма регистрации -->
                    </form>
                </div>
                <div id="forgotForm" style="display: none;">
                    <form>
                        <div class="form-group">
                            <label for="carNumber">Гос номер:</label>
                            <input type="text" id="carNumber" name="carNumber" placeholder="" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Электронная почта:</label>
                            <input type="email" id="email" name="email" placeholder="example@example.com" required>
                        </div>
                        <div class="form-group">
                            <button id="submitForgot" type="submit">Отправить</button>
                        </div>
                    </form>
                </div>
                <div id="forgotVerForm" style="display: none;">
                    <div>
                        <div class="form-group">
                            <h6>Обычно смена логина и пароля занимает до 2х часов. Новая информация для входа придет на указанную почту.</h6>
                        </div>
                        <div class="form-group">
                            <button id="submitForgotVer">Хорошо</button>
                        </div>
                    </div>
                </div>
            </div>
            `;

        this.authHeader = newItem.querySelector("#authHeader");
        this.forgotButton = newItem.querySelector("#forgot");

        this.in = newItem.querySelector("#loginForm");
        this.up = newItem.querySelector("#registrationForm");
        this.forgot = newItem.querySelector("#forgotForm");
        this.forgotVer = newItem.querySelector("#forgotVerForm");
    
        clearContainers([
            HEADER_CONTAINER,
            MAIN_HEADER_CONTAINER,
            MAIN_GARAGE_CONTAINER,
            MAIN_AUTO_DETAILS_CONTAINER,
            MAIN_AUTO_ROUTE_CONTAINER,
            MAIN_AUTO_DEBUGGING_CONTAINER,
            MAIN_ADD_EVM_PRO_CONTAINER,
            MAIN_USERS_CONTROLLER_CONTAINER,
            MAIN_MAP_CONTAINER,
            MAIN_PERSONAL_OFFICE_CONTAINER
        ]);
        MAIN_AUTH_CONTAINER.appendChild(newItem);
        this.onClickSubmitIn(document.querySelector("#submitIn"));
        this.onClickForgot();
        this.onClickForgotVer();
    }
    async showLogin(button) {
        button.addEventListener("click", () => {
            this.in.style.display = "block";
            this.up.style.display = "none";
        })
    }
    async showRegistration(button) {
        button.addEventListener("click", () => {
            this.in.style.display = "none";
            this.up.style.display = "block";
        })
    }
    async onClickSubmitIn(button) {
        button.addEventListener("click", async (event) => {
            event.preventDefault();
            const login = document.getElementById("loginUsername").value;
            const password = document.getElementById("loginPassword").value;
            
            if (!this.checkValid(login, password)) return null;
            const userData = await new User().get(login, password);
            if (userData) new Garage(userData).onStart();
            else console.log("Такого пользователя не существует");
        })
    }
    checkValid(login, password) {
        if (!login || !password) {
            console.error("Логин или пароль не заполнены");
            return false;
        }
        if (login.length < 5 || password.length < 5) {
            console.error("Логин и пароль должны содержать не менее 5 символов");
            return false;
        }
        return true;
    }
    async onClickForgot() {
        this.forgotButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.authHeader.textContent = "Запрос на смену логина и пароля";

            this.in.style.display = "none";
            this.up.style.display = "none";
            this.forgot.style.display = "block";
        })
    }
    async onClickForgotVer() {
        document.getElementById("submitForgot").addEventListener("click", () => {
            this.authHeader.textContent = "Запрос на смену логина и пароля отправлен";
            this.forgot.style.display = "none";
            this.forgotVer.style.display ="block";
        })
    }
}