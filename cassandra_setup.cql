CREATE KEYSPACE IF NOT EXISTS cassandra_base WITH replication = {'class' : 'SimpleStrategy', 'replication_factor' : 3 };
CREATE TABLE IF NOT EXISTS cassandra_base.users (username text PRIMARY KEY, password text);
CREATE TABLE IF NOT EXISTS cassandra_base.shouts (shout_id uuid PRIMARY KEY,username text,body text);
CREATE TABLE IF NOT EXISTS cassandra_base.usershouts (username text,body text,shout_id uuid,PRIMARY KEY (shout_id, username));
INSERT INTO cassandra_base.users(username, password) VALUES ('user1', 'password1');