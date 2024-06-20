import { MAIN_ADD_EVM_PRO_CONTAINER,
    MAIN_AUTH_CONTAINER,
    MAIN_GARAGE_CONTAINER,
    MAIN_AUTO_DETAILS_CONTAINER,
    MAIN_AUTO_ROUTE_CONTAINER,
    MAIN_USERS_CONTROLLER_CONTAINER,
    MAIN_MAP_CONTAINER,
    MAIN_PERSONAL_OFFICE_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { MainHeader } from "./MainHeader.js";
import { Garage } from "./Garage.js";
import { PupUp } from "./PupUp.js";

export class EVMPro {
    constructor(userData) {
        this.userData = userData;
    }

    async onStart() {
        new MainHeader(
            `Добавление EVM PRO`,
            `<button id="addUser">
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0H9.56309C10.1202 0 10.6521 0.232388 11.0306 0.641184L15.4675 5.43305C15.8098 5.80275 16 6.28803 16 6.79187V18C16 19.1046 15.1046 20 14 20H2C0.895432 20 0 19.1046 0 18V2C0 0.895431 0.895431 0 2 0H9ZM8 2L2 2L2 18H14L14 8L10 8C8.89543 8 8 7.10457 8 6V2ZM13.2668 6L10 6V2.47187L13.2668 6ZM9 10C9 9.44772 8.55229 9 8 9C7.44772 9 7 9.44771 7 10L7 14.1315L5.55481 13.1681C5.09528 12.8617 4.47441 12.9859 4.16806 13.4454C3.8617 13.9049 3.98588 14.5258 4.44541 14.8322L7.43579 16.8257C7.5641 16.9136 7.71392 16.9723 7.87572 16.9924C7.96783 17.0039 8.06119 17.0026 8.15301 16.9884C8.2826 16.9685 8.404 16.9237 8.51217 16.8591C8.52655 16.8505 8.54076 16.8415 8.55481 16.8322L11.5548 14.8322C12.0143 14.5258 12.1385 13.9049 11.8322 13.4454C11.5258 12.9859 10.9049 12.8617 10.4454 13.1681L9 14.1317L9 10Z" fill="#C0C3C6"/>
                </svg>            
                <span class="link-text">Добавить из файла</span>
            </button>`
        ).onStart();
        this.render();
    }

    async render() {
        const autos = await new Garage(this.userData).getAll();
        const newItem = document.createElement("section");
        newItem.classList.add("add-evm-pro-container");
        newItem.innerHTML = `
            <ul class="add-evm-pro-grid">
                <li class="add-evm-pro-grid-item1">
                    <h5 class="add-evm-pro-header">Все EVM PRO</h5>
                    <div class="add-evm-pro-filters">
                        <ul>
                            <li>
                                <p>10 строк</p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 11L12 14L9 11" stroke="#929497" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </li>
                            <li>
                                <p>Сначала старые</p>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 11L12 14L9 11" stroke="#929497" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </li>
                        </ul>
                    </div>
                    <div class="evm-pro-list-container">
                        <table id="EVMProList">
                            <thead>
                                <tr>
                                    <th>Дата и время добавлениия</th>
                                    <th>id</th>
                                    <th>Гос.номер</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                    <div>PAGES</div>
                </li>
                <li class="add-evm-pro-grid-item2">
                    <h5 class="add-evm-pro-header">Добавление EVM PRO</h5>
                    <form>
                        <div>
                            <label>id</label>
                            <input type="number" placeholder="${autos.length + 1}" readonly>
                        </div>
                        <div>
                            <label>Гос.номер</label>
                            <input type="text" placeholder="А743ЛК797">
                        </div>
                        <button>Сохранить</button>
                    </form>
                </li>
            </ul>
        `;
        const tableBody = newItem.querySelector("#EVMProList tbody");
        tableBody.innerHTML = '';
        autos.forEach(auto => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${auto.add_date}</td>
                <td>${auto.id}</td>
                <td>${auto.name}</td>
                <td><button class="editBtn">
                    <svg class="remove-btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 19.9998H8L19.2929 8.70696C19.6834 8.31643 19.6834 7.68327 19.2929 7.29274L16.7071 4.70696C16.3166 4.31643 15.6834 4.31643 15.2929 4.70696L4 15.9998V19.9998Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 8L16 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="remove-btn-text">Редактировать</span>
                </button></td>
                <td><button class="removeBtn">
                    <svg class="remove-btn-svg" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 21L3 3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21.0001 3L3 21.0001" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="remove-btn-text">Удалить</span>
                </button></td>
            `;
            row.querySelector('.editBtn').addEventListener('click', () => this.onClickEditEVMPro(auto));
            row.querySelector('.removeBtn').addEventListener('click', () => this.onClickRemoveEVMPro(auto));
            tableBody.appendChild(row);
        });
        clearContainers([
            MAIN_AUTH_CONTAINER,
            MAIN_GARAGE_CONTAINER,
            MAIN_AUTO_DETAILS_CONTAINER,
            MAIN_AUTO_ROUTE_CONTAINER,
            MAIN_ADD_EVM_PRO_CONTAINER,
            MAIN_USERS_CONTROLLER_CONTAINER,
            MAIN_MAP_CONTAINER,
            MAIN_PERSONAL_OFFICE_CONTAINER
        ]);
        MAIN_ADD_EVM_PRO_CONTAINER.style.paddingBottom = "13vh";
        MAIN_ADD_EVM_PRO_CONTAINER.appendChild(newItem);
    }
    async onClickEditEVMPro(auto) {
        new PupUp (
            `Редактировать EVM PRO`,
            `
                <form id="evmProEditForm">
                    <label>id</label>
                    <input type="number" value="${auto.id}">
                    <label>Гос.номер</label>
                    <input type="text" value="${auto.name}">
                    <button>Сохранить</button>
                </form>
            `).onStart();
    }
    async onClickRemoveEVMPro(auto) {
        const newItem = new PupUp (
            `Удалить id = ${auto.id}?`,
            `
                <form>
                    <button id="removeEVMPro">Да</button>
                    <button id="cancelRemoveEVMPro">Нет</button>
                </form>
            `).onStart();
        document.querySelector('.editBtn').addEventListener('click', () => this.removeEVMPro(auto));
        document.querySelector('.cancelRemoveEVMPro').addEventListener('click', () => newItem.close());
    }
    async removeEVMPro(auto) {

    }
}