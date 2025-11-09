export function capitalize(str) {
    return str
        .trim()
        .split(/\s+/)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}
