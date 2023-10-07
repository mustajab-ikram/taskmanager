let taskIdCounter = 0;

function getNextTaskId() {
  return taskIdCounter++;
}

module.exports = getNextTaskId;
