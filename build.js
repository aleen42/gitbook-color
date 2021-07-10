const fs = require('fs');
const path = require('path');
const presets = require('./preset');

['light', 'dark'].forEach(mode => fs.writeFileSync(path.resolve(__dirname, `dist/${mode}.css`), presets()[mode], 'utf8'));
