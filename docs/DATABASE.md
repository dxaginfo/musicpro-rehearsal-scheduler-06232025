# Database Schema Documentation

This document outlines the database schema for the Rehearsal Scheduler application. The application uses PostgreSQL as its primary database system.

## Entity Relationship Diagram

The database follows a relational model with the following key entities:

```
Users ──┬─── GroupMembers ───── Groups
        │         │
        │         └─── Rehearsals ───── Venues
        │                │
        ├─── UserAvailability      │
        │                          │
        ├─── SpecialUnavailability │
        │                          │
        └─── Attendance ───────────┘
               │
               └─── Setlists ───── SetlistSongs ───── Songs
```

## Tables

### Users Table
Stores information about registered users.

```
id: UUID (PK)
email: STRING (unique)
password_hash: STRING
first_name: STRING
last_name: STRING
phone_number: STRING (nullable)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### Groups Table
Represents bands or musical groups.

```
id: UUID (PK)
name: STRING
description: TEXT (nullable)
created_by: UUID (FK to Users.id)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### GroupMembers Table
Junction table linking users to groups with additional attributes.

```
id: UUID (PK)
group_id: UUID (FK to Groups.id)
user_id: UUID (FK to Users.id)
role: ENUM ('admin', 'member')
instruments: ARRAY[STRING] (nullable)
joined_at: TIMESTAMP
```

### UserAvailability Table
Stores regular availability patterns for users.

```
id: UUID (PK)
user_id: UUID (FK to Users.id)
day_of_week: INTEGER (0-6)
start_time: TIME
end_time: TIME
recurrence: ENUM ('weekly', 'biweekly', 'monthly')
```

### SpecialUnavailability Table
Records specific dates/times when users are unavailable.

```
id: UUID (PK)
user_id: UUID (FK to Users.id)
start_datetime: TIMESTAMP
end_datetime: TIMESTAMP
reason: STRING (nullable)
```

### Rehearsals Table
Stores information about scheduled rehearsal events.

```
id: UUID (PK)
group_id: UUID (FK to Groups.id)
venue_id: UUID (FK to Venues.id, nullable)
title: STRING
description: TEXT (nullable)
start_datetime: TIMESTAMP
end_datetime: TIMESTAMP
is_recurring: BOOLEAN
recurrence_pattern: JSON (nullable)
created_by: UUID (FK to Users.id)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### Attendance Table
Tracks user attendance at rehearsals.

```
id: UUID (PK)
rehearsal_id: UUID (FK to Rehearsals.id)
user_id: UUID (FK to Users.id)
status: ENUM ('confirmed', 'declined', 'tentative', 'no_response')
arrival_time: TIME (nullable)
departure_time: TIME (nullable)
notes: TEXT (nullable)
```

### Venues Table
Stores information about rehearsal locations.

```
id: UUID (PK)
name: STRING
address: STRING
city: STRING
state: STRING
postal_code: STRING
country: STRING
notes: TEXT (nullable)
cost_per_hour: DECIMAL (nullable)
created_by: UUID (FK to Users.id)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### Setlists Table
Represents collections of songs for specific rehearsals.

```
id: UUID (PK)
rehearsal_id: UUID (FK to Rehearsals.id)
name: STRING
notes: TEXT (nullable)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### Songs Table
Stores information about songs that groups rehearse.

```
id: UUID (PK)
group_id: UUID (FK to Groups.id)
title: STRING
artist: STRING (nullable)
duration: INTEGER (in seconds, nullable)
notes: TEXT (nullable)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

### SetlistSongs Table
Junction table linking songs to setlists with additional attributes.

```
id: UUID (PK)
setlist_id: UUID (FK to Setlists.id)
song_id: UUID (FK to Songs.id)
position: INTEGER
notes: TEXT (nullable)
```

### Attachments Table
Stores files associated with songs or rehearsals.

```
id: UUID (PK)
song_id: UUID (FK to Songs.id, nullable)
rehearsal_id: UUID (FK to Rehearsals.id, nullable)
file_name: STRING
file_type: STRING
file_url: STRING
uploaded_by: UUID (FK to Users.id)
uploaded_at: TIMESTAMP
```

### Notifications Table
Tracks system notifications sent to users.

```
id: UUID (PK)
user_id: UUID (FK to Users.id)
type: ENUM ('rehearsal_created', 'rehearsal_updated', 'rehearsal_reminder', 'custom_message')
content: TEXT
related_id: UUID (nullable)
is_read: BOOLEAN
created_at: TIMESTAMP
```

## Indexes

For optimal performance, the following indexes are recommended:

1. Users table: email (unique)
2. GroupMembers table: (group_id, user_id) (unique)
3. UserAvailability table: (user_id, day_of_week)
4. SpecialUnavailability table: (user_id, start_datetime)
5. Rehearsals table: (group_id, start_datetime)
6. Attendance table: (rehearsal_id, user_id) (unique)
7. SetlistSongs table: (setlist_id, song_id) (unique)

## Constraints

1. When a user is deleted, all related records (availability, attendance, etc.) should be deleted.
2. When a group is deleted, all related records (rehearsals, songs, etc.) should be deleted.
3. When a rehearsal is deleted, all related records (attendance, setlists, etc.) should be deleted.

## Migrations

Database migrations are managed using Sequelize migrations. To create a new migration:

```bash
npx sequelize-cli migration:generate --name migration-name
```

To run migrations:

```bash
npx sequelize-cli db:migrate
```

To undo the last migration:

```bash
npx sequelize-cli db:migrate:undo
```