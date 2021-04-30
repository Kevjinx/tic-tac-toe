const oink = 'url(/images/oink.jpg'
const elephant = 'url(/images/elephant.jpg'
const pug = 'url(/images/pug.jpg'
const bear = 'url(/images/bear.jpg'
const lion = 'url(/images/lion.png'

//player choose their avata''


const winningCondition = () => {
  winConArr.forEach(group => {
    if (  group[0].value !== '' &&
          group[0].value === group[1].value &&
          group[2].value === group[1].value) {
      setTimeout(() => {
        alert(`${group[0].value} wins!!!`)
      }, 100);
      winStop = true;
    }
  })
}


window.addEventListener('DOMContentLoaded', () => {
  const col0WinCon = document.querySelectorAll('.col0')
  const col1WinCon = document.querySelectorAll('.col1')
  const col2WinCon = document.querySelectorAll('.col2')
  const row0WinCon = document.querySelectorAll('.row0')
  const row1WinCon = document.querySelectorAll('.row1')
  const row2WinCon = document.querySelectorAll('.row2')
  const diag0WinCon = document.querySelectorAll('.diag0')
  const diag1WinCon = document.querySelectorAll('.diag1')

  const winConArr = [col0WinCon, col1WinCon, col2WinCon, row0WinCon, row1WinCon, row2WinCon, diag0WinCon, diag1WinCon]

  let turnCount = 2; //starts with 2, even users goes first, even = X, odd = O

  const countTurn = () => {
    if (turnCount%2 === 0) {
      return false;
    } else {
      return true;
    }
  }

  const allTttBtns = document.querySelectorAll('.ttt-btn');

  for (let i = 0; i < allTttBtns.length; i++) {
    allTttBtns[i].addEventListener('click', (event) => {
      if (event.target.value === '') {
        turnCount++;
        if (countTurn()) {
          event.target.style.backgroundImage = oink;
          event.target.value = 'player1'
        } else {
          event.target.style.backgroundImage = lion;
          event.target.value = 'player2'
        }
      }
      winningCondition(); //need a way to stop
      //????how to remove eventlisteners from all the btns???
    })
  }

  const newGameBtn = document.querySelector('#new-game');
  newGameBtn.addEventListener('click', event => {
    //resetting values for all btns
    allTttBtns.forEach(btn => {
      btn.value = ''
      btn.style.backgroundImage = 'none'
    })
  })

  const giveUpBtn = document.getElementById('give-up');
  giveUpBtn.addEventListener('click', event => {
    window.location.reload();
  })






})