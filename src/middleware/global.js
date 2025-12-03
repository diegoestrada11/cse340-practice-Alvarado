/**
 * Helper function to get the current greeting based on the time of day.
 */
const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        return 'Good Morning!';
    }
    if (currentHour < 18) {
        return 'Good Afternoon!';
    }
    return 'Good Evening!';
};

/**
 * Middleware to add important local variables to res.locals for all templates.
 */
const addImportantLocalVariables = (req, res, next) => {
    // Set current year for use in templates
    res.locals.currentYear = new Date().getFullYear();

    // Make NODE_ENV available to all templates (lowercased)
    res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

    // Make req.query available to all templates (shallow copy)
    res.locals.queryParams = { ...req.query };

    next();
};

/**
 * Middleware to add optional local variables to res.locals for all templates.
 */
const addOptionalLocalVariables = (req, res, next) => {
    // Greeting wrapped in a paragraph tag (as requested)
    res.locals.greeting = `<p>${getCurrentGreeting()}</p>`;

    // Randomly assign a theme class to the body
    const themes = ['blue-theme', 'green-theme', 'red-theme'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    res.locals.bodyClass = randomTheme;

    next();
};

/**
 * Simple request logging middleware
 */
const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

export {
    addImportantLocalVariables,
    addOptionalLocalVariables,
    requestLogger
};
