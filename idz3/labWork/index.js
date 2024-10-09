let correspond = {
    "Название": "structure",
    "Тип": "category",
    "Страна": "country",
    "Город": "city",
    "Год": ["yearFrom", "yearTo"],
    "Высота": ["heightFrom", "heightTo"]
}

//выводим таблицу на страницу
let createTable = (data, idTable) => {
    // находим таблицу
    let table = document.getElementById(idTable);
    table.innerHTML = ''
    // формируем заголовочную строку из ключей нулевого элемента массива
    let tr = document.createElement('tr');
    for (key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);
    // самостоятельно сформировать строки таблицы на основе массива data
    data.forEach((item) => {
        let tr = document.createElement('tr');
        for (key in item) {
            let td = document.createElement('td')
            td.innerHTML = item[key]
            tr.append(td)
        }
        table.append(tr);
        // создать новую строку таблицы tr
        // перебрать ключи очередного элемента массива
        // создать элемент td
        // занести в него соответствующее значение из массива
        // добавить элемент td к строке
        // строку добавить в таблицу
    });
}

let dataFilter = (dataForm) => {

    let dictFilter = {};
    // перебираем все элементы формы с фильтрами

    for (let j = 0; j < dataForm.elements.length; j++) {
        // выделяем очередной элемент формы
        let item = dataForm.elements[j];

        // получаем значение элемента
        let valInput = item.value;
        // если поле типа text - приводим его значение к нижнему регистру
        if (item.type == "text") {
            valInput = valInput.toLowerCase();
        }
        else if (item.type == "number") {
            if (valInput == "")
                valInput = item.id.toLowerCase().indexOf('from') !== -1 ? Number.MIN_VALUE : Number.MAX_VALUE;
            else
                valInput = parseInt(valInput)
        }


        /* самостоятельно обработать значения числовых полей:
        - если в поле занесено значение - преобразовать valInput к числу;
        - если поле пусто и его id включает From - занести в valInput
        -бесконечность
        - если поле пусто и его id включает To - занести в valInput
        +бесконечность
        */
        // формируем очередной элемент ассоциативного массива
        dictFilter[item.id] = valInput;
    }
    return dictFilter;
}

// фильтрация таблицы
let filterTable = (data, idTable, dataForm) => {

    debugger
    // получаем данные из полей формы
    let datafilter = dataFilter(dataForm);

    // выбираем данные соответствующие фильтру и формируем таблицу из них
    let tableFilter = data.filter(item => {

        let result = true;

        // строка соответствует фильтру, если сравнение всех значения из input
        // со значением ячейки очередной строки - истина
        for (let key in item) {

            let val = item[key];


            correspondValue = correspond[key]
            // текстовые поля проверяем на вхождение
            if (typeof val == 'string') {
                filterRes = val.indexOf(datafilter[correspondValue]) !== -1
                result &&= filterRes
            }
            if (typeof val == 'number') {
                for (filterKey in correspondValue) {
                    if (correspondValue[filterKey].toLowerCase().indexOf('from') !== -1) {
                        filterRes = datafilter[correspondValue[filterKey]] <= val
                        result &&= filterRes
                    }
                    else {
                        filterRes = datafilter[correspondValue[filterKey]] >= val
                        result &&= filterRes
                    }
                }
            }
        }
        return result;
    });
    // создать и вызвать функцию, которая удаляет все строки таблицы с id=idTable
    // показать на странице таблицу с отфильтрованными строками
    createTable(tableFilter, idTable);
}

let clearFilters = (data, idTable, form) => {
    for (let j = 0; j < form.elements.length; j++) {
        // выделяем очередной элемент формы
        let item = form.elements[j];
        item.value = ''
    }

    filterTable(data, idTable, form)
}

// формирование полей элемента списка с заданным текстом и значением
let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

