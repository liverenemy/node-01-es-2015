/**
 * Task 01: EcmaScript 2015
 */

// Фикстуры по покемонам
let pokeData = [
    [
        'Test0',
        2
    ],
    [
        'Test1',
        3
    ],
    [
        'Test2',
        4
    ],
    [
        'Test3',
        5
    ]
];

// Фикстуры по потерянным покемонам
let lostPokemons = [
    [
        "lost1",
        1
    ],
    [
        "lost2",
        2
    ],
    [
        "lost3",
        3
    ],
    [
        "lost4",
        4
    ]
];

// Класс покемона
class Pokemon {
    /**
     * Конструктор
     * 
     * @param {String} name  Имя создаваемого покемона
     * @param {Number} level Уровень создаваемого покемона
     */
    constructor(name = 'UnNamed', level = 0) {
        this.name  = name;
        this.level = parseInt(level);
    }

    /**
     * Создать нового покемона
     * 
     * @param {Array} [params=[]] Параметры нового покемона
     * @returns {Pokemon}
     */
    static create(params = []) {
        return new Pokemon(...params);
    }

    /**
     * Печать покемона
     */
    show() {
        let result = '';

        for (let property in this) {
            if (!this.hasOwnProperty(property)) {
                continue;
            }

            result += `${property}: ${this[property]};\n`;

        }

        console.log(result);
    }

    /**
     * Реализация valueOf() для работы с покемонами как с простыми переменными
     * 
     * @returns {Number}
     */
    valueOf() {
        return this.level;
    }
}

class PokemonList extends Array {
    /**
     * Конструктор
     * 
     * @param {...Pokemon} pokemons Экземпляры покемонов
     */
    constructor(...pokemons) {
        // Вызовем конструктор родительского Array, 
        // чтобы стал доступен метод push() и остальные
        super();
        
        // Пройдемся по покемонам и добавим их
        for (let pokemon of pokemons) {
            this.push(pokemon);
        }
    }

    /**
     * Создать нового покемона
     * 
     * @param {String} name  Имя создаваемого покемона
     * @param {Number} level Уровень создаваемого покемона
     */
    add(name, level) {
        this.push(new Pokemon(name, level));
    }
    
    max() {
        let maxLevel = Math.max.apply(null, this);
        return this.find((pokemon) => pokemon.level == maxLevel);
    }

    /**
     * Печать списка покемонов
     */
    show() {
        if (!this.length) {
            console.log('Пустой список покемонов');
        } else {
            console.log(`${this.length} шт. в списке покемонов:`);
            this.forEach((pokemon) => pokemon.show());
            let maxPokemon = this.max();
            console.log('Из них самый мощный:');
            maxPokemon.show();
        }
    }
}

// Создадим список с парой "готовых" покемонов
console.log('Просто список покемонов для проверки работы PokemonList');
let pokeList1 = new PokemonList(
    new Pokemon("Test-2", 8),
    new Pokemon("Test-1", 9)
);

// Добавим покемонов из тестовых данных
pokeData.forEach((pokeData) => {
    pokeList1.add.apply(pokeList1, pokeData);
});

// Выведем на печать всех покемонов из списка
pokeList1.show();

// Создадим список потерянных покемонов с парой штук по умолчанию:
let lost = new PokemonList(
    new Pokemon("Lost11", 21),
    new Pokemon("Lost12", 22)
);

// Выведем список на печать:
console.log('Потерянные покемоны:');
lost.show();

console.log('Потерялось еще несколько поменов -- в итоге потерянными числятся:');

// Загрузка фикстур
lostPokemons.forEach(
    (pokemonData) => lost.push(
        Pokemon.create(pokemonData)
    )
);

// Печать результата
lost.show();

// Создадим "пустой" список найденных покемонов
console.log('Список найденных покемонов:');

let found = new PokemonList();

found.show();

// "Вырежем" одного покемона из списка потерянных
let oneLost = lost.splice(2, 1)[0];

console.log('Этот покемон нашелся:');
oneLost.show();

// Добавим "найдёныша" в список найденных:
found.push(oneLost);

console.log('Список найденных покемонов теперь таков:');
found.show();
