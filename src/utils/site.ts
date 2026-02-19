export const getAssetPath = (path: string) => {
    // In production (GitHub Pages), we need to prepend the repository name
    // because the site is hosted at https://username.github.io/FuturePrint/
    const isProd = process.env.NODE_ENV === 'production';
    if (isProd && path.startsWith('/')) {
        return `/FuturePrint${path}`;
    }
    return path;
};
