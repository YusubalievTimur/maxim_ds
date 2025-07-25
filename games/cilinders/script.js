const cylinders = [
    { color: 'red', number: 1 },
    { color: 'blue', number: 2 },
    { color: 'green', number: 3 },
    { color: 'yellow', number: 4 },
    { color: 'purple', number: 5 },
    { color: 'orange', number: 6 },
    { color: 'pink', number: 7 },
    { color: 'cyan', number: 8 },
    { color: 'lime', number: 9 },
    { color: 'brown', number: 10 }
  ];
  
  const correctOrder = [...cylinders];
  correctOrder.sort(() => Math.random() - 0.5);

  let currentOrder = [...cylinders];
  currentOrder.sort(() => Math.random() - 0.5);
  
  let selectedIndexes = [];

  let moves = 0;
  
  function renderCylinders() {
    const container = document.getElementById('cylinder-container');
    container.innerHTML = '';
  
    currentOrder.forEach((cylinder, index) => {
      const cylinderDiv = document.createElement('div');
      cylinderDiv.className = 'cylinder';
      cylinderDiv.style.backgroundColor = cylinder.color;
      cylinderDiv.dataset.index = index;
      cylinderDiv.textContent = cylinder.number; 
  

      if (selectedIndexes.includes(index)) {
        cylinderDiv.style.border = '3px solid black';
        cylinderDiv.style.boxShadow = '0 0 10px black';
      } else {
        cylinderDiv.style.border = 'none';
        cylinderDiv.style.boxShadow = 'none';
      }
  
      cylinderDiv.onclick = () => handleCylinderClick(index); 
      container.appendChild(cylinderDiv);
    });
  
    updateMessage();
  }
  
  function handleCylinderClick(index) {
    if (selectedIndexes.includes(index)) {
      selectedIndexes = selectedIndexes.filter(i => i !== index);
    } else {
      if (selectedIndexes.length < 2) {
        selectedIndexes.push(index);
      }
    }
  
    renderCylinders();
  }
  
  function swapCylinders() {
    if (selectedIndexes.length === 2) {
      const [firstIndex, secondIndex] = selectedIndexes;
  
      [currentOrder[firstIndex], currentOrder[secondIndex]] = [currentOrder[secondIndex], currentOrder[firstIndex]];
      moves++;
      selectedIndexes = [];
  
      renderCylinders();
    } else {
      alert('Выберите два цилиндра для обмена!');
    }
  }
  
  function showAnswer() {
    currentOrder = [...correctOrder];
    moves = 0; 
    selectedIndexes = []; 
    renderCylinders(); 
  }
  
  function updateMessage() {
    const message = document.getElementById('message');
    const matches = countMatches();
    message.textContent = `Совпадений: ${matches}, Ходы: ${moves}`;
  
    if (matches === correctOrder.length) {
      message.textContent = `Поздравляем! Вы восстановили порядок! Ходов: ${moves}`;
    }
  }
  
  function countMatches() {
    let matches = 0;
    for (let i = 0; i <correctOrder.length; i++) {
        if (currentOrder[i].color === correctOrder[i].color && currentOrder[i].number === correctOrder[i].number) {
          matches++;
        }
      }
      return matches;
    }
    
    // Инициализация игры
    renderCylinders();
