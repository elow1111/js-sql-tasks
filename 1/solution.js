import postgres from "postgres";

const config = {
  host: "127.0.0.1",
  user: "postgres",
  password: "",
  port: 5432,
};

// BEGIN (write your solution here)
const sql = postgres(config);

export default async function solution() {
  await sql`
        CREATE TABLE IF NOT EXISTS articles (
            title VARCHAR(255),
            description VARCHAR(255)
        );
    `;

  await sql`
        INSERT INTO articles (title, description)
        VALUES ('HAHAHHAHAHAHAHHA', 'HAHAHAHHAHAHAHAHAHHAHAHAHAHHAHAHAHAHAHHAHAHA');
    `;
}
// END
