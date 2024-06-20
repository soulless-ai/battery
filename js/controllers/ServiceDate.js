export class ServiceDate {
    constructor(auto) {
        this.auto = auto;
    }

    async onStart() {
        await this.get(this.auto.id);
        this.render();
    }
}