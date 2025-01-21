INSERT INTO arn.users (id, name, surname, email, password, verified)
SELECT 'b1d74c48-80e9-429f-a463-9ccb6b777db3', 'Super', 'Admin', 'admin',
       '$2a$10$g09D8F7ABajnAN00MxOScuDDB1Rbe56gTHl4gLUiYDxxndGHQ8kH6', true
WHERE NOT EXISTS (
    SELECT 1
    FROM arn.users
    WHERE id = 'b1d74c48-80e9-429f-a463-9ccb6b777db3'
);

INSERT INTO arn.roles (user_id, role_ident)
SELECT 'b1d74c48-80e9-429f-a463-9ccb6b777db3', 'SA'
WHERE NOT EXISTS (
    SELECT 1
    FROM arn.roles
    WHERE user_id = 'b1d74c48-80e9-429f-a463-9ccb6b777db3'
      AND role_ident = 'SA'
);

INSERT INTO arn.thesis_types (type)
SELECT 'Bakalárska práca'
    WHERE NOT EXISTS (
    SELECT 1
    FROM arn.thesis_types
    WHERE type = 'Bakalárska práca'
);

INSERT INTO arn.thesis_types (type)
SELECT 'Rigorózna práca'
    WHERE NOT EXISTS (
    SELECT 1
    FROM arn.thesis_types
    WHERE type = 'Rigorózna práca'
);

INSERT INTO arn.thesis_types (type)
SELECT 'Diplomová práca'
    WHERE NOT EXISTS (
    SELECT 1
    FROM arn.thesis_types
    WHERE type = 'Diplomová práca'
);

INSERT INTO arn.thesis_types (type)
SELECT 'Dizertačná práca'
    WHERE NOT EXISTS (
    SELECT 1
    FROM arn.thesis_types
    WHERE type = 'Dizertačná práca'
);