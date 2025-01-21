INSERT INTO arn_noddedoil.users (id, name, surname, email, password, verified)
SELECT 'b1d74c48-80e9-429f-a463-9ccb6b777db3', 'Super', 'Admin', 'admin',
       '$2a$10$g09D8F7ABajnAN00MxOScuDDB1Rbe56gTHl4gLUiYDxxndGHQ8kH6', true
WHERE NOT EXISTS (
    SELECT 1
    FROM arn_noddedoil.users
    WHERE id = 'b1d74c48-80e9-429f-a463-9ccb6b777db3'
);

INSERT INTO arn_noddedoil.roles (user_id, role_ident)
SELECT 'b1d74c48-80e9-429f-a463-9ccb6b777db3', 'SA'
WHERE NOT EXISTS (
    SELECT 1
    FROM arn_noddedoil.roles
    WHERE user_id = 'b1d74c48-80e9-429f-a463-9ccb6b777db3'
      AND role_ident = 'SA'
);