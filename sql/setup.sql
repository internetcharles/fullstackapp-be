DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  note TEXT NOT NULL
);
