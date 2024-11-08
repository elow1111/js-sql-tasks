import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

export default async (book) => {
  // BEGIN (write your solution here)
  const sql = postgres(config);
  const { title, author } = book;
    
  try {
    await sql`
      INSERT INTO books (title, author)
      VALUES (${title}, ${author})
    `;
    } catch (error) {
      console.error("Error?!?:", error);
      throw error;
    }
  // END
};
