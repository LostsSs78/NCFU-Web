function initHandler(){
    // Функции для работы с cookies
    function setCookie(name, value) {
        document.cookie = name + "=" + value + "; path=/";
    }

    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    function deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
    }    

    // Функции для работы с Local Storage и Session Storage
    function setLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    function getLocalStorage(key) {
        return localStorage.getItem(key);
    }

    function deleteLocalStorage(key) {
        localStorage.removeItem(key);
    }

    function setSessionStorage(key, value) {
        sessionStorage.setItem(key, value);
    }

    function getSessionStorage(key) {
        return sessionStorage.getItem(key);
    }

    function deleteSessionStorage(key) {
        sessionStorage.removeItem(key);
    }

    // Обработчики событий для кнопок Cookies
    $('#set-cookie').click(function() {
        const name = $('#input-cookie').val();
        const value = $('#cookie-val').val();
        setCookie(name, value);
        alert('Cookie установлено');
    });

    $('#del-cookie').click(function() {
        const $inputName = $('#input-cookie');
        const $inputValue = $('#cookie-val');
        const name = $inputName.val();
        deleteCookie(name);
        $inputName.val('');
        $inputValue.val('');
        alert('Cookie удалено');
    });

    // Обработчики событий для кнопок Local Storage
    $('#set-lst').click(function() {
        const key = $('#input-lst').val();
        const value = $('#lst-val').val();
        setLocalStorage(key, value);
        alert('Local Storage установлено');
    });

    $('#del-lst').click(function() {
        const $inputName = $('#input-lst'); 
        const $inputValue = $('#lst-val');
        const key = $inputName.val();
        deleteLocalStorage(key);
        $inputName.val('');
        $inputValue.val('');
        alert('Local Storage удалено');
    });

    // Обработчики событий для кнопок Session Storage
    $('#set-sst').click(function() {
        const key = $('#input-sst').val();
        const value = $('#sst-val').val();
        setSessionStorage(key, value);
        alert('Session Storage установлено');
    });

    $('#del-sst').click(function() {
        const $inputName = $('#input-sst');
        const $inputValue = $('#sst-val');
        const key = $inputName.val();
        deleteSessionStorage(key);
        $inputName.val('');
        $inputValue.val('');
        alert('Session Storage удалено');
    });
}