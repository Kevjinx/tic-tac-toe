window.addEventListener('DOMContentLoaded', () => {
  let gameStatus = '';
  let player1 = {
    playerName: 'Player 1',
    avatarId: '',
    avatarImg: '',
    avatarSrc: '',
    score: 0
  }
  let player2 = {
    playerName: 'Player 2',
    avatarId: '',
    avatarImg: '',
    avatarSrc: '',
    score: 0
  }

  const whoWon = document.getElementById('who-won')

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

  const winner = (playerObj) => {
    whoWon.innerHTML = `<img src='${playerObj.avatarSrc}' class='win-icon'>WINS!!!</img>`
    playerObj.score++;
    player1score.innerHTML = player1.score;
    player2score.innerHTML = player2.score;
    return whoWon;
  }

  const winningCondition = () => {
    winConArr.forEach(group => {
      if (group[0].value !== '' &&
          group[0].value === group[1].value &&
          group[2].value === group[1].value) {
        if (group[2].value === player1.avatarId) {
          winner(player1)
          gameStatus = player1.playerName
        } else if (group[2].value === player2.avatarId) {
          winner(player2)
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
    allTttBtns[i].addEventListener('mouseover', e => {
      if (e.target.value === '') {
        if (countTurn()) {
          e.target.style.backgroundImage = player2.avatarImg;
        } else {
          e.target.style.backgroundImage = player1.avatarImg;
        }
      }
    })
    allTttBtns[i].addEventListener('mouseout', e => {
      if (e.target.value === '') {
        if (countTurn()) {
          e.target.style.backgroundImage = '';
        } else {
          e.target.style.backgroundImage = '';
        }
      }
    })
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
        winner(player2)
      } else {
        winner(player1)
      }
    }
  })

  const addSmashToContainer = () => {
    const smashBroContainer = document.getElementById('avatar-container');
    for (let i = 1; i < 74 ; i++) {
      const imgEle = new Image();
      imgEle.id = i;
      imgEle.src = `images/smashBroAvatars/smashBro (${i}).png`;
      imgEle.urlSrc = `url('images/smashBroAvatars/smashBro (${i}).png')`;
      imgEle.className = 'all-smash-bro-icons';
      smashBroContainer.appendChild(imgEle);
    }

    const playerChooseAvatar = (playerObj, avatar) => {
      playerObj.avatarId = avatar.id;
      playerObj.avatarImg = avatar.urlSrc;
      playerObj.avatarSrc = avatar.src
      const avatarEle = document.getElementById(avatar.id);
      const smashBroContainer = document.getElementById('avatar-container');
      smashBroContainer.removeChild(avatarEle);
      console.log(`${playerObj.playerName} Chose with avatarId of ${playerObj.avatarId}`);
    }

    //click on avatar, bubble up
    smashBroContainer.addEventListener('click', e => {
      const avatar = e.target; //avatar should be img element
      if (avatar.id === 'avatar-container') {
        return;
      }
      if (!player1.avatarId) { //if player haven't chose yet
        playerChooseAvatar(player1, avatar);
        const player1ScoreImg = document.createElement('img');
        player1ScoreImg.src = player1.avatarSrc;
        player1ScoreImg.className = 'player-score-img'
        player1score.appendChild(player1ScoreImg);
      } else if (!player2.avatarId){
        playerChooseAvatar(player2, avatar);
        const player2ScoreImg = document.createElement('img');
        player2ScoreImg.src = player2.avatarSrc;
        player2ScoreImg.className = 'player-score-img'
        player2score.appendChild(player2ScoreImg);
      }
    })
  }

  const addSmashBtn = document.getElementById('add-smash');
  addSmashBtn.addEventListener('click', (e) => {
    if (!addSmashBtn.clicked) {
      addSmashBtn.clicked = true;
      const gameDiv = document.getElementById('game')
      const smashBroContainer = document.createElement('div')
      smashBroContainer.id = 'avatar-container'
      gameDiv.prepend(smashBroContainer)
      addSmashToContainer();
    }
  })
})