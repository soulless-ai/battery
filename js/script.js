import { Auth } from "./controllers/Auth.js";

document.addEventListener("DOMContentLoaded", async function() {
    new Auth().onStart();
});