# Task Manager App

Task Manager App is a simple Node.js application that allows you to manage your tasks. You can create, read, update, and delete tasks using a RESTful API.

## Features

- List all tasks
- Retrieve a single task by ID
- Create a new task
- Update an existing task
- Delete a task

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mustajab-ikram/taskmanager.git
   ```

2. Install dependencies:

   ```bash
   cd taskmanager
   npm i
   ```

3. Start the server:

   ```bash
   npm start
   ```

4. The server will be running at `http://localhost:3000`.

## Usage

### List All Tasks

- **Endpoint:** `/tasks`
- **Method:** GET
- **Description:** Get a list of all tasks.

### Get a Task by ID

- **Endpoint:** `/tasks/:id`
- **Method:** GET
- **Description:** Retrieve a task by its ID.

### Create a Task

- **Endpoint:** `/tasks`
- **Method:** POST
- **Description:** Create a new task.
- **Request Body:** JSON object with `title`, `description`, and optionally `completed` (a boolean value).

### Update a Task

- **Endpoint:** `/tasks/:id`
- **Method:** PUT
- **Description:** Update an existing task by its ID.
- **Request Body:** JSON object with `title`, `description`, and optionally `completed` (a boolean value).

### Delete a Task

- **Endpoint:** `/tasks/:id`
- **Method:** DELETE
- **Description:** Delete a task by its ID.

## Validation

Task input is validated to ensure that:

- `title` and `description` are not empty.
- `completed` is a boolean value if provided.

## Data Storage

Task data is stored in a JSON file (`tasks.json`) in the project directory.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit/) file for details.

---

Feel free to customize this README to include any additional information or instructions specific to your project.
