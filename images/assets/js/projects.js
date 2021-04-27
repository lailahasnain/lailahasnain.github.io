// Function to add a new class when li is clicked
function toggleExpansion(e, id) {
  // Act normally if user clicks on a hyperlink
  if (e.target.tagName === 'A') return;

  e.preventDefault();

  const thumbnail = document.getElementById(`${id}`);
  const links = document.getElementById(`${id}-links-wrapper`);

  // Turning Node list from DOM into normal array
  const classes = [...thumbnail.classList];

  // Toggling active classses on expanded elements
  if (classes.includes('active')) {
    thumbnail.classList.remove('active');
    links.classList.remove('active');
  } else {
    thumbnail.classList.add('active');
    links.classList.add('active');
  }
}
