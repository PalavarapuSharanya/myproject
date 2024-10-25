document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskButton = document.getElementById('add-task-button');
  const taskList = document.getElementById('task-list');
  const completedTasksList = document.getElementById('completed-tasks-list');
  const startTimerButton = document.getElementById('start-timer');
  const timerDisplay = document.getElementById('timer');
  const alarm = document.getElementById('alarm');
  const backgroundMusic = document.getElementById('background-music');
  let timer;

  // Function to start playing background music
  function playBackgroundMusic() {
    backgroundMusic.loop = true; // Set to loop
    backgroundMusic.play().catch(error => {
      console.log('Audio play failed:', error); // Log if the audio cannot play
    });
  }

  // Automatically play background music on page load
  playBackgroundMusic();

  // Try to play background music again on user interaction
  document.addEventListener('click', () => {
    backgroundMusic.play().catch(error => {
      console.log('Audio play failed on click:', error); // Log if the audio cannot play again
    });
  });

  // Function to add a task to the to-do list
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const listItem = document.createElement('li');
      listItem.textContent = taskText;

      // Add click event to cross off the task
      listItem.addEventListener('click', () => {
        listItem.classList.toggle('completed');

        // Move completed task to the completed tasks list
        if (listItem.classList.contains('completed')) {
          completedTasksList.appendChild(listItem);
        } else {
          taskList.appendChild(listItem);
        }
      });

      taskList.appendChild(listItem);
      taskInput.value = ''; // Clear input field
    } else {
      alert('Please enter a task.'); // Optional: Alert if input is empty
    }
  }

  // Add task on button click
  if (addTaskButton) {
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  }

  // Meditation Timer functionality
  if (startTimerButton) {
    startTimerButton.addEventListener('click', () => {
      let timeLeft = 5 * 60; // 5 minutes in seconds
      timerDisplay.classList.remove('hidden');

      timer = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(timer);
          timerDisplay.textContent = "Time's up!";
          alarm.play(); // Play alarm sound
          backgroundMusic.pause(); // Stop background music
          setTimeout(() => {
            timerDisplay.classList.add('hidden');
          }, 3000); // Hide timer after 3 seconds
        } else {
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
        timeLeft--;
      }, 1000);
    });
  }

  // Stop background music when leaving the To-Do List or Meditation page
  window.addEventListener('beforeunload', () => {
    backgroundMusic.pause(); // Pause music on page exit
  });
});
