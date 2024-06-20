import { MAIN_GARAGE_CONTAINER,
    MAIN_AUTH_CONTAINER,
    MAIN_AUTO_DETAILS_CONTAINER,
    MAIN_AUTO_ROUTE_CONTAINER,
    MAIN_AUTO_DEBUGGING_CONTAINER,
    MAIN_ADD_EVM_PRO_CONTAINER,
    MAIN_USERS_CONTROLLER_CONTAINER,
    MAIN_MAP_CONTAINER,
    MAIN_PERSONAL_OFFICE_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { Table } from "./Table.js";

import { Auto } from "./Auto.js";
import { Battery } from "./Battery.js";
import { Header } from "./Header.js";
import { MainHeader } from "./MainHeader.js";
import { RouteAuto } from "./RouteAuto.js";

export class Garage {
    constructor(userData = null) {
        this.userData = userData;
        this.isTileView = true;
    }
    async onStart() {
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
        new Header(this.userData, this.userData.avatar).onStart();
        new MainHeader(
            `Электрогрузомобили EVM PRO`,
            `
            <button id="garageString">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 19L19 5C19 4.44772 18.5523 4 18 4L15 4C14.4477 4 14 4.44772 14 5L14 19C14 19.5523 14.4477 20 15 20H18C18.5523 20 19 19.5523 19 19Z" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10 19L10 5C10 4.44772 9.55229 4 9 4L6 4C5.44772 4 5 4.44772 5 5L5 19C5 19.5523 5.44772 20 6 20H9C9.55228 20 10 19.5523 10 19Z" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button id="garageTile">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 4V20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 15L4 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 9L4 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            `
        ).onStart();

        this.setTile(await this.getAll());
        this.addHeaderClickListener();
    }
    async getAll() {
        try {
            const response = await fetch("example.json");
            const data = await response.json();
            const autos = []; 
            if (this.userData && this.userData.id) {
                data.forEach(item => {
                    if (item.userId === this.userData.id) {
                        item.evm_pro.forEach(result => {
                            autos.push(result);
                        });
                    }
                });
            } else {
                return null;
            }
            return autos;
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            throw error;
        }
    }
    async setTile(data) {
        data.forEach(item => {
            const newItem = document.createElement("section");
            const battery = new Battery();
            newItem.classList.add("garage-item");
            newItem.innerHTML = `
                    <div class="garage-info-header">
                        <h2>${item.name}</h2>
                        <p>id: ${item.id}</p>
                    </div>
                    <div class="battery">
                        ${battery.getBattery(item.battery_health)}
                        <div class="battery_health">${item.battery_health}%</div>
                    </div>
                    <div class="garage-info">
                        <div><h5>Пробег дневной</h5><h5>${item.one_day_steps}</h5></div>
                        <div class="garage-info-barrier"></div>
                        <div><h5>Пробег общий</h5><h5>${item.steps}</h5></div>
                        <div class="garage-info-barrier"></div>
                        <div><h5>Следующий сервис</h5><h5>${item.next_service}</h5></div>
                    </div>
                    <div class="garage-buttons">
                        <button class="about-cars"><span class="link-text">Подробнее</span><svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L8 8L1 15" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                        <button class="route-cars"><span class="link-text">Посмотреть маршрут</span><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5603 18.7675C12.9638 19.5745 14.1452 19.4767 14.4105 18.6144L19.2749 2.8053C19.511 2.03802 18.7923 1.31935 18.025 1.55543L2.21591 6.41977C1.35364 6.68509 1.25587 7.86652 2.06278 8.26998L8.76301 11.6201C8.95654 11.7169 9.11346 11.8738 9.21022 12.0673L12.5603 18.7675Z" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
                    </div>
            `;
            newItem.querySelector(".battery_indicator section").style.backgroundImage = battery.getGradient();
            newItem.querySelector(".battery_indicator section").style.borderColor = battery.getBatteryColor();
            newItem.querySelector(".battery_indicator").style.borderColor = battery.getBatteryColor();
            newItem.querySelector(".battery_head").style.borderColor = battery.getBatteryColor();
            if (item.battery_health >= 98) {
                newItem.querySelector(".battery_indicator section").style.borderTopRightRadius = `12px`;
                newItem.querySelector(".battery_indicator section").style.borderBottomRightRadius = `12px`;
                newItem.querySelector(".battery_indicator section").style.border = `solid 2px ` + battery.getBatteryColor();
            }
            if (MAIN_GARAGE_CONTAINER.classList.contains("garage-string")) MAIN_GARAGE_CONTAINER.classList.remove("garage-string");
            MAIN_GARAGE_CONTAINER.style.paddingBottom = "13vh";
            MAIN_GARAGE_CONTAINER.appendChild(newItem);
            newItem.querySelector(".about-cars").addEventListener("click", () => {
                this.onClickDetails(item, battery);
            });
            newItem.querySelector(".route-cars").addEventListener("click", () => {
                this.onClickRouteCar(item, battery);
            });
        });
    }
    async setString(data) {
        const table = new Table();
        const newItem = document.createElement("section");
        newItem.classList.add("garage-item-string");
        newItem.innerHTML = `
                <table id="myTable">
                    <thead>
                        <tr>
                            <th>Число</th>
                            <th>Заряд</th>
                            <th>Скорость</th>
                            <th>t° батареи</th>
                            <th>U батареи</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Добавьте другие строки с данными здесь -->
                    </tbody>
                </table>
            `;
        MAIN_GARAGE_CONTAINER.classList.add("garage-string");
        MAIN_GARAGE_CONTAINER.style.paddingBottom = "13vh";
        MAIN_GARAGE_CONTAINER.appendChild(newItem);
        table.getTable();
    }

    addHeaderClickListener() {
        const garageString = document.getElementById("garageString");
        const garageTile = document.getElementById("garageTile");
        
        garageTile.classList.add("garage-button-active");

        if (garageString && garageTile) {
            garageString.addEventListener("click", () => {
                garageTile.classList.remove("garage-button-active");
                garageString.classList.add("garage-button-active");
                this.setStringView();
            });

            garageTile.addEventListener("click", () => {
                garageString.classList.remove("garage-button-active");
                garageTile.classList.add("garage-button-active");
                this.setTileView();
            });
        }
    }
    async setTileView() {
        if (!this.isTileView) {
            clearContainers([ MAIN_GARAGE_CONTAINER ])
            const autos = await this.getAll();
            this.setTile(autos);
            this.isTileView = true;
        }
    }

    async setStringView() {
        if (this.isTileView) {
            clearContainers([ MAIN_GARAGE_CONTAINER ])
            const autos = await this.getAll();
            this.setString(autos);
            this.isTileView = false;
        }
    }
    async onClickDetails(item, battery) {
        new Auto().getDetails(item, battery);
    }
    async onClickRouteCar(item, battery) {
        new RouteAuto(item, battery).onStart();
    }
}