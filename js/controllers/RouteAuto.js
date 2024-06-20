import { MAIN_AUTO_ROUTE_CONTAINER,
    MAIN_AUTH_CONTAINER,
    MAIN_GARAGE_CONTAINER,
    MAIN_AUTO_DETAILS_CONTAINER,
    MAIN_ADD_EVM_PRO_CONTAINER,
    MAIN_USERS_CONTROLLER_CONTAINER,
    MAIN_MAP_CONTAINER,
    MAIN_PERSONAL_OFFICE_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { MainHeader }from "./MainHeader.js";

import { Auto } from "./Auto.js";
import { Filter } from "./Filter.js";

export class RouteAuto {
    constructor(evmPro, battery) {
        this.evmPro = evmPro;
        this.battery = battery;
    }

    async onStart() {
        new MainHeader(
            `<button id="backRouteButton" class="main-header-back-button">
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 15L1 8L8 1" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>Маршрут ${this.evmPro.name}`,
            `<button id="routeDataGetButton">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C12.5523 2 13 2.44772 13 3V14.5858L16.2929 11.2929C16.6834 10.9024 17.3166 10.9024 17.7071 11.2929C18.0976 11.6834 18.0976 12.3166 17.7071 12.7071L12.7079 17.7063C12.5268 17.8878 12.2765 18 12 18C11.7271 18 11.4798 17.8907 11.2994 17.7135C11.2972 17.7114 11.295 17.7093 11.2929 17.7071L6.29289 12.7071C5.90237 12.3166 5.90237 11.6834 6.29289 11.2929C6.68342 10.9024 7.31658 10.9024 7.70711 11.2929L11 14.5858L11 3C11 2.44772 11.4477 2 12 2ZM5 21C5 20.4477 5.44772 20 6 20H18C18.5523 20 19 20.4477 19 21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21Z" fill="white"/>
                </svg>
                <span class="link-text">Выгрузить данные</span>
            </button>`
        ).onStart();
        this.render();
    }
    async render() {
        const newItem = document.createElement("section");
        newItem.classList.add("route-evm-pro");
        newItem.innerHTML = `
            <div class="route-evm-pro-filter-buttons">
                ${new Filter().getFilterButtons()}
            </div>
            <div class="route-evm-pro-buttons">
                <input type="text" name="date_from" value="09.04.2024 00:00" id="routeEvmProButtonFirst" class="hasDatepicker">
                <input type="text" name="date_to" value="09.04.2024 23:59" id="routeEvmProButtonSecond" class="hasDatepicker">
            </div>
            <div class="route-evm-pro-content">
                <iframe src="https://q.apocalyptic.world/testmap.html" width="100%" height="600" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
            `;
        clearContainers([
            MAIN_AUTH_CONTAINER,
            MAIN_GARAGE_CONTAINER,
            MAIN_AUTO_DETAILS_CONTAINER,
            MAIN_ADD_EVM_PRO_CONTAINER,
            MAIN_USERS_CONTROLLER_CONTAINER,
            MAIN_AUTO_ROUTE_CONTAINER,
            MAIN_MAP_CONTAINER,
            MAIN_PERSONAL_OFFICE_CONTAINER
        ]);
        MAIN_AUTO_ROUTE_CONTAINER.style.paddingBottom = "13vh";
        MAIN_AUTO_ROUTE_CONTAINER.appendChild(newItem);
        this.onClickBack();
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: 'Предыдущий',
            nextText: 'Следующий',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
        /* Локализация timepicker */
        $.timepicker.regional['ru'] = {
            timeOnlyTitle: 'Выберите время',
            timeText: 'Время',
            hourText: 'Часы',
            minuteText: 'Минуты',
            secondText: 'Секунды',
            millisecText: 'Миллисекунды',
            timezoneText: 'Часовой пояс',
            currentText: 'Сейчас',
            closeText: 'Закрыть',
            timeFormat: 'HH:mm',
            amNames: ['AM', 'A'],
            pmNames: ['PM', 'P'],
            isRTL: false
        };
        $.timepicker.setDefaults($.timepicker.regional['ru']);
        $(function(){
            $("#routeEvmProButtonFirst").datetimepicker();
            $("#routeEvmProButtonSecond").datetimepicker();
        });
    }
    async onClickBack() {
        document.querySelector("#backRouteButton").addEventListener("click", () => {
            new Auto().getDetails(this.evmPro, this.battery);
        });
    }
}