
// change images
function showImg(data) {
    let isCatets = false;

    /* читаем входные данные */
    if (data.inputab.checked)
        isCatets = true;
    else if (data.inputac.checked)
        isCatets = false;
    else {
        alert("Нужно выбрать входные данные!")
        return;
    }

    let img = document.getElementById('img')
    let input2 = document.getElementById('b')
    let input3 = document.getElementById('c')
    if (isCatets) {
        input3.classList.add('off')
        input2.classList.remove('off')
        img.src = 'ab.png'
    } else {
        input2.classList.add('off')
        input3.classList.remove('off')
        img.src = 'ac.png'
    }
}

//output result if valid
function calculate(data) {

    let isCatets = false;

    /* читаем входные данные */
    if (data.inputab.checked)
        isCatets = true;
    else if (data.inputac.checked)
        isCatets = false;
    else {
        alert("Нужно выбрать входные данные!")
        return;
    }
    let a = 0; let b = 0; let c = 0;
    if (isCatets) {
        a = data.input1.value;
        if (!validate(a)) {
            data.input1.classList.add('error')
            return;
        }

        b = data.input2.value;
        if (!validate(b)) {
            data.input2.classList.add('error')
            return;
        }
        c = calculateHypotenuse(a, b)
        if (!Number(c)) {
            alert(c);
            return;
        }
    }
    else {
        a = data.input1.value;
        if (!validate(a)) {
            data.input1.classList.add('error')
            return;
        }

        c = data.input3.value;
        if (!validate(c) || Number(c) < Number(a)) {
            data.input3.classList.add('error')
            return;
        }

        b = calculateCathetus(c, a);
        if (!Number(b)) {
            alert(b);
            return;
        }
    }

    /* находим на странице элемент для вывода данных */
    let output = document.getElementById('output');
    /* заносим в него абзац с подписью */
    output.innerHTML = "<p>Результат:</p>";
    let isChecked = false;
    if (data.task1.checked) {
        let res = calculateRadius(a, b, c);
        writeOutput('Радиус: ' + res, output)
        isChecked = true;
    }

    if (data.task2.checked) {
        let res = calculateMedians(c);
        writeOutput('Медиана к гипотенузе: ' + res, output)
        isChecked = true;
    }

    if (data.task3.checked) {
        let res = calculatePerimeter(a, b, c);
        writeOutput('Периметр: ' + res, output)
        isChecked = true;
    }

    if(!isChecked)
        checkboxes = document.getElementById('checkboxes').classList.add('error')

    return true;
}

function calculateHypotenuse(cathetus1, cathetus2) {
    // Проверяем, чтобы значения катетов были положительными числами
    if (Number(cathetus1) <= 0 || Number(cathetus2) <= 0) {
        return "Значения катетов должны быть положительными числами.";
    }

    // Используем теорему Пифагора для вычисления гипотенузы
    var hypotenuse = Math.sqrt(Number(cathetus1) * cathetus1 + cathetus2 * cathetus2);
    return hypotenuse;
}

function calculateCathetus(hypotenuse, knownCathetus) {
    // Проверяем, чтобы значения гипотенузы и известного катета были положительными числами
    if (Number(hypotenuse) <= 0 || Number(knownCathetus) <= 0) {
        return "Значения гипотенузы и известного катета должны быть положительными числами.";
    }

    // Проверяем, чтобы известный катет был меньше гипотенузы
    if (Number(knownCathetus) >= Number(hypotenuse)) {
        return "Длина известного катета должна быть меньше длины гипотенузы.";
    }

    // Используем теорему Пифагора для вычисления неизвестного катета
    var unknownCathetus = Math.sqrt(Number(hypotenuse) * Number(hypotenuse) - Number(knownCathetus) * Number(knownCathetus));
    return unknownCathetus;
}

function calculateRadius(a, b, c) {
    // Вычисляем радиус вписанной окружности
    var radius = (Number(a) + Number(b) - Number(c)) / 2;
    return radius;
}

function calculateMedians(c) {
    return Number(c) / 2;
}

function calculatePerimeter(a, b, c) {
    var perimeter = Number(a) + Number(b) + Number(c);
    return perimeter;
}

function clearfunc() {
    let output = document.getElementById('output');
    output.innerHTML = ''

    let input1 = document.getElementById('input1');
    input1.value = '';
    let input2 = document.getElementById('input2');
    input2.value = '';
    let input3 = document.getElementById('input3');
    input3.value = '';
    // for(let i = 0; i < output.children.length; i++)
    // {
    //     output.remove(output.children[i])
    // }
}

function writeOutput(text, output) {
    let newElem = document.createElement('p')
    newElem.innerHTML = text
    output.appendChild(newElem)
    let br = document.createElement('br')
    output.appendChild(br)
}

function validate(value) {
    if (Number(value) <= 0 || isNaN(value))
        return false;

    return true;
}

/* получаем элемент для ввода высоты */
let input1 = document.getElementById('input1');
/* обрабатываем событие получение фокуса */
input1.onfocus = function () {
    this.classList.remove('error');
};

/* получаем элемент для ввода высоты */
let input2 = document.getElementById('input2');
/* обрабатываем событие получение фокуса */
input2.onfocus = function () {
    this.classList.remove('error');
};

/* получаем элемент для ввода высоты */
let input3 = document.getElementById('input3');
/* обрабатываем событие получение фокуса */
input3.onfocus = function () {
    this.classList.remove('error');
};



checkboxes = document.getElementById('checkboxes')
document.getElementById('task1').onfocus = function() {
    checkboxes = document.getElementById('checkboxes')
    checkboxes.classList.remove('error')
}

document.getElementById('task2').onfocus = function() {
    checkboxes = document.getElementById('checkboxes')
    checkboxes.classList.remove('error')
}

document.getElementById('task3').onfocus = function() {
    checkboxes = document.getElementById('checkboxes')
    checkboxes.classList.remove('error')
}