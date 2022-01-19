const db = require("../models");

module.exports.getAllTodos = async () => {
    try {
        const allTodos = await db.Todo.findAll();
        return allTodos;
    } catch (error) {
        console.error("Something went wrong");
        return null;
    }
};

module.exports.getTodoById = async (id) => {
    const TodoId = parseInt(id);

    try {
        const Todo = await db.Todo.findByPk(TodoId);
        return Todo;
    } catch (error) {
        console.error("Something went wrong");
        return null;
    }
};

module.exports.createTodo = async (req, res) => {
    const userId = req.params.id;

    const { title, body } = req.body;

    try {
        const user = await db.User.findByPk(userId);

        if (!user) {
            throw new Error("User not found");
        }

        const newTodo = {
            title,
            body,
            completed: false,
        };

        const createdTodo = await user.createTodo(newTodo);

        res.status(201).send(createdTodo);
    } catch (error) {
        console.error(error);
        res.send({
            error: "Something went wrong",
        });
    }
};

module.exports.updateTodo = async (req, res) => {
    const todoId = req.params.id;

    const { title, body, completed } = req.body;

    try {
        await db.Todo.update(
            {
                title,
                body,
                completed,
            },
            { where: { id: todoId } }
        );

        const updatedTodo = await db.Todo.findByPk(id);

        res.status(200).send(updatedTodo);
    } catch (error) {
        console.error(error);
        res.send({
            error: "Something went wrong",
        });
    }
};

module.exports.deleteTodo = (req, res) => {};

module.exports.createComment = async (TodoId, userId, body) => {
    try {
        const comment = await db.Comment.create({
            userId,
            TodoId,
            body,
        });
        return comment;
    } catch (error) {
        console.log("error", error);
        console.error("Something went wrong");
        return null;
    }
};
