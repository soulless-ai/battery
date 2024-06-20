export class User {
    constructor() {}

    async get(login, password) {
        try {
            const response = await fetch("exampleUsers.json");
            const data = await response.json();

            for (const user of data) {
                if (user.login === login && user.password === password) {
                    return user;
                }
            }

            console.log("Пользователь не найден.");
            return null;
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            return null;
        }
    }
}