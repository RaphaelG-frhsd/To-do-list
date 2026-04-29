let tasks = [] //Empty array to store tasks

document.getElementById('addTaskBtn').addEventListener('click', function () {
  //Get the value from INput field
  let taskInput = document.getElementById('taskInput').value
  //check if Input is empty
  if (taskInput) {
    //add new task to task array
    tasks.push(taskInput)
    //clear input field value
    document.getElementById('taskInput').value = ''
    //update Task List Display
    displayTasks()
  }
})

function displayTasks () {
  //Select our TaskList in the HTML
  let taskList = document.getElementById('taskList')
  //Clear the existing HTML List
  taskList.innerHTML = ''
  //loop through each Task in the array and create a list item for each
  tasks.forEach((task, index) => {
    //Create <li> element for each task
    let li = document.createElement('li')

    //add Styling
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    )
    //Set innerHTML of the LI with a task and remove btn
    li.innerHTML = `${task} <button class='btn btn-success btn-sm' onclick='removeTask(${index})'>✔</button>`
    //Append the new task list to the HTML
    taskList.appendChild(li)
  })
  
}

function removeTask(index){
  tasks.splice(index,1)
  displayTasks()
}


document.getElementById('clearTasksBtn').addEventListener('click', function () {
  tasks = []
  displayTasks()

________________________________________________________________________________________

  // Two parallel arrays store task text and their completion status at matching indexes
let tasks     = []
let completed = []

// ── Event Listeners ───────────────────────────────────────────────────────────

document.getElementById('addTaskBtn').addEventListener('click', addTask)

// Lets the user submit a task by pressing Enter instead of clicking the button
document.getElementById('taskInput').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask()
  }
})

// Wipes both arrays and re-renders an empty list when Clear is clicked
document.getElementById('clearTasksBtn').addEventListener('click', function () {
  tasks     = []
  completed = []
  displayTasks()
})

// ── Functions ─────────────────────────────────────────────────────────────────

// Reads the input, adds the text to tasks[] and a false entry to completed[], then refreshes the list
function addTask() {
  let taskInput = document.getElementById('taskInput').value

  if (taskInput) {
    tasks.push(taskInput)
    completed.push(false)
    document.getElementById('taskInput').value = ''
    displayTasks()
  }
}

// Rebuilds the entire list from scratch each time — creates an <li> for every task,
// applies a line-through style if completed, and wires up the complete/remove buttons
function displayTasks() {
  let taskList = document.getElementById('taskList')
  taskList.innerHTML = ''

  tasks.forEach((task, index) => {
    let li = document.createElement('li')
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

    let textStyle = completed[index] ? "text-decoration: line-through;" : ""

    li.innerHTML = `
      <span style="${textStyle}">${task}</span>
      <div>
        <button class="btn btn-success btn-sm" onclick="toggleComplete(${index})">✔</button>
        <button class="btn btn-danger btn-sm" onclick="removeTask(${index})">X</button>
      </div>
    `
    taskList.appendChild(li)
  })

  updateCounter()
}

// Flips the completed status at the given index between true and false, then re-renders
function toggleComplete(index) {
  completed[index] = !completed[index]
  displayTasks()
}

// Removes a task and its completion status from both arrays using the same index, then re-renders
function removeTask(index) {
  tasks.splice(index, 1)
  completed.splice(index, 1)
  displayTasks()
}

// Counts total, done, and remaining tasks from the completed[] array and updates the counter display
function updateCounter() {
  let total     = tasks.length
  let done      = completed.filter(c => c).length
  let remaining = total - done

  document.getElementById('taskCounter').innerText =
    `Total: ${total} | Completed: ${done} | Remaining: ${remaining}`
}

})