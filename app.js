window.addEventListener('DOMContentLoaded', () => {
  let gameStatus = '';
  let player1 = {}
  let player2 = {}


  const oink = 'url(images/oink.jpg)'
  const elephant = 'url(images/elephant.jpg)'
  const pug = 'url(images/pug.jpg)'
  const bear = 'url(images/bear.jpg)'
  const lion = 'url(images/lion.png)'

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
        whoWon.innerHTML = `${group[2].value} WINS!!!`
        if (group[2].value === player1name) {
          player1score.innerText++;
          gameStatus = player1name
        } else if (group[2].value === player2name) {
          player2score.innerText++;
          gameStatus = player2name
        }
      }
    })
  }


  const player1score = document.getElementById('player1-score');
  const player2score = document.getElementById('player2-score');
  let player1name = 'Player 1'
  let player2name = 'Player 2'


  let turnCount = 2; //starts with 2, even users goes first, even = X, odd = O

  const countTurn = () => {
    if (turnCount%2 === 0) {
      return false;
    } else {
      return true;
    }
  }

  //refractor to use player obj


  const allTttBtns = document.querySelectorAll('.ttt-btn');

  for (let i = 0; i < allTttBtns.length; i++) {
    allTttBtns[i].addEventListener('click', (event) => {
      if (gameStatus) {return}
      if (event.target.value === '') {
        turnCount++;
        if (countTurn()) {
          event.target.style.backgroundImage = player1.avatarImg;
          event.target.value = player1.id;
        } else {
          event.target.style.backgroundImage = player2.avatarImg;
          event.target.value = player2.id;
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
        whoWon.innerHTML = `${player1name} WINS!!!`
        player1score.innerText++;
      } else {
        whoWon.innerHTML = `${player2name} WINS!!!`
        player2score.innerText++;
      }
    }
  })


  //use i for avatar state
  //should create player objects to store these

  const addSmashToContainer = () => {
    const smashBroContainer = document.getElementById('avatar-container');
    //string for each img  = url
    //set image.src
    //append to container
    for (let i = 1; i < 74 ; i++) {
      const imgEle = new Image();
      imgEle.id = i;
      imgEle.src = `images/smashBro (${i}).png`;
      imgEle.className = 'all-smash-bro-icons'
      smashBroContainer.appendChild(imgEle);
    }

    //click on avatar, bubble up
    smashBroContainer.addEventListener('click', e => {
      console.log('click on container');
      const avatar = e.target; //avatar should be img element
      if (!player1.avatarId) { //if player1 haven't chose yet
        console.log(player1.id);
        player1.avatarId = avatar.id;
        player1.avatarImg = avatar.src;
        console.log(`Player1 Chose with avatarId of ${player1.avatarId}`);
      } else if (!player2.avatarId){
        player2.avatarId = avatar.id;
        player2.avatarImg = avatar.src;
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