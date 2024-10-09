console.log('start')
let correspond = {
    "Название": "name",
    "Цена": "price",
    "Дата окончания": ["dateFrom", "dateTo"],
    "Кол-во покупок": "city"
}


function toggleSecondLevel(elem) {
    debugger
    var firstLevelSelect = this;
    var secondLevelContainer = document.getElementById(elem);

    secondLevelContainer.children.map(elem => {
        if (elem.name = firstLevelSelect.selected.name)
            elem.style.display = 'none'
    })
}