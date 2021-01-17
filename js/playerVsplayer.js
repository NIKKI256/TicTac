/*Присваивание по id*/
let area = document.getElementById("area");
let cell = document.getElementsByClassName("cell");
let currentPlayer = document.getElementById("curPlyr");
/*Создание Х игрокак*/
let player = "X";
/*Логика статистики*/
let stat = {
  X: 0,
  O: 0,
  D: 0,
};
/*Создание выиграшных комбинаций массив */
let winIndex = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

/*Присваиваем класс cell через цикл (ячека нашей клекти!)*/
for (let i = 1; i <= 9; i++) {
  area.innerHTML += "<div class = 'cell' pos=" + i + "></div>";
}

/*Добавление клика к кажой яцейке через цикл*/
for (let i = 0; i < cell.length; i++) {
  cell[i].addEventListener("click", cellClick, false);
}

/*Функция определяет занята ли ячейка*/
function cellClick() {
  var data = [];

  if (!this.innerHTML) {
    this.innerHTML = player;
    this.style.background = "#fff";
  } else {
    alert("Ячейка занята");
    return;
  }
  /*Проверка! Если в этой ячейке уже есть игрок в массив data добавляем эти данные*/
  for (let i in cell) {
    if (cell[i].innerHTML == player) {
      data.push(parseInt(cell[i].getAttribute("pos")));
    }
  }
  /*Проверка выиграл ли игрок или нет и проверка на нечью :)*/
  if (checkWin(data)) {
    stat[player] += 1
    setTimeout(() => {
      restart("Выиграл: " + player)
    }, 10);
  } else {
    let draw = true;
    for (let i in cell) {
      if (cell[i].innerHTML == "") draw = false;
    }

    /*Смена игроков после каждого хода */
    player = player == "X" ? "O" : "X";

    if (draw) {
      stat.D += 1;
      setTimeout(() => {
        restart("Ничья");
      }, 10);
    }
  }


  /*Отображение какой игрок сейчас ходит*/
  currentPlayer.innerHTML = player.toUpperCase();
}

/*Функция выиграл ли игрок */
function checkWin(data) {
  for (let i in winIndex) {
    let win = true;
    for (let j in winIndex[i]) {
      let id = winIndex[i][j];
      let ind = data.indexOf(id);

      if (ind == -1) {
        win = false;
      }
    }
    if (win) return true;
  }
  return false;
}

/*Очистка клеток после закончиной игры*/
function restart(text) {
  for (let i = 0; i < cell.length; i++) {
    cell[i].innerHTML = "";
    cell[i].style.background = ""
  }
  alert(text);
  updateStat();
}

/*вывод статистики в интерфейсе */
function updateStat() {
  document.getElementById("sX").innerHTML = stat.X;
  document.getElementById("sO").innerHTML = stat.O;
  document.getElementById("sD").innerHTML = stat.D;
}
