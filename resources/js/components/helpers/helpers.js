const suffixes = ['', 'k', 'M'];

export function formatNumber (value) {
    let index = 0;

    while (value > 1000 && index < suffixes.length) {
        index++;
        value /= 1000;
    }


    return [value, suffixes[index]];
}
