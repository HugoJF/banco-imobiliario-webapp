const suffixes = ['', 'k', 'M', 'B'];

export function E(exp: number) {
    return 10 ** exp;
}

export function round(value: number, precision: number) {
    return Math.round(value * E(precision)) / E(precision);
}

export function formatNumber(value: number) {
    let index = 0;

    while (value > 1000 && index < suffixes.length) {
        index++;
        value /= 1000;
    }


    return [round(value, 2), suffixes[index]];
}

export function clamp(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min);
}

