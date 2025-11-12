export function capitalize(str) {
    return str
        .trim()
        .split(/\s+/)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

export function isEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}

export function formatDate(date, options = { weekday: "long", year: "numeric", month: "short", day: "numeric" }) {
    // hour: "2-digit";
    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-US", options);
}
