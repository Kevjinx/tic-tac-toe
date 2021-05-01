window.addEventListener('DOMContentLoaded', () => {
  let gameStatus = '';
  let player1 = {
    playerName: 'Player 1',
    avatarId: '',
    avatarImg: '',
    score: 0
  }
  let player2 = {
    playerName: 'Player 2',
    avatarId: '',
    avatarImg: '',
    score: 0
  }




  const player1score = document.getElementById('player1-score');
  const player2score = document.getElementById('player2-score');

  const col0WinCon = document.querySelectorAll('.col0')
  const col1WinCon = document.querySelectorAll('.col1')
  const col2WinCon = document.querySelectorAll('.col2')
  const row0WinCon = document.querySelectorAll('.row0')
  const row1WinCon = document.querySelectorAll('.row1')
  const row2WinCon = document.querySelectorAll('.row2')
  const diag0WinCon = document.querySelectorAll('.diag0')
  const diag1WinCon = document.querySelectorAll('.diag1')

  const winConArr = [col0WinCon, col1WinCon, col2WinCon, row0WinCon, row1WinCon, row2WinCon, diag0WinCon, diag1WinCon]

  const whoWon = document.getElementById('who-won')

  const winningCondition = () => {
    winConArr.forEach(group => {
      if (group[0].value !== '' &&
          group[0].value === group[1].value &&
          group[2].value === group[1].value) {
        if (group[2].value === player1.avatarId) {
          whoWon.innerHTML = `<img src='${player1.avatarSrc}' class='win-icon'>WINS!!!</img>`
          player1score.innerText++;
          gameStatus = player1.playerName
        } else if (group[2].value === player2.avatarId) {
          whoWon.innerHTML = `<img src='${player2.avatarSrc}' class='win-icon'>WINS!!!</img>`
          player2score.innerText++;
          gameStatus = player2.playerName
        }
      }
    })
  }

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
      if (gameStatus) {return}
      if (event.target.value === '') {
        turnCount++;
        if (countTurn()) {
          event.target.style.backgroundImage = player1.avatarImg;
          event.target.value = player1.avatarId;
        } else {
          event.target.style.backgroundImage = player2.avatarImg;
          event.target.value = player2.avatarId;
        }
      }
      winningCondition()
    })
  }

  const newGameBtn = document.querySelector('#new-game');
  newGameBtn.addEventListener('click', event => {
    gameStatus = ''
    //resetting values for all btns
    allTttBtns.forEach(btn => {
      btn.value = ''
      btn.style.backgroundImage = 'none'
    })
    whoWon.innerHTML = '';
    turnCount = 2;
  })

  const giveUpBtn = document.getElementById('give-up');
  giveUpBtn.addEventListener('click', event => {
    if (!gameStatus) {
      gameStatus = 'gaveup'
      if (countTurn()) {
        whoWon.innerHTML = `${player1.playerName} WINS!!!`
        player1score.innerText++;
      } else {
        whoWon.innerHTML = `${player2.playerName} WINS!!!`
        player2score.innerText++;
      }
    }
  })

  const addSmashToContainer = () => {
    const smashBroContainer = document.getElementById('avatar-container');
    for (let i = 1; i < 74 ; i++) {
      const imgEle = new Image();
      imgEle.id = i;
      imgEle.src = `images/smashBro (${i}).png`;
      imgEle.urlSrc = `url('images/smashBro (${i}).png')`
      imgEle.className = 'all-smash-bro-icons'
      smashBroContainer.appendChild(imgEle);
    }

    //click on avatar, bubble up
    smashBroContainer.addEventListener('click', e => {
      console.log('click on container');
      const avatar = e.target; //avatar should be img element
      if (!player1.avatarId) { //if player haven't chose yet
        player1.avatarId = avatar.id;
        player1.avatarImg = avatar.urlSrc;
        player1.avatarSrc = avatar.src
        console.log(`Player1 Chose with avatarId of ${player1.avatarId}`);
      } else if (!player2.avatarId){
        player2.avatarId = avatar.id;
        player2.avatarImg = avatar.urlSrc;
        player2.avatarSrc = avatar.src
        console.log(`Player2 Chose with avatarId of ${player2.avatarId}`);
      }
    })
  }

  const addSmashBtn = document.getElementById('add-smash');
  addSmashBtn.addEventListener('click', (e) => {
    const gameDiv = document.getElementById('game')
    const smashBroContainer = document.createElement('div')
    smashBroContainer.id = 'avatar-container'
    gameDiv.prepend(smashBroContainer)
    addSmashToContainer();
  })
})