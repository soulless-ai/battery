import { MAIN_MAP_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { PupUp } from "./PupUp.js";

export class SystemError {
    constructor(auto) {
        this.auto = auto;
        this.errorList = [];
    }
    async onStart() {
        await this.get(this.auto.id);
        this.render();
    }
    async get() {
        try {
            const response = await fetch("exampleErrors.json");
            const data = await response.json();
            if (this.auto && this.auto.id) {
                data.forEach(item => {
                    if (item.autoId === this.auto.id) {
                        this.errorList.push(item);
                    }
                });
            } else {
                data.forEach(item => {
                    this.errorList.push(item);
                });
            }
            return ``;
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            throw error;
        }   
    }
    async render() {
        const errorsHTML = !this.errorList
            ? `
                <li class="system-error-list">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5259 18.5L12.8657 3.5C12.4808 2.83333 11.5185 2.83333 11.1336 3.5L2.47336 18.5C2.08846 19.1667 2.56958 20 3.33938 20H20.6599C21.4297 20 21.9108 19.1667 21.5259 18.5Z" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M11.9502 16H12.0502V16.1H11.9502V16Z" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 9V13" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>                
                    <p>${this.errorList.errorName}</p>
                </li>
            `: !Array.isArray(this.errorList)
                ? `
                    <li class="system-error-list">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5259 18.5L12.8657 3.5C12.4808 2.83333 11.5185 2.83333 11.1336 3.5L2.47336 18.5C2.08846 19.1667 2.56958 20 3.33938 20H20.6599C21.4297 20 21.9108 19.1667 21.5259 18.5Z" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.9502 16H12.0502V16.1H11.9502V16Z" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 9V13" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                
                        <p>${value.errorName}</p>
                    </li>
                `: await Promise.all(this.errorList.map(async (value) => {
                    return `
                        <li class="system-error-list">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.5259 18.5L12.8657 3.5C12.4808 2.83333 11.5185 2.83333 11.1336 3.5L2.47336 18.5C2.08846 19.1667 2.56958 20 3.33938 20H20.6599C21.4297 20 21.9108 19.1667 21.5259 18.5Z" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11.9502 16H12.0502V16.1H11.9502V16Z" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 9V13" stroke="#FF3722" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>                
                        <p>${value.errorName}</p>
                    </li>`
            })).then(htmlArray => htmlArray.join(''));
    
        new PupUp(
            `Ошибка системы`,
            `
                <form id="systemErrorForm">
                    <ul>
                        ${errorsHTML}
                    </ul>
                    <p>Попробуйте сбросить ошибки. Если ошибки опять возникнут, пожалуйста, позвоните в службу поддержки по номеру:</p>
                    <a href="tel:+74951222296">+7 (495) 122 22 96</a>
                    <button>Сбросить ошибки</button>
                </form>
            `).onStart();
    }
}