const { Client } = require('pg');

(async function(){
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

await client.connect();

function log_output(err, res){
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
}

console.log(1)

await client.query(`
create table cookie_user_map(
  cookie_uuid char(36),
  subteam varchar(32),
  tags varchar(10)[],
  token varchar(2048),
  google_id varchar(32)
);
`, log_output);

console.log(2)

await client.query(`
create table outreach(
  google_id varchar(32),
  initiative_data text
);
`, log_output);

console.log(3)

await client.query(`
create table initiatives(
  order_id smallint,
  name varchar(200),
  description varchar(5000),
  participants smallint,
  engagement varchar(8),
  lead boolean,
  regular boolean,
  archive boolean
);
`, log_output);

console.log(4)

// client.end()

console.log(5)
})();