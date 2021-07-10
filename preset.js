/* eslint-disable */
const colors = require('@primer/primitives').default.colors_v2;

const isARR = v => Array.isArray(v) || ({}).toString.call(v) === '[object Array]'
const isOBJ = v => ({}).toString.call(v) === '[object Object]';
const splitCamelCase = str => str.replace(/[A-Z]/g, v => `-${v.toLowerCase()}`);

function generate(presets) {
    return flatten(presets, '--color');

    function flatten(values, prefix) {
        return Object.entries(values).reduce((result, [sub, value]) => {
            sub = splitCamelCase(sub);

            return result.concat(
                isOBJ(value) ? flatten(value, `${prefix}-${sub}`)
                    : isARR(value) ? value.map((v, i) => `${prefix}-${sub}-${i}: ${v}`)
                    : `${prefix}-${sub}: ${value}`
            );
        }, []);
    }
}

function css(mode, params) {
    const preset = {light: '255, 255, 255', dark: '13, 17, 23'};
    const reversed = mode === 'light' ? 'dark': 'light';

    // use light mode by default
    return `${mode === 'dark' ? '' : ':root, '}[data-color-mode=${mode}] {
  ${generate({
        ...colors[mode],
        bookTheme: {light: '#a10000', dark: '#f76b6b'}[mode],
        bookBorder: `rgba(${preset[reversed]}, 0.2)`,
        bookHeaderBg: `rgba(${preset[mode]}, 0.7)`,
        bookSummary: {
            bg: `rgba(${preset[mode]}, 0.45)`,
            border: `rgba(${preset[mode]}, 0.2)`,
            hoverBorder: `rgba(${preset[reversed]}, 0.2)`,
        },
        ...params,
    }).join(';\n  ')}
}`;
}

module.exports = params => Object.fromEntries(['light', 'dark'].map(mode => [mode, css(mode, params)]))
