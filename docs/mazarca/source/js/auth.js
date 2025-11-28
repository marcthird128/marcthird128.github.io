// Auth logic
function getAuthPassword() {
    let password = sessionStorage.getItem('adminPassword');
    if (!password) {
        const raw = prompt("Password?");
        if (!raw) {
            alert("Password required!");
            location.reload();
            return null;
        };
        password = btoa(raw);
        sessionStorage.setItem('adminPassword', password);
    };
    return password;
};

async function authenticatedFetch(url, options = {}) {
    const password = getAuthPassword();
    if (!password) return null;
    const headers = {
        'Authorization': password,
        ...options.headers
    };
    try {
        const res = await fetch(url, { ...options, headers });
        if (res.status === 401) {
            sessionStorage.removeItem('adminPassword');
            alert("Unauthorized. Please re-enter password.");
            location.reload();
            return null;
        };
        return res;
    } catch (err) {
        alert("Network error: " + err.message);
        throw err;
    };
};