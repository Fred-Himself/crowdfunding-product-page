// ------------ INITIALIZATION

let sum = 89914, backers = 5007, bambooLeft = 101, blackLeft = 64;

const totalSum = document.querySelector('#totalBacked .backFigure span');
const totalBackers = document.querySelector('#totalBackers .backFigure');
const progressBar = document.querySelector('#amountBar');

const btnHamburger = document.querySelector("#checkMenu");
const btnMenu = document.querySelector("#hamburger");
const overlay = document.querySelector('.overlay');
const menu = document.querySelector('#mainNav');

const bookmark = document.querySelector('#btnBookmark');
const bookmarked = document.querySelector('#btnBookmark span');

const modalBox0 = document.querySelector('#btnBack');
const modalBox1 = document.querySelector('#bambooStand');
const modalBox2 = document.querySelector('#blackEdition');
const closeButton = document.querySelector('#closeBtn');
const optionBox = document.querySelector('#optionBox');
const thankBox = document.querySelector('#thankBox');
const closeThankBtn = document.querySelector('#closeThankBox');

const continueBtn = document.querySelectorAll('.btnContinue');

// ------------ INSERTION OF INITIAL VALUES

function numStr(a, b) {
  a = '' + a;
  b = b || ' ';
  var c = '',
      d = 0;
  while (a.match(/^0[0-9]/)) {
    a = a.substr(1);
  }
  for (var i = a.length-1; i >= 0; i--) {
    c = (d != 0 && d % 3 == 0) ? a[i] + b + c : a[i] + c;
    d++;
  }
  return c;
}

function calculateProgressBar() {
  let a = ((sum / 100000) * 100).toFixed(2);
  return (a > 100 ? 100 : a);
}

totalSum.innerText = numStr(sum, ',');
totalBackers.innerText = numStr(backers, ',');
progressBar.style.width = calculateProgressBar() + '%';

document.querySelector('#bambooProject .optNumber span').innerText = bambooLeft;
document.querySelector('#bambooBox .projectNumber span').innerText = bambooLeft;
document.querySelector('#blackEditionProject .optNumber span').innerText = blackLeft;
document.querySelector('#blackEditionBox .projectNumber span').innerText = blackLeft;
document.querySelectorAll('#optionBox .disabledProject input').forEach(elem => elem.disabled = true);

// ------------ HAMBURGER MENU ANIMATION

function fadein() {
  overlay.classList.remove('fade-out');
  overlay.classList.add('fade-in');
  menu.classList.remove('fade-out');
  menu.classList.add('fade-in');
  if(!btnHamburger.checked) {
    btnHamburger.checked = true;
  }
}

function fadeout() {
  overlay.classList.remove('fade-in');
  overlay.classList.add('fade-out');
  menu.classList.remove('fade-in');
  menu.classList.add('fade-out');
  if(btnHamburger.checked) {
    btnHamburger.checked = false;
  }
}

btnMenu.addEventListener('click', () => {
  if(overlay.classList.contains('fade-in')) {
    fadeout();
  }
  else {
    fadein();
  }
});

overlay.addEventListener('click', fadeout);

// ------------ BOOKMARK BUTTON

function changeBookmark() {
  if(bookmark.classList.contains('bookmark')) {
    bookmark.classList.remove('bookmark');
    bookmark.classList.add('bookmarked');
    bookmarked.innerText = 'Bookmarked';
  }
  else {
    bookmark.classList.remove('bookmarked');
    bookmark.classList.add('bookmark');
    bookmarked.innerText = 'Bookmark';
  }
}

bookmark.addEventListener('click', changeBookmark);

// ------------ MODAL BOX

function removeSelection() {
  document.querySelectorAll('.radioButton').forEach(elem => elem.checked = false);
  document.querySelectorAll('.projectBox').forEach(elem => elem.classList.remove('selectedBox'));
  document.querySelectorAll('.projectBox .checkedProject').forEach(elem => elem.style.display = 'none');
  document.querySelectorAll('.projectBox .amountInput').forEach(elem => elem.value = '');
}

