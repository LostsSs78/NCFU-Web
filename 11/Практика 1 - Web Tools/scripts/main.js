//прослушивание события по кнопке "продолжить"
const button = $("#input-var-btn").on("click", getVar);
const inputVarEl = $('#input-var').keydown(event => {
    if(event.key === "Enter"){
        event.preventDefault();
        getVar()
    }
});

//получение значения вариант
function getVar() {
    const inputVar = $("#input-var").val();
    if(isNaN(inputVar) || !inputVar || inputVar.indexOf('.') !== -1 || Number(inputVar) <= 0) {
        alert("Номер по журналу должен быть целым, валидным числом");
        return;
    }

    //убрать выбор варианта, показывать варианты по заданию
    $('.select-var-node').remove();

    //отображение вариантов заданий
    const currentVar = getTaskByNum(inputVar);
    const varContent = createVarContent(inputVar, currentVar);
    $('main').append(varContent);

    //инициализация скрипта
    initializeScript();
}

// Функция, которая должна выполниться после добавления элемента
function initializeScript() {
    initPrism();
    initHandler();
}

function getTaskByNum(varNum){
    const vars = [
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Дан элемент div с display: flex. Отобразите flex в инструментах разработчика,
                Укажите свойства flex, чтобы элементы были расположены на одинаковом расстоянии друг от друга. Используйте только свойства
                flex;`
            },
            task_2: {
                text: `Дан элемент div, стилизуйте его дочерний элемент таким образом, чтобы элемент был круглым, с монотонной обводкой 1 пиксель фиолетового цвета, диаметр элемента 100 пикселей, цвет зеленный.
                Добавьте также в отчет историю изменения стилей элемента.`
            },
            task_3: {
                code: `
                    debugger;
                    function greetUser(name) {
                        let hello = "Привет, ";
                        hello += name;
                        logMessage(hello);
                    }

                    function logMessage(message) {
                        console.log(message);
                    }

                    const userName = "Андрей";
                    greetUser(userName);
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/posts')
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Дан элемент div с display: flex.
                Используйте свойства flex, чтобы дочерние элементы были выровнены по центру как по горизонтали, так и по вертикали. 
                Используйте свойства justify-content и align-items.`
            },
            task_2: {
                text: `Дан элемент div, стилизуйте его дочерний элемент таким образом, чтобы элемент имел радиус 50%,
                с пунктирной обводкой 3 пикселя красного цвета, размер элемента 150х150 пикселей, цвет фона синий. 
                Добавьте также в отчет историю изменения стилей элемента.`
            },
            task_3: {
                code: `
                    debugger;
                    function calculateSum(a, b) {
                        let hello = a + b;
                        logResult(hello);
                    }
    
                    function logResult(value) {
                        console.log('Результат: ', value);
                    }
    
                    const num1 = 5;
                    const num2 = 10;
                    calculateSum(num1, num2);
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            title: 'foo',
                            body: 'bar',
                            userId: 1,
                        }),
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Дан элемент div с display: flex. Используйте свойства flex-wrap и justify-content, чтобы элементы автоматически переносились на новую строку, а также располагались по центру каждой строки. (Вы можете использовать режим адаптивного дизайна, чтобы проверить перенос элементов, маштабируя окно).`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел радиус 50%, пунктирную обводку 3 пикселя красного цвета, размер 150x150 пикселей, и фоновый цвет синий. Добавьте также в отчет историю изменения стилей элемента.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Hello, ";
                    function createMessage(name) {
                        hello += name;
                        logMessage(hello);
                    }
    
                    function logMessage(message) {
                        console.log("Message:", message);
                    }
    
                    const userName = "Olga";
                    createMessage(userName);
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        body: JSON.stringify({
                            title: 'foo',
                            body: 'bar',
                            userId: 1
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства justify-content и align-items, чтобы элементы flex-контейнера были выровнены по центру по горизонтали и вертикали.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел сплошную обводку 4 пикселя серого цвета, скругленные углы в 10px, и был 200x200 пикселей. Фоновый цвет — светло-зеленый.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Initial message";
                    function appendText(text) {
                        hello += " - " + text;
                        showMessage(hello);
                    }
    
                    function showMessage(msg) {
                        console.log("Output:", msg);
                    }
    
                    const extraText = "new content";
                    appendText(extraText);
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/posts/1', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: 1,
                            title: 'Updated title',
                            body: 'Updated body',
                            userId: 1
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства flex-direction и justify-content, чтобы элементы flex-контейнера были расположены вертикально и выровнены по началу основной оси.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел двойную обводку 5 пикселей зеленого цвета, радиус скругления 20px, и был 120x120 пикселей. Фоновый цвет — оранжевый.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Initial state";
                    function updateHello(value) {
                        hello = value;
                        logHello(hello);
                    }
    
                    function logHello(updatedValue) {
                        console.log("Updated value:", updatedValue);
                    }
    
                    const newValue = "Final state";
                    updateHello(newValue);
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/posts/1', {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Post deleted successfully');
                        } else {
                            console.error('Failed to delete post');
                        }
                    })
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства justify-content и align-items, чтобы элементы flex-контейнера были распределены равномерно по горизонтали и прижаты к началу контейнера.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел сплошную обводку 2 пикселя синего цвета, скругленные углы в 15px, и был 180x180 пикселей. Фоновый цвет — желтый.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Start message";
                    function modifyHello() {
                        hello = hello + " - modified";
                        printHello(hello);
                    }
    
                    function printHello(msg) {
                        console.log("Modified Hello:", msg);
                    }
    
                    modifyHello();
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/comments', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: 'sample comment',
                            email: 'example@example.com',
                            body: 'This is a test comment.',
                            postId: 1
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства flex-direction и justify-content, чтобы элементы flex-контейнера были выстроены по вертикали и равномерно распределены по всей высоте контейнера.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел точечную обводку 3 пикселя черного цвета, радиус скругления 25px, и был 140x140 пикселей. Фоновый цвет — красный.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Hello world";
                    function appendWorld() {
                        hello += " - and beyond";
                        displayHello(hello);
                    }
    
                    function displayHello(message) {
                        console.log("Updated message:", message);
                    }
    
                    appendWorld();
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/users', {
                        method: 'GET',
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства flex-wrap и align-items, чтобы элементы flex-контейнера переносились на новую строку и были прижаты к центру контейнера по вертикали. (Вы можете использовать режим адаптивного дизайна, чтобы проверить перенос элементов, маштабируя окно).`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел двойную обводку 2 пикселя серого цвета, скругленные углы 5px, и был 160x160 пикселей. Фоновый цвет — фиолетовый.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Starting state";
                    function resetHello() {
                        hello = "Reset complete";
                        logHello(hello);
                    }
    
                    function logHello(value) {
                        console.log("Current value:", value);
                    }
    
                    resetHello();
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/posts/2', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: 2,
                            title: 'Updated post title',
                            body: 'Updated post body',
                            userId: 1
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства justify-content и align-items, чтобы элементы flex-контейнера были выровнены по правому краю и по нижнему краю контейнера.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел пунктирную обводку 4 пикселя розового цвета, скругленные углы в 20px, и был 130x130 пикселей. Фоновый цвет — бирюзовый.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Initial text";
                    function changeHello(newText) {
                        hello = newText;
                        displayMessage(hello);
                    }
    
                    function displayMessage(msg) {
                        console.log("New Hello:", msg);
                    }
    
                    changeHello("Hello updated");
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/posts/2', {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Post deleted successfully');
                        } else {
                            console.error('Failed to delete post');
                        }
                    })
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства flex-grow и flex-shrink, чтобы один элемент flex-контейнера занимал больше места, а другие оставались маленькими, но все элементы оставались в одной строке.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел сплошную обводку 5 пикселей черного цвета, углы с радиусом 50px, и был 150x150 пикселей. Фоновый цвет — оранжевый.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Greetings!";
                    function transformHello() {
                        hello = hello.toUpperCase();
                        logTransformedHello(hello);
                    }
    
                    function logTransformedHello(message) {
                        console.log("Transformed Hello:", message);
                    }
    
                    transformHello();
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/todos/1', {
                        method: 'GET'
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства justify-content и flex-direction, чтобы элементы flex-контейнера были выстроены по вертикали и распределены равномерно с отступами между ними.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел точечную обводку 1 пиксель серого цвета, радиус скругления 10px, и был 120x120 пикселей. Фоновый цвет — светло-синий.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Message to transform";
                    function reverseHello() {
                        hello = hello.split('').reverse().join('');
                        showReversedHello(hello);
                    }
    
                    function showReversedHello(reversed) {
                        console.log("Reversed Hello:", reversed);
                    }
    
                    reverseHello();
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/todos', {
                        method: 'POST',
                        body: JSON.stringify({
                            title: 'New Todo',
                            completed: false,
                            userId: 1
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства flex-basis и justify-content, чтобы один элемент flex-контейнера был шире, а остальные элементы были одинаковыми и располагались в центре контейнера.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел пунктирную обводку 3 пикселя красного цвета, скругленные углы в 30px, и был 170x170 пикселей. Фоновый цвет — светло-зеленый.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Initial message";
                    function addPrefixToHello() {
                        hello = "Prefix: " + hello;
                        printPrefixedHello(hello);
                    }
    
                    function printPrefixedHello(prefixed) {
                        console.log("Prefixed Hello:", prefixed);
                    }
    
                    addPrefixToHello();
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/comments/1', {
                        method: 'DELETE'
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log('Comment deleted successfully');
                        } else {
                            console.error('Failed to delete comment');
                        }
                    })
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства flex-flow и align-items, чтобы flex-элементы были выстроены по горизонтали, и каждый элемент был растянут по высоте контейнера.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел двойную обводку 2 пикселя зеленого цвета, радиус скругления 5px, и был 180x180 пикселей. Фоновый цвет — пурпурный.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Test message";
                    function updateHello(newText) {
                        hello = newText + " updated";
                        displayUpdatedHello(hello);
                    }
    
                    function displayUpdatedHello(updated) {
                        console.log("Updated Hello:", updated);
                    }
    
                    updateHello("New message");
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/users/2', {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: 2,
                            name: 'Updated User',
                            username: 'newuser',
                            email: 'newemail@example.com'
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства justify-content и align-items, чтобы элементы flex-контейнера были выровнены по диагонали — от верхнего левого угла к нижнему правому.`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел волнистую обводку 4 пикселя синего цвета, углы с радиусом 25px, и был 130x130 пикселей. Фоновый цвет — розовый.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Starting value";
                    function changeHello() {
                        hello = hello + " and modified";
                        showHello(hello);
                    }
    
                    function showHello(updatedHello) {
                        console.log("Modified Hello:", updatedHello);
                    }
    
                    changeHello();
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/photos/1', {
                        method: 'PATCH',
                        body: JSON.stringify({
                            title: 'Updated Photo Title'
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        },
        {
            task_1: {
                text: `Отобразите свойство flex в инструментах разработчика.<br>Используйте свойства flex-wrap и justify-content, чтобы элементы flex-контейнера автоматически переносились на новую строку и были выровнены по центру. (Вы можете использовать режим адаптивного дизайна, чтобы проверить перенос элементов, маштабируя окно).`
            },
            task_2: {
                text: `Стилизуйте дочерний элемент div так, чтобы он имел двойную обводку 6 пикселей темно-красного цвета, радиус скругления 40px, и был 160x160 пикселей. Фоновый цвет — голубой.`
            },
            task_3: {
                code: `
                    debugger;
                    let hello = "Initial value";
                    function modifyHello() {
                        hello = "Modified: " + hello.toLowerCase();
                        displayHello(hello);
                    }
    
                    function displayHello(result) {
                        console.log("Final Hello:", result);
                    }
    
                    modifyHello();
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            },
            task_4: {
                code: `
                    fetch('https://jsonplaceholder.typicode.com/albums', {
                        method: 'POST',
                        body: JSON.stringify({
                            userId: 1,
                            title: 'New Album'
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch(error => console.error('Ошибка:', error));
                `.replace(/ {20,20}/g, '').replace(/\n/, '')
            }
        }
    ];

    //расчет варианта
    const var_val = varNum % vars.length;
    return vars[var_val];
}

