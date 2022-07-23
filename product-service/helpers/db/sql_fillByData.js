import pg from "pg";
import { DB_Options } from "./db_options.js";

const queryProductsTable = /*sql*/ `
  insert into products (title, description, price) values
  ('Teth-Adam', 'Teth-Adam was a hero of ancient Egypt chosen for his purity of spirit by the wizard Shazam to hold his powers. However, Adam eventually became corrupt and power-hungry, becoming the entity Black Adam.', 10),

  ('Bruce Wayne', 'After his parents were murdered by a criminal, Bruce Wayne trained his mind and body to fight crime as Batman, using the image of the bat to strike terror into the hearts of criminals.', 12),

  ('Clark Kent', 'The last son of a dying world, a young Kal-El was sent to Earth before his homeworld was destroyed and was adopted by a couple. Learning that he had powers greater than those of mortal men and chose to use those to help others as Superman.', 15),

  ('Barry Allen', 'When police scientist Barry Allen is struck by lightning while handling strange chemicals, he discovers he s gained the ability to move much faster than the speed of sound. Taking on a costume, he fights crime as The Flash, the Fastest Man Alive!', 9),
  
  ('Diana Prince', 'The daughter of the Queen of the Amazons on an island paradise that no man has visited. She was born in 3,000 B.C. Diana is spurred to travel to the outside world by the appearance of a male visitor. She decides to bring the wise teachings of her people to the world and fight injustice as Wonder Woman.', 17)
`;

const queryStocksTable = /*sql*/ `
  insert into stocks (count, product_id) values
  (10, 'b5eb51a5-fda7-41bf-bd97-5c5af92a2b28'),
  (20, '187c39c1-e758-4545-81cb-f0278424bc85'),
  (6, 'f8e92325-bf4d-4356-a311-ef9293c74890'),
  (9, '0792e133-95b9-4f85-a5f4-42d716c0ed6f'),
  (42, '593eb4d5-01f4-4a3f-ab50-6dc1aa4eb160')
`;

export const db_fillWithData = async (event) => {
  const client = new pg.Client(DB_Options);
  await client.connect();
  try {
    await client.query(queryProductsTable);
    // do the second query separately: uuid from the table bellow should be the same as in the first table
    await client.query(queryStocksTable);
  } catch (e) {
    console.log("--error", e.message);
  } finally {
    client.end();
  }
};
