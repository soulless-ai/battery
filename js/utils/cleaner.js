export const clearContainer = (container) => {
    // Удаляем все дочерние элементы из контейнера
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
export const clearContainers = (containers) => {
    if (!Array.isArray(containers)) {
        containers = [containers];
    }
    containers.forEach(container => {
        if (container) {
            clearContainer(container);
            container.style.minHeight = "0px"
            container.style.margin = "0px";
            container.style.paddingBottom = "0px";
        }
    });
}