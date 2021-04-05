module.exports = {
    purge: [
        './resources/js/**/*.tsx',
        './resources/js/**/*.ts',
        './resources/views/**/*.php',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            fontSize: {},
            spacing: {},
            boxShadow: {},
            colors: {
                "black": "#24292E",
            }
        },
    },
    plugins: [],
};