// формирование полей со списком из заголовков таблицы
// параметры – массив из заголовков таблицы и элемент select
let setSortSelect = (head, sortSelect) => {

    // создаем OPTION Нет и добавляем ее в SELECT
    sortSelect.append(createOption('Нет', 0));

    // перебираем все ключи переданного элемента массива данных
    for (let i in head) {
        // создаем OPTION из очередного ключа и добавляем в SELECT
        // значение атрибута VAL увеличиваем на 1, так как значение 0 имеет опция Нет
        sortSelect.append(createOption(head[i], Number(i) + 1));
    }
}

// настраиваем поле для следующего уровня сортировки
let changeNextSelect = (nextSelect, curSelect) => {
    nextSelect.disabled = false;

    // в следующем SELECT выводим те же option, что и в текущем
    nextSelect.innerHTML = curSelect.innerHTML;

    // удаляем в следующем SELECT уже выбранную в текущем опцию
    // если это не первая опция - отсутствие сортировки
    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
}

// формируем поля со списком для многоуровневой сортировки
let setSortSelects = (data, dataForm) => {
    // выделяем ключи словаря в массив
    let head = Object.keys(data);
    // находим все SELECT в форме
    let allSelect = dataForm.getElementsByTagName('select');

    for (let j = 0; j < allSelect.length; j++) {
        //формируем опции очередного SELECT
        let currentSelect = allSelect[j]
        setSortSelect(head, currentSelect);
        if (j !== allSelect.length - 1) {
            currentSelect.addEventListener('change', function () {
                changeNextSelect(allSelect[j + 1], currentSelect)
            })
            allSelect[j + 1].disabled = true
        }
    }
}

/*формируем массив для сортировки по уровням вида:
 [
 {column: номер столбца,
 order: порядок сортировки (true по убыванию, false по возрастанию)
 },
 {column: номер столбца,
 order: порядок сортировки
 }
 ]
*/
let createSortArr = (data) => {
    let sortArr = [];

    let sortSelects = data.getElementsByTagName('select');

    for (let i = 0; i < sortSelects.length; i++) {

        // получаем номер выбранной опции
        let keySort = sortSelects[i].value;
        // в случае, если выбрана опция Нет, заканчиваем формировать массив
        if (keySort == 0) {
            break;
        }
        // получаем номер значение флажка для порядка сортировки
        // имя флажка сформировано как имя поля SELECT и слова Desc
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push({ column: keySort - 1, order: desc });
    }
    return sortArr;
};

let sortTable = (idTable, data) => {

    debugger
    // формируем управляющий массив для сортировки
    let sortArr = createSortArr(data);

    // сортировать таблицу не нужно, во всех полях выбрана опция Нет
    if (sortArr.length === 0) {
        return false;
    }
    //находим нужную таблицу
    let table = document.getElementById(idTable);
    // преобразуем строки таблицы в массив
    let rowData = Array.from(table.rows);

    // удаляем элемент с заголовками таблицы
    rowData.shift();

    //сортируем данные по возрастанию по всем уровням сортировки
    rowData.sort((first, second) => {
        for (let i in sortArr) {
            let key = sortArr[i].column;
            if (first.cells[key].innerHTML > second.cells[key].innerHTML) {
                return sortArr[i].value ? 1 : -1;
            } else if (first.cells[key].innerHTML < second.cells[key].innerHTML) {
                return sortArr[i].value ? -1 : 1;
            }
        }
        return 0;
    });

    //выводим отсортированную таблицу на страницу
    table.innerHTML = table.rows[0].innerHTML;

    rowData.forEach(item => {
        table.append(item);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    createTable(buildings, 'list');

    let filterForm = document.getElementById('sort')
    setSortSelects(correspond, filterForm)

    let sortButton = document.getElementById('sortButton')
    sortButton.onclick = function() {
        sortTable('list', filterForm)
    }
})

let form = document.getElementById("filter")
let findButton = document.getElementById("findButton")
findButton.onclick = function () {
    filterTable(buildings, "list", form)
}

let clearButton = document.getElementById("clearButton")
clearButton.onclick = function () {
    clearFilters(buildings, "list", form)
}

