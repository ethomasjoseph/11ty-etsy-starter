const path = require('path');
module.exports = {
    plugins: {
        tailwindcss: {
            config: path.join(__dirname, 'tailwind.config.js'),
        },
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
}