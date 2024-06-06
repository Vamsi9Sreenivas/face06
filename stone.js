function playGame(userChoice) {
    const choices = ['stone', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    document.getElementById('user-choice').querySelector('span').textContent = userChoice;
    document.getElementById('computer-choice').querySelector('span').textContent = computerChoice;

    let result = '';

    if (userChoice === computerChoice) {
        result = 'It\'s a draw!';
    } else if (
        (userChoice === 'stone' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'stone') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = 'You win!';
    } else {
        result = 'You lose!';
    }

    document.getElementById('game-result').querySelector('span').textContent = result;
}
