steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE dummy (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE dummy;
        """
    ],
    [
        # "Up" SQL statement
        """
        CREATE TABLE big_dummy (
            id SERIAL PRIMARY KEY NOT NULL,
            required_limited_text VARCHAR(1000) NOT NULL,
            required_unlimited_text TEXT NOT NULL,
            required_date_time TIMESTAMP NOT NULL,
            automatically_set_date_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            required_integer INTEGER NOT NULL,
            required_money MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE big_dummy;
        """
    ],
    [
        """
        CREATE TABLE customers (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(150) NOT NULL,
            address VARCHAR(250) NOT NULL,
            email VARCHAR(150) NOT NULL,
            phone_number VARCHAR(50) NOT NULL,
        );
        """,
        """
        DROP TABLE customers;
        """
    ],
    [
        """
        CREATE TABLE dogs (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(150) NOT NULL,
            age VARCHAR(10) NOT NULL,
            picture VARCHAR(1000) NOT NULL,
            size VARCHAR(10) NOT NULL,
            weight VARCHAR(10) NOT NULL,
            diet VARCHAR(150) NOT NULL,
            owner_id REFERENCES customers(name)
        );
        """,
        """
        DROP TABLE dogs;
        """
    ],
    [
        """
        CREATE TABLE trainers (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(150) NOT NULL,
            trainer_id VARCHAR(50) UNIQUE NOT NULL,
            phone VARCAHR(12) NOT NULL,

        );
        """,
        """
        DROP TABLE trainers;
        """
    ],
    [
        """
        CREATE TABLE rooms (
            id SERIAL PRIMARY KEY NOT NULL,
            room_number VARCHAR(10) NOT NULL,
            occupied BOOL DEFAULT 'f',
            phone VARCAHR(12) NOT NULL,

        );
        """,
        """
        DROP TABLE rooms;
        """
    ],
]
