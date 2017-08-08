function valueInRange(value, min, max) {
    return (value >= min) && (value <= max);
}

export function rectOverlap(A, B) {
    const xOverlap = valueInRange(A.x, B.x, B.x + B.width) ||
        valueInRange(B.x, A.x, A.x + A.width);

    const yOverlap = valueInRange(A.y, B.y, B.y + B.height) ||
        valueInRange(B.y, A.y, A.y + A.height);

    return xOverlap && yOverlap;
}
