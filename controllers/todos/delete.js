import database from "../../database/connection.js";

const query = `
DELETE FROM todos WHERE id = $1 AND created_by = $2
`;

async function deleteTodo() {
  try {
    const todoId = req.params.id;
    const userId = req.user.id;
    const dbRes = await database.query(query, [todoId, userId]);

    if (dbRes === 0) {
      return res(404).json({ error: "Todo not found." });
    }

    const data = {
      message: `Todo deleted id ${todoId} successfully`,
    };
    return res(200).jason(data);
  } catch (error) {
    return res(500).json({ error: message.error });
  }
}

export default deleteTodo;
