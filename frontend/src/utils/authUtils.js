// authUtils.js

// Fungsi untuk menghapus token dari cookie
export const deleteTokenFromCookie = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Fungsi untuk menghapus token dari local storage
export const deleteTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
};

// Fungsi-fungsi tambahan terkait otentikasi dapat ditambahkan di sini sesuai kebutuhan
