import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const sql = postgres(config);

export default async function solution(articles) {
  const data = articles.map(({ title, description }) => [title, description]);
  const result = await sql.begin(async (tx) => {
    return await tx`
      INSERT INTO articles (title, description)
      VALUES ${sql(data)}
      RETURNING id
    `;
  });

  return result.map(row => row.id);
// END
