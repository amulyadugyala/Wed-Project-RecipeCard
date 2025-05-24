// Toggle ingredient or step section
function toggleSection(id) {
  const section = document.getElementById(id);
  if (section) section.classList.toggle('hidden');
}

// Track cooking state for each recipe
const cookingState = {
  chocolate: { step: 0, timer: 0, interval: null },
  pasta: { step: 0, timer: 0, interval: null },
  salad: { step: 0, timer: 0, interval: null }
};

// Start cooking a recipe
function startCooking(recipe) {
  const steps = document.querySelectorAll(`#${recipe}-steps li`);
  if (steps.length === 0) return;

  // Reset steps styling
  steps.forEach(step => step.style.background = '');
  cookingState[recipe].step = 0;

  // Highlight first step
  steps[0].style.background = '#e0f7fa';
  document.getElementById(`${recipe}-next-step`).classList.remove('hidden');
  updateProgress(recipe);

  // Start timer
  clearInterval(cookingState[recipe].interval);
  cookingState[recipe].timer = 0;
  updateTimerDisplay(recipe);
  cookingState[recipe].interval = setInterval(() => {
    cookingState[recipe].timer++;
    updateTimerDisplay(recipe);
  }, 1000);
}

// Update timer display for a recipe
function updateTimerDisplay(recipe) {
  const secs = cookingState[recipe].timer;
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  document.getElementById(`${recipe}-timer`).textContent =
    `Time: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Advance to next step for a recipe
function advanceStep(recipe) {
  const steps = document.querySelectorAll(`#${recipe}-steps li`);
  let state = cookingState[recipe];

  // Clear current step highlight
  if (state.step < steps.length) {
    steps[state.step].style.background = '';
  }

  // Move to next step
  state.step++;

  if (state.step < steps.length) {
    steps[state.step].style.background = '#e0f7fa';
    updateProgress(recipe);
  } else {
    alert(`${recipe.charAt(0).toUpperCase() + recipe.slice(1)} is ready!`);
    document.getElementById(`${recipe}-next-step`).classList.add('hidden');
    clearInterval(state.interval);
  }
}

// Update progress bar for a recipe
function updateProgress(recipe) {
  const steps = document.querySelectorAll(`#${recipe}-steps li`);
  const progress = ((cookingState[recipe].step + 1) / steps.length) * 100;
  document.getElementById(`${recipe}-progress-bar`).style.width = `${progress}%`;
}


// Recipe navigation (switching views)
function showRecipe(name) {
  const allRecipes = document.querySelectorAll('.recipe-card');
  allRecipes.forEach(recipe => recipe.classList.add('hidden'));

  const selected = document.getElementById(`recipe-${name}`);
  if (selected) {
    selected.classList.remove('hidden');
  }
}

// Print button (optional, in case not using <button onclick="window.print()">)
document.getElementById('print-recipe')?.addEventListener('click', () => {
  window.print();
});

// Attach next step buttons (can also be inline in HTML with onclick)
document.getElementById('chocolate-next-step')?.addEventListener('click', () => {
  advanceStep('chocolate');
});
document.getElementById('pasta-next-step')?.addEventListener('click', () => {
  advanceStep('pasta');
});
document.getElementById('salad-next-step')?.addEventListener('click', () => {
  advanceStep('salad');
});
// In startCooking
updateProgress(recipe);

// In advanceStep
updateProgress(recipe);
