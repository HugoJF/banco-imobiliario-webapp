const suffixes = ['', 'k', 'M', 'B'];

export function formatNumber (value: number) {
    let index = 0;

    while (value > 1000 && index < suffixes.length) {
        index++;
        value /= 1000;
    }


    return [value, suffixes[index]];
}
