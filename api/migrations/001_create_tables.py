steps = [
    [
        """
        CREATE TABLE customers (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(150) NOT NULL,
            last_name VARCHAR(150) NOT NULL,
            address VARCHAR(250) NOT NULL,
            email VARCHAR(150) NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            hashed_password VARCHAR(250) NOT NULL
        );
        """,

        """
        DROP TABLE customers;
        """,
    ],
    [
        """
        CREATE TABLE pets (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(150) NOT NULL,
            breed VARCHAR(250) NOT NULL,
            gender VARCHAR(1) NOT NULL,
            age SMALLINT NOT NULL,
            picture VARCHAR(1000),
            size VARCHAR(5) NOT NULL,
            weight SMALLINT NOT NULL,
            diet TEXT NOT NULL

        );
        """,

        """
        DROP TABLE pets;
        """,
    ],
    [
        """
        CREATE TABLE trainers (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(150) NOT NULL,
            last_name VARCHAR(150) NOT NULL,
            trainer_id VARCHAR(50) UNIQUE NOT NULL,
            phone VARCHAR(20) NOT NULL
        );
        """,

        """
        DROP TABLE trainers;
        """,
    ],
    [
        """
        CREATE TABLE rooms (
            id SERIAL PRIMARY KEY NOT NULL,
            room_number VARCHAR(10) NOT NULL,
            occupied BOOL DEFAULT 'f'
        );
        """,

        """
        DROP TABLE rooms;
        """,
    ],

    [
        """
        CREATE TABLE classes (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR(50) NOT NULL,
            attendees SMALLINT DEFAULT 0,
            max_attendees SMALLINT NOT NULL,
            start_datetime TIMESTAMP NOT NULL,
            end_datetime TIMESTAMP NOT NULL
        );
        """,
        """
        DROP TABLE classes;
        """,
    ],
]
