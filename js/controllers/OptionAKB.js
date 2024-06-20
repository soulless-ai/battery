import { MAIN_MAP_CONTAINER } from "../utils/containers.js";
import { clearContainers } from "../utils/cleaner.js";

import { PupUp } from "./PupUp.js";

export class OptionsAKB {
    constructor(evmList) {
        this.evmList = evmList;
    }
    async onStart() {
        this.render();
    }
    async render() {
        new PupUp (
            `Настройка обогрева АКБ`,
            `
                <button id="akbOnOffGetButton">Включить / выключить</button>
                <button id="akbScheduleGetButton">Настроить расписание</button>
            `).onStart();
        this.onClickControllerOnOff();
        this.onClickControllerSchedule();
    }

    async onClickControllerOnOff() {
        document.querySelector("#akbOnOffGetButton").addEventListener("click", () => {
            new PupUp (
                `Включить / выключить обогрев АКБ`,
                `
                    <form id="akbOptionsForm">
                        <label>Выключить</label>
                        <label class="switch">
                            <input id="" type="checkbox" ${this.evmList.boolAKB ? "checked" : ""}>
                            <span class="slider"></span>
                        </label>
                        <button id="akbOnOffUpdateButton">Сохранить</button>
                    </form>
                `).onStart();
        });
    }
    async onClickControllerSchedule() {
        document.querySelector("#akbScheduleGetButton").addEventListener("click", () => {
            const saveChanges = (event) => {
                event.preventDefault();
                // Здесь можно добавить логику сохранения выбранных значений
                // Например, можно получить значения из радиокнопок и сохранить их
                // Например, с помощью document.querySelector('input[name="mondayAKB"]:checked').value
                // После этого можно закрыть Pop-up окно
                console.log("Изменения сохранены");
                // Закрываем Pop-up окно
                popup.close();
            };
    
            const popup = new PupUp(
                `Расписание включения обогрева АКБ`, 
                `
                    <form id="scheduleForm">
                        <div>
                            <label class="checkbox-container">
                                <input type="checkbox" id="mondayAKB" name="day" value="monday">
                                <span class="checkmark"></span>
                            </label>
                            <label for="mondayAKB" class="checkbox-label">Понедельник</label><br>
                        </div>
                        <div>
                            <label class="checkbox-container">
                                <input type="checkbox" id="tuesdayAKB" name="day" value="tuesday">
                                <span class="checkmark"></span>
                            </label>
                            <label for="tuesdayAKB" class="checkbox-label">Вторник</label><br>
                        </div>
                        <div>
                            <label class="checkbox-container">
                                <input type="checkbox" id="wednesdayAKB" name="day" value="wednesday">
                                <span class="checkmark"></span>
                            </label>
                            <label for="wednesdayAKB" class="checkbox-label">Среда</label><br>
                        </div>
                        <div>
                            <label class="checkbox-container">
                                <input type="checkbox" id="thursdayAKB" name="day" value="thursday">
                                <span class="checkmark"></span>
                            </label>
                            <label for="thursdayAKB" class="checkbox-label">Четверг</label><br>
                        </div>
                        <div>
                            <label class="checkbox-container">
                                <input type="checkbox" id="fridayAKB" name="day" value="friday">
                                <span class="checkmark"></span>
                            </label>
                            <label for="fridayAKB" class="checkbox-label">Пятница</label><br>
                        </div>
                        <div>
                            <label class="checkbox-container">
                                <input type="checkbox" id="saturdayAKB" name="day" value="saturday">
                                <span class="checkmark"></span>
                            </label>
                            <label for="saturdayAKB" class="checkbox-label">Суббота</label><br>
                        </div>
                        <div>
                            <label class="checkbox-container">
                                <input type="checkbox" id="sundayAKB" name="day" value="sunday">
                                <span class="checkmark"></span>
                            </label>
                            <label for="sundayAKB" class="checkbox-label">Воскресенье</label><br>
                        </div>
                        <button type="submit">Сохранить изменения</button>
                    </form>
                `).onStart();
            document.getElementById("scheduleForm").addEventListener("submit", saveChanges);
        });
    }
}