const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    endpoints: {
        nasa: {
            apod: '/nasa/apod',
        },
        auth: {
            register: '/register',
            login: '/login',
            logout: '/logout',
            protected: '/protected',
        },
    }
};

export default config;