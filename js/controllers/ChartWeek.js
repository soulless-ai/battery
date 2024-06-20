export class ChartWeek {
    constructor() {
        this.daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    }
    
    getChartWeek(item) {
        let chartData = [
            item.monday,
            item.tuesday,
            item.wednesday,
            item.thursday,
            item.friday,
            item.saturday,
            item.sunday
        ];
        let currentDate = new Date();
        let currentDay = currentDate.getDay(); 
    
        let reorderedDaysOfWeek = [];
        for (let i = currentDay; i < this.daysOfWeek.length; i++) {
            reorderedDaysOfWeek.push(this.daysOfWeek[i]);
        }
        for (let i = 0; i < currentDay; i++) {
            reorderedDaysOfWeek.push(this.daysOfWeek[i]);
        }
    
        let reorderedChartData = [];
        for (let i = currentDay; i < chartData.length; i++) {
            reorderedChartData.push(chartData[i]);
        }
        for (let i = 0; i < currentDay; i++) {
            reorderedChartData.push(chartData[i]);
        }
    
        let maxValue = Math.max(...reorderedChartData);
    
        let html = `<ul id="chartWeek">`;
    
        for (let i = 0; i < reorderedDaysOfWeek.length; i++) {
            let chartContainer = document.createElement("div");
            chartContainer.classList.add("chart");
    
            let bar = document.createElement("div");
            bar.classList.add("bar");
    
            let barActive = (reorderedChartData[i] / maxValue) * 100;
            bar.style.height = `${barActive}%`;
            bar.innerHTML = `${this.getMaxValue(reorderedChartData[i], maxValue)}`;
            chartContainer.appendChild(bar);
    
            let li = document.createElement("li");
            li.classList.add('chart-container')
            if (reorderedChartData[i] === maxValue) li.classList.add('active-chart-container');
            li.dataset.value = reorderedChartData[i];
            li.innerHTML = `${chartContainer.outerHTML}<h6>${reorderedDaysOfWeek[i]}</h6>`;
            html += li.outerHTML;
        }
        html += `</ul>`;
        
        return html;
    }
    
    getMaxValue(i, j) {
        if (i == j) return `<h6 class="active-chart-value">${j}</h6>`;
        else return ``;
    }
    
    async setListener() {
        document.querySelectorAll(".chart-container").forEach(chart => {
            chart.addEventListener("click", (event) => {
                document.querySelectorAll('.active-chart-container').forEach(item => {
                    item.classList.remove('active-chart-container');
                });
                chart.classList.add('active-chart-container');
                this.updateActiveChartValue(chart, chart.dataset.value);
            });
        });
    }

    async updateActiveChartValue(element, value) {
        let activeChartValue = document.querySelectorAll('.active-chart-value');
        if (activeChartValue) {
            activeChartValue.forEach(item => {
                item.remove();
            });
        }
        if (element) {
            let bar = element.querySelector('.bar');
            if (bar) bar.insertAdjacentHTML('beforeend', `<h6 class="active-chart-value">${value}</h6>`);
        }
    }
}