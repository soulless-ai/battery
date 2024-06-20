
export class Filter {
    constructor() {
        this.debuggingAndRouteButtons = [
            { id: "all", label: "Все" },
            { id: "charge", label: "Заряд" },
            { id: "speed", label: "Скорость" },
            { id: "inverterTemp", label: "t° инвертера" },
            { id: "motorTemp", label: "t° мотора" },
            { id: "batteryTemp", label: "t° батареи" },
            { id: "batteryVoltage", label: "U батареи" },
            { id: "inverterVoltage", label: "U инвертера" },
            { id: "cellVoltage", label: "U ячеек" },
            { id: "batteryCurrent", label: "I батареи" },
            { id: "batteryPower", label: "P батареи" },
            { id: "inverterPower", label: "P инвертера" },
            { id: "12V_Battery", label: "АКБ 12В" },
            { id: "mileage", label: "Пробег" },
            { id: "status", label: "Статус" },
            { id: "errors", label: "Ошибки" }
        ];
    }

    getFilterButtons() {
        let buttonsHTML = "";
        this.debuggingAndRouteButtons.forEach(button => {
            buttonsHTML += `<button id="${button.id}" value="${button.label}">${button.label}</button>`;
        });
        return buttonsHTML;
    }
}