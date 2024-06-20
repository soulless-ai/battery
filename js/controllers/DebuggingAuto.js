import { MAIN_AUTO_DEBUGGING_CONTAINER,
    MAIN_AUTH_CONTAINER,
    MAIN_GARAGE_CONTAINER,
    MAIN_AUTO_DETAILS_CONTAINER,
    MAIN_AUTO_ROUTE_CONTAINER,
    MAIN_ADD_EVM_PRO_CONTAINER,
    MAIN_USERS_CONTROLLER_CONTAINER,
    MAIN_MAP_CONTAINER,
    MAIN_PERSONAL_OFFICE_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { MainHeader }from "./MainHeader.js";

import { Auto } from "./Auto.js";
import { Filter } from "./Filter.js";

export class DebuggingAuto {
    constructor(evmPro, battery) {
        this.evmPro = evmPro;
        this.battery = battery;
    }

    async onStart() {
        new MainHeader(
            `<button id="backDebuggingButton" class="main-header-back-button">
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 15L1 8L8 1" stroke="#C0C3C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>Отладка`,
            `<button id="debuggingDataGetButton">
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
        newItem.classList.add("debugging-evm-pro");
        newItem.innerHTML = `
            <div class="debugging-evm-pro-filter-buttons">
                ${new Filter().getFilterButtons()}
            </div>
            <div class="debugging-evm-pro-buttons">
                <input type="text" name="date_from" value="09.04.2024 00:00" id="debuggingEvmProButtonFirst" class="hasDatepicker">
                <input type="text" name="date_to" value="09.04.2024 23:59" id="debuggingEvmProButtonSecond" class="hasDatepicker">
            </div>
            <div class="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="display: block;"><div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"><a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="Prev"><span class="ui-icon ui-icon-circle-triangle-w">Prev</span></a><a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="Next"><span class="ui-icon ui-icon-circle-triangle-e">Next</span></a><div class="ui-datepicker-title"><span class="ui-datepicker-month">August</span>&nbsp;<span class="ui-datepicker-year">2024</span></div></div><table class="ui-datepicker-calendar"><thead><tr><th scope="col" class="ui-datepicker-week-end"><span title="Sunday">Su</span></th><th scope="col"><span title="Monday">Mo</span></th><th scope="col"><span title="Tuesday">Tu</span></th><th scope="col"><span title="Wednesday">We</span></th><th scope="col"><span title="Thursday">Th</span></th><th scope="col"><span title="Friday">Fr</span></th><th scope="col" class="ui-datepicker-week-end"><span title="Saturday">Sa</span></th></tr></thead><tbody><tr><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="1">1</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="2">2</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="3">3</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="4">4</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="5">5</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="6">6</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="7">7</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="8">8</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="9">9</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="10">10</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="11">11</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="12">12</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="13">13</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="14">14</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="15">15</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="16">16</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="17">17</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="18">18</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="19">19</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="20">20</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="21">21</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="22">22</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="23">23</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="24">24</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="25">25</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="26">26</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="27">27</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="28">28</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="29">29</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="30">30</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="7" data-year="2024"><a class="ui-state-default" href="#" aria-current="false" data-date="31">31</a></td></tr></tbody></table></div>
            <div class="debugging-evm-pro-content">
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
            MAIN_AUTO_DEBUGGING_CONTAINER,
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
            $("#debuggingEvmProButtonFirst").datetimepicker();
            $("#debuggingEvmProButtonSecond").datetimepicker();
        });
    }
    async onClickBack() {
        document.querySelector("#backDebuggingButton").addEventListener("click", () => {
            new Auto().getDetails(this.evmPro, this.battery);
        });
    }
}