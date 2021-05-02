window.addEventListener('DOMContentLoaded', () => {
  let gameStatus = '';
  let player1 = {
    playerId: 1,
    playerName: 'Player 1',
    avatarId: '',
    avatarImg: '',
    avatarSrc: '',
    score: 0
  }
  let player2 = {
    playerId: 2,
    playerName: 'Player 2',
    avatarId: '',
    avatarImg: '',
    avatarSrc: '',
    score: 0
  }
  let ai = {
    playerId: 0,
    playerName: 'ai',
    avatarId: '',
    avatarImg: '',
    avatarSrc: '',
    score: 0
  }
  let game = {
    pvpMode: true,
    aiMode: false
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
    winConArr.forEach(nodelist => {
      if (nodelist[0].value !== '' &&
          nodelist[0].value === nodelist[1].value &&
          nodelist[2].value === nodelist[1].value) {
        if (nodelist[2].value === player1.avatarId) {
          winner(player1)
          gameStatus = player1.playerName
        } else if (nodelist[2].value === player2.avatarId) {
          winner(player2)
          gameStatus = player2.playerName
        }
        nodelist[0].classList.add('win-strikethrough');
        nodelist[1].classList.add('win-strikethrough');
        nodelist[2].classList.add('win-strikethrough');
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
      if (e.target.value === '' && !game.aiMode) {
        if (countTurn()) {
          e.target.style.backgroundImage = player2.avatarImg;
        } else {
          e.target.style.backgroundImage = player1.avatarImg;
        }
      }
    })
    allTttBtns[i].addEventListener('mouseout', e => {
      if (e.target.value === '' && !game.aiMode) {
        if (countTurn()) {
          e.target.style.backgroundImage = '';
        } else {
          e.target.style.backgroundImage = '';
        }
      }
    })
    allTttBtns[i].addEventListener('click', (event) => {
      if (gameStatus) {return}
      if (event.target.value === '' && !game.ai) {
        turnCount++;
        if (countTurn()) {
          event.target.style.backgroundImage = player1.avatarImg;
          event.target.value = player1.avatarId;
        } else {
          event.target.style.backgroundImage = player2.avatarImg;
          event.target.value = player2.avatarId;
        }
      }
      if (event.target.value === '' && game.aiMode) {
        event.target.style.backgroundImage = player1.avatarImg;
        event.target.value = player1.avatarId;
        //aiPlays();
      }
      winningCondition()
    })
  }

  const removeWinStrikethrough = () => {
    const winStrikethroughEle = document.querySelectorAll('.win-strikethrough');
    winStrikethroughEle.forEach(ele => {
      ele.classList.remove('win-strikethrough')
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
    removeWinStrikethrough();
  })

  const giveUpBtn = document.getElementById('give-up');
  giveUpBtn.addEventListener('click', event => {
    if (!gameStatus && !game.aiMode) {
      gameStatus = 'gaveup'
      if (countTurn()) {
        winner(player2)
      } else {
        winner(player1)
      }
    } else if (!gameStatus && game.aiMode) {
      //aiWins()
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
      const playerScoreImg = document.createElement('img');
      playerScoreImg.src = playerObj.avatarSrc;
      playerScoreImg.className = 'player-score-img'
      if (playerObj.playerId === 1) {
        player1score.appendChild(playerScoreImg);
      } else if (playerObj.playerId === 2) {
        player2score.appendChild(playerScoreImg);
      }
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
      } else if (!player2.avatarId){
        playerChooseAvatar(player2, avatar);
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


  //loops through every winCon nodelist to see if there are 2
  //squares that have the same value, then:
  //ai will choose the empty square

  const empty2fill = () => {
    winConArr.forEach(nodelist => {
      console.log(nodelist[0]);
      console.log(nodelist[0].value);
      if (nodelist[0].value === nodelist[1].value) {
        aiChoose(nodelist[2])
      } else if (nodelist[0].value === nodelist[2].value) {
        aiChoose(nodelist[1])
      } else if (nodelist[2].value === nodelist[1].value) {
        aiChoose(nodelist[0])
      }
    })
  }

  const aiChoose = (square) => {
    square.style.backgroundImage = ai.avatarImg;
    square.value = ai.avatarImg;
  }
  const aiPlay = () => {
    empty2fill();
  }





  const testEmpty2fillBtn = document.getElementById('test-empty2fill');
  testEmpty2fillBtn.addEventListener('click', e => {empty2fill()})
  const testPlayAiBtn = document.getElementById('ai-mode');
  testPlayAiBtn.addEventListener('click', e => {game.aiMode = true})
  const testPvpBtn = document.getElementById('pvp-mode');
  testPvpBtn.addEventListener('click', e => {game.aiMode = false})
















})