// T0 do list program 


// This array stores all task names (strings)
let tasks = []

// This array stores whether each task is completed (true/false)
let completed = []


// Event Listeners
// When user clicks "Add" button, run addTask function please
document.getElementById('addTaskBtn').addEventListener('click', addTask)

// When user presses enter,also adds task
document.getElementById('taskInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask()
  }
})

// When peeps clicks "Clear All", remove it all
document.getElementById('clearTasksBtn').addEventListener('click', function () {
  // Reset both arrays to empty
  tasks = []
  completed = []

  // Refresh the screen
  displayTasks()
})

// ===============================
// ADD TASK FUNCTION
// ===============================

function addTask() {
  // Gets the input box
  let input = document.getElementById('taskInput')

  // Grabs the text the user typed
  let taskText = input.value.trim()


  // Only add if it's not empty
  if (taskText !== '') {
    // Add task to tasks array
    tasks.push(taskText)

    // Adds "false" to completed array
    completed.push(false)

    // Clears the box
    input.value = ''

    // Update the screen
    displayTasks()
  }
}


// Displays task on screen

function displayTasks() {
  // Get the <ul> element where tasks will appear
  let list = document.getElementById('taskList')

  // Clear old list (so we don't duplicate items)
  list.innerHTML = ''

  // Loop through every task
  tasks.forEach(function (task, index) {

    // Create a new <li> element
    let li = document.createElement('li')

    // Add Bootstrap styling
    li.className = 'list-group-item d-flex justify-content-between align-items-center'

    // If task is completed, add line-through style
    let style = completed[index] ? 'text-decoration: line-through;' : ''

    // Add content inside the <li>
    li.innerHTML = `
      <span style="${style}">${task}</span>

      <div>
        <!-- Button to mark complete -->
        <button class="btn btn-success btn-sm" onclick="toggleComplete(${index})">✔</button>

        <!-- Button to delete task -->
        <button class="btn btn-danger btn-sm" onclick="removeTask(${index})">X</button>
      </div>
    `

    // Add this <li> to the list
    list.appendChild(li)
  })

  // Update the counter at the bottom
  updateCounter()
}


// Toggle complete  (Check / Uncheck)


function toggleComplete(index) {
  // Flip value: true becomes false, false becomes true
  completed[index] = !completed[index]

  // Refresh display
  displayTasks()
}

// Remove a task

function removeTask(index) {
  // Remove task from tasks array
  tasks.splice(index, 1)

  // Remove matching completion status
  completed.splice(index, 1)

  // Refresh display
  displayTasks()
}


// Update counter display


function updateCounter() {
  // Total number of tasks
  let total = tasks.length

  // Count how many are completed (true values)
  let done = completed.filter(function (c) {
    return c
  }).length

  // Remaining = total - completed
  let remaining = total - done

  // Display the numbers on screen
  document.getElementById('taskCounter').innerText =
    'Total: ' + total + ' | Completed: ' + done + ' | Remaining: ' + remaining
}
