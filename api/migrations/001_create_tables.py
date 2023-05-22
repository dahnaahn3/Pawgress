steps = [
    [
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(150) NOT NULL,
            last_name VARCHAR(150) NOT NULL,
            address VARCHAR(250) NOT NULL,
            email VARCHAR(150) NOT NULL,
            phone_number VARCHAR(20) NOT NULL,
            role VARCHAR(50) NOT NULL DEFAULT 'customer',
            hashed_password VARCHAR(250) NOT NULL
        );
        """,
        """
        DROP TABLE users;
        """,
    ],
    [
        """
        CREATE TABLE pets (
            pet_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(150) NOT NULL,
            breed VARCHAR(250) NOT NULL,
            gender VARCHAR(1) NOT NULL,
            age SMALLINT NOT NULL,
            picture VARCHAR(1000),
            size VARCHAR(5) NOT NULL,
            weight SMALLINT NOT NULL,
            diet TEXT NOT NULL,
            owner_id SMALLINT NOT NULL,
            FOREIGN KEY (owner_id) REFERENCES users(id)
        );
        """,
        """
        DROP TABLE pets;
        """,
    ],
    [
        """
        CREATE TABLE rooms (
            room_id SERIAL PRIMARY KEY NOT NULL,
            room_number VARCHAR(10) NOT NULL,
            occupied BOOL DEFAULT 'f',
            pet_id SMALLINT NOT NULL,
            FOREIGN KEY (pet_id) REFERENCES pets(id)
        );
        """,
        """
        DROP TABLE rooms;
        """,
    ],
    [
        """
        CREATE TABLE classes (
            class_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            category VARCHAR(50) NOT NULL,
            attendees SMALLINT DEFAULT 0,
            max_attendees SMALLINT NOT NULL,
            start_datetime TIMESTAMP NOT NULL,
            end_datetime TIMESTAMP NOT NULL,
            description TEXT NOT NULL
        );
        """,
        """
        DROP TABLE classes;
        """,
    ],
    [
        """
        CREATE TABLE reservations (
            reservation_id SERIAL PRIMARY KEY NOT NULL,
            start_datetime TIMESTAMP NOT NULL,
            end_datetime TIMESTAMP NOT NULL,
            category VARCHAR(50) NOT NULL,
            customer_id SMALLINT NOT NULL,
            FOREIGN KEY (customer_id) REFERENCES users(id)
        );
        """,
        """
        DROP TABLE reservations;
        """,
    ],
    [
        """
        CREATE TABLE pet_reservations (
            reservation_id SERIAL NOT NULL,
            pet_id SERIAL NOT NULL,
            PRIMARY KEY(reservation_id, pet_id),
            FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id),
            FOREIGN KEY (pet_id) REFERENCES pets(pet_id)
        );
        """,
        """
        DROP TABLE pet_reservations;
        """,
    ],
]
