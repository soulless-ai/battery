export class Battery {
    constructor() {
        this.gradient = `green`;
        this.batteryColor = `green`;
    }
    getBattery(width) {
        if (width < 25) {
            this.batteryColor = `rgb(255, 0, 0)`;
            this.gradient = `linear-gradient(90deg, rgba(255, 55, 34, 0.6) 0%, rgba(255, 55, 34, 0.12) 99.85%)`; // Красный
        } else if (width < 60) {
            this.batteryColor = `rgba(166,167,0,1)`;
            this.gradient = `linear-gradient(90deg, rgba(255, 203, 44, 0.6) 0%, rgba(255, 203, 44, 0.12) 99.85%)`; // Желтый
        } else {
            this.batteryColor = `rgb(33 133 17 / 88%)`;
            this.gradient = `linear-gradient(90deg, rgba(41, 187, 74, 0.6) 0%, rgba(41, 187, 74, 0.12) 99.85%)` // Зеленый
        }
        return `
            <section class="battery_main">
                <section class="battery_indicator"> 
                    <svg width="27" height="36" viewBox="0 0 27 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.6" d="M15.5046 15.5568L15.3996 16.6522H16.5H24.7803L10.326 32.9918L11.4944 22.0189L11.6121 20.913H10.5H2.11555L16.6918 3.16802L15.5046 15.5568Z" stroke="white" stroke-width="2"/>
                    </svg>
                    <div>
                        <section style="width: ${width}%">
                        </section>
                    </div>
                </section>
                <section class="battery_head"></section>
            </section>`
    }
    getGradient() {
        return this.gradient;
    }
    
    getBatteryColor() {
        return this.batteryColor;
    }
}