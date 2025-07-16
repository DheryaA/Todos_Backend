import Todo from '../models/todo.js';

// Create new Todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, priority, reminderTime } = req.body;

    const todo = await Todo.create({
      userId: req.user.id, 
      title,
      description,
      dueDate,
      priority,
      reminderTime,
    });

    res.status(201).json({
      message: 'Todo created successfully',
      todo,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// GET /api/todos - Get all todos for the user
export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/todos/:id - Get single todo by ID
export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete all todos for the logged-in user
export const deleteAllTodos = async (req, res) => {
  try {
    const userId = req.user.userId;

    await Todo.deleteMany({ userId });

    res.status(200).json({ message: 'All todos deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a specific todo by ID
export const updateTodoById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todoId = req.params.id;

    const updatedFields = req.body;

    // Ensure the todo belongs to the logged-in user
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { $set: updatedFields },
      { new: true } // Return the updated todo
    );

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }

    res.status(200).json({
      message: 'Todo updated successfully',
      todo,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Delete a specific todo by ID
export const deleteTodoById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const todoId = req.params.id;



    console.log("Requesting user:", userId); // Add this
    console.log("Todo ID to delete:", todoId);

    const todo = await Todo.findOneAndDelete({ _id: todoId, userId });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found or unauthorized' });
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

