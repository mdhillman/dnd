export const COOKIE_NAME = 'theia-access-codes';

export const setCookie = (value: string) => {
    const d = new Date();

    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    document.cookie = COOKIE_NAME + "=" + value + ";" + expires + ";path=/";
}

export const removeCookie = () => {
    let expires = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = COOKIE_NAME + "=;" + expires + ";path=/";
     window.open('/');
}

export const getCodesFromCookie = (): string[] => {
    let name = COOKIE_NAME + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            const value = c.substring(name.length, c.length);
            return value.split(',');
        }
    }
    return [];
}

export const addCodeToCookie = (code: string) => {
    const existingCodes = getCodesFromCookie();
    if(!existingCodes.includes(code)) {
        existingCodes.push(code);
        setCookie(existingCodes.join(','));
    }
}