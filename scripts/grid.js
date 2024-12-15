const grid = document.getElementById('grid');

// Number of rows and columns in the grid
const rows = 12;
const cols = 30;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const span = document.createElement('span');

    // Top left and upper patterns
    if (
      (i === 0 && j <= 23) || // First row spans up to column 23
      (i === 1 && (j < 4 || (j > 12 && j < 20))) || // Second row specific ranges
      (i > 1 && i < 6 && j > 25) || // Rows 2 to 5 right-side pattern
      (i === 6 && j < 3) || // Row 6, left-side pattern
      ((i === 8 || i === 9) && j > 22) || // Rows 8-9 right-side
      (i > 6 && j < 12) || // Rows below 6, left-side spans
      (i > 9 && j > 17) // Bottom right pattern
    ) {
      span.style.visibility = 'hidden';
    }

    // Append each span to the grid
    grid.appendChild(span);
  }
}
