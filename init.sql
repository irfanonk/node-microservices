CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT CHECK (age >= 18 AND age <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

DO $$
DECLARE
    i INT;
    name_prefix VARCHAR[] := ARRAY['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Tom', 'Emma', 'James', 'Alice'];
    name_suffix VARCHAR[] := ARRAY['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
BEGIN
    FOR i IN 1..50 LOOP
        INSERT INTO users (
            name,
            email,
            password,
            age,
            last_login
        ) VALUES (
            name_prefix[1 + mod(i, array_length(name_prefix, 1))] || ' ' || 
            name_suffix[1 + mod(i, array_length(name_suffix, 1))],
            LOWER(
                name_prefix[1 + mod(i, array_length(name_prefix, 1))] || '.' ||
                name_suffix[1 + mod(i, array_length(name_suffix, 1))] || 
                i::text || '@example.com'
            ),
            crypt('password' || i::text, gen_salt('bf')),
            18 + mod(i, 60),
            CURRENT_TIMESTAMP - (random() * interval '90 days')
        );
    END LOOP;
END $$;

-- Create tables
CREATE TABLE if not exists authors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    author_id INTEGER REFERENCES authors(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE if not exists comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INTEGER REFERENCES posts(id),
    author_id INTEGER REFERENCES authors(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Authors
INSERT INTO authors (name, email) VALUES
('John Doe', 'john.doe@email.com'),
('Jane Smith', 'jane.smith@email.com'),
('Bob Wilson', 'bob.wilson@email.com'),
('Alice Brown', 'alice.brown@email.com'),
('Charlie Davis', 'charlie.davis@email.com'),
('Diana Miller', 'diana.miller@email.com'),
('Edward Jones', 'edward.jones@email.com'),
('Fiona White', 'fiona.white@email.com'),
('George Martin', 'george.martin@email.com'),
('Helen Clark', 'helen.clark@email.com'),
('Ian Wright', 'ian.wright@email.com'),
('Julia Green', 'julia.green@email.com'),
('Kevin Lee', 'kevin.lee@email.com'),
('Laura Hall', 'laura.hall@email.com'),
('Mike Davis', 'mike.davis@email.com'),
('Nancy Wilson', 'nancy.wilson@email.com'),
('Oliver Smith', 'oliver.smith@email.com'),
('Patricia Brown', 'patricia.brown@email.com'),
('Quinn Jones', 'quinn.jones@email.com'),
('Rachel White', 'rachel.white@email.com');

-- Seed Posts
INSERT INTO posts (title, content, author_id) VALUES
('Getting Started with GraphQL', 'Learn the basics of GraphQL...', 1),
('Database Design Patterns', 'Essential patterns for database design...', 2),
('API Security Best Practices', 'Securing your API endpoints...', 3),
('Microservices Architecture', 'Building scalable microservices...', 4),
('Docker Containerization', 'Containerizing your applications...', 5),
('Cloud Native Applications', 'Developing for the cloud...', 6),
('DevOps Pipelines', 'Setting up CI/CD workflows...', 7),
('REST vs GraphQL', 'Comparing API architectures...', 8),
('Database Optimization', 'Improving query performance...', 9),
('API Documentation', 'Writing effective API docs...', 10),
('Testing Strategies', 'Testing distributed systems...', 11),
('Kubernetes Deployment', 'Deploying to Kubernetes...', 12),
('Event-Driven Architecture', 'Building reactive systems...', 13),
('API Versioning', 'Managing API versions...', 14),
('Database Migrations', 'Handling schema changes...', 15),
('API Gateway Patterns', 'Implementing API gateways...', 16),
('Service Discovery', 'Service discovery patterns...', 17),
('Data Consistency', 'Maintaining data consistency...', 18),
('API Monitoring', 'Monitoring API performance...', 19),
('Database Backup', 'Backup and recovery strategies...', 20);

-- Seed Comments
INSERT INTO comments (content, post_id, author_id) VALUES
('Great introduction to GraphQL!', 1, 2),
('Very helpful patterns, thanks!', 2, 3),
('Security is crucial these days.', 3, 4),
('Microservices changed our architecture.', 4, 5),
('Docker simplified our deployment.', 5, 6),
('Cloud-native is the future.', 6, 7),
('CI/CD improved our workflow.', 7, 8),
('GraphQL has better performance.', 8, 9),
('Optimization tips helped a lot.', 9, 10),
('Documentation is key.', 10, 11),
('Testing is often overlooked.', 11, 12),
('Kubernetes is powerful.', 12, 13),
('Event-driven helped scalability.', 13, 14),
('Version management is tricky.', 14, 15),
('Migrations need careful planning.', 15, 16),
('Gateways simplified our architecture.', 16, 17),
('Service discovery is essential.', 17, 18),
('Consistency vs availability trade-off.', 18, 19),
('Monitoring prevented issues.', 19, 20),
('Regular backups saved us!', 20, 1);