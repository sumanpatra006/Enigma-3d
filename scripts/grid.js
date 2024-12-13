const grid = document.getElementById('grid')
const randomHideChance = 0.2;

for (let i = 0; i < 12; i++) {
  for (let j = 0; j < 30; j++) {
    const span = document.createElement('span');
    if ((i == 0 && j <= 23) || (i == 1 && (j < 4 || j > 12 && j < 20)) || (i > 1 && i < 6 && j > 25) || (i == 6 && j < 3) || ((i == 8 || i == 9) && j > 22) || (i > 6 && j < 12) || (i > 9 && j > 17) || (i > 9 && j > 17)) {
      span.style.visibility = 'hidden';
    }
    grid.appendChild(span);
  }
}