import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const sql = postgres(config);

export default async (client, user, roomNumber, price) => {
  const { username, phone } = user;

  const transaction = await client.transaction();

  try {
    const [newUser] = await transaction`
      INSERT INTO users (username, phone)
      VALUES (${username}, ${phone})
      RETURNING id
    `;

    const [room] = await transaction`
      SELECT id FROM rooms WHERE room_number = ${roomNumber} AND status = 'free'
    `;

    if (!room) {
      throw new Error('Room nedost');
    }

    await transaction`
      INSERT INTO orders (user_id, room_id, price)
      VALUES (${newUser.id}, ${room.id}, ${price})
    `;

    await transaction`
      UPDATE rooms
      SET status = 'reserved'
      WHERE id = ${room.id}
    `;

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error("Error dumai lol:", error);
    throw error;
  }
};
// END