function modalOpen(id = 1) {
  removeSelection();
  optionBox.style.display = 'block';
  if(id == 'bambooStand') {
    document.querySelector('#radioTwo').checked = true;
    document.querySelector('#bambooBox').classList.add('selectedBox');
    document.querySelector('#bambooBox .checkedProject').style.display = 'block';
  }
  else if(id == 'blackEdition') {
    document.querySelector('#radioThree').checked = true;
    document.querySelector('#blackEditionBox').classList.add('selectedBox');
    document.querySelector('#blackEditionBox .checkedProject').style.display = 'block';
  }
}

function focusAmount(name) {
  focusName = document.querySelector('#' + name + ' .checkedProject input');
  focusName.focus();
  switch(name) {
    case 'bambooBox':
      focusName.value = 25;
      break;
    case 'blackEditionBox':
      focusName.value = 75;
      break;
    case 'mahoganyBox':
      focusName.value = 200;
      break;
    default:
      break;
  }
}

function updateFigures(pledge, type) {
  sum = Number(sum) + Number(pledge);
  backers++;
  totalSum.innerText = numStr(sum, ',');
  totalBackers.innerText = numStr(backers, ',');
  progressBar.style.width = calculateProgressBar() + '%';
  if(type == 1) {
    bambooLeft--;
    document.querySelector('#bambooProject .optNumber span').innerText = bambooLeft;
    document.querySelector('#bambooBox .projectNumber span').innerText = bambooLeft;
    if(bambooLeft == 0) {
      document.querySelector('#bambooBox').classList.add('disabledProject');
    }
  }
  if(type == 2) {
    blackLeft--;
    document.querySelector('#blackEditionProject .optNumber span').innerText = blackLeft;
    document.querySelector('#blackEditionBox .projectNumber span').innerText = blackLeft;
    if(blackLeft == 0) {
      document.querySelector('#blackEditionBox').classList.add('disabledProject');
    }
  }
}

for(let modalBox of [modalBox0, modalBox1, modalBox2]) {
  modalBox.addEventListener('click', () => {
    modalOpen(modalBox.id);
  });
}

document.querySelectorAll('.radioButton').forEach(elem => {
  elem.addEventListener('click', () => {
    removeSelection();
    let boxElem = elem.parentNode.parentNode.id;
    elem.checked = true;
    document.querySelector('#' + boxElem).classList.add('selectedBox');
    document.querySelector('#' + boxElem + ' .checkedProject').style.display = 'block';
  });
});

closeButton.addEventListener('click', () => {
  optionBox.style.display = 'none';
});

closeThankBtn.addEventListener('click', () => {
  thankBox.style.display = 'none';
});

window.onclick = function(event) {
  if (event.target == optionBox || event.target == thankBox) {
    optionBox.style.display = 'none';
    thankBox.style.display = 'none';
  }
}

continueBtn.forEach(elem => {
  elem.addEventListener('click', (e) => {
    e.preventDefault();
    let a = elem.name == 'noReward' ? 0 : document.querySelector('#' + elem.name + ' .amountInput').value;
    switch(elem.name) {
      case 'noReward':
        updateFigures(a, 0);
        optionBox.style.display = 'none';
        thankBox.style.display = 'flex';
        break;
      case 'bambooBox':
        if(a >= 25) {
          updateFigures(a, 1);
          optionBox.style.display = 'none';
          thankBox.style.display = 'flex';
        }
        else if(a == '') {
          updateFigures(25, 1);
          optionBox.style.display = 'none';
          thankBox.style.display = 'flex';
        }
        break;
      case 'blackEditionBox':
        if(a >= 75) {
          updateFigures(a, 2);
          optionBox.style.display = 'none';
          thankBox.style.display = 'flex';
        }
        else if(a == '') {
          updateFigures(75, 2);
          optionBox.style.display = 'none';
          thankBox.style.display = 'flex';
        }
        break;
      default:
        break;
    }
  });
});