function createVarContent(varNum, varObj){
    return $(`
        <div class="var-content">
        <h1>Вариант №${varNum}</h1>
        <div class="task">
            <span id="var-1"><b>Задание №1</b><br>${varObj.task_1.text}</span>
                <div class="task-1-flex">
                    <img class="fruit" src="img/img1.png">
                    <img class="fruit" src="img/img2.png">
                    <img class="fruit" src="img/img3.png">
                </div>
        </div>
        
        <div class="task">
            <span id="var-1"><b>Задание №2</b><br>${varObj.task_2.text}</span>
            <div>
                <div class="task-2-object"></div>
            </div>
        </div>
        
        <div class="task">
            <span id="var-1"><b>Задание №3</b><br>Скопируйте данный js код во вкладку "Консоль", нажмите Enter чтобы его выполнить. Добавьте точки останова на все строки кода,
                зайдите во внутрь функции, поясните каждый шаг дебаггера. Добавьте также в отчет историю изменения переменной "hello" и логи, которые будет выводить код ниже в консоль.<br><br>
                Если код не получается вставить, напишите "Разрешить вставку" или "allow pasting" в консоль.
            </span>
            <pre><code class="language-js">${varObj.task_3.code}</code></pre>
        </div>
        
        <div class="task">
            <span id="var-1"><b>Задание №4</b><br>Задание требует интернет соединения!<br><br>Перейдите во вкладку "Сеть", отчистите историю запросов. Скопируйте данный js код во вкладку "Консоль", нажмите Enter чтобы его выполнить. Откройте вкладку "Сеть",
            Укажите тип запроса, по какому URL выполнился запроса, статус ответа от сервера и что означает данный статус ответа (Загуглите). Перечислите любые три заголовка ответа от сервера,
            Выполните запрос повторно, вызвав контексное меню - "Повторить отправку". Добавье также в отчет скрин данных, который вернул запрос в консоли. Можете ли назвать формат данных, который вернул данный запрос ?
            </span>
            <pre><code class="language-js">${varObj.task_4.code}</code></pre>
        </div>
        
        <div class="task">
            <span id="var-1"><b>Задание №5</b><br>Введите в качестве названия хранимого значения вашу фамилию на английском с нижним подчеркиванием, и способ хранения, к примеру: "Lavrov_cookie",
            в качестве значения укажите ваше имя. Поменяйте значение и название местами. Удалите значения. Добавье в отчет скрины значений в хранилище. 
            </span>
            <br><br>
            <!-- Cookies -->
            <input type="text" placeholder="Куки" id="input-cookie">
            <input type="text" placeholder="Значение" id="cookie-val">
            <input type="button" id="set-cookie" value="Установить">
            <input type="button" id="del-cookie" value="Удалить">
            <br><br>
            <!-- Local Storage -->
            <input type="text" placeholder="Локальное хранилище" id="input-lst">
            <input type="text" placeholder="Значение" id="lst-val">
            <input type="button" id="set-lst" value="Установить">
            <input type="button" id="del-lst" value="Удалить">
            <br><br>
            <!-- Session Storage -->
            <input type="text" placeholder="Сессионное хранилище" id="input-sst">
            <input type="text" placeholder="Значение" id="sst-val">
            <input type="button" id="set-sst" value="Установить">
            <input type="button" id="del-sst" value="Удалить">
        </div>
    </div>
    `);
}