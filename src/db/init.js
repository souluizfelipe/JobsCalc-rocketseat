const Database = require('./config');

const initDb = {
    async init() {
        const db = await Database()
        
        await db.exec(
            `CREATE TABLE profile (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INTEGER,
                hours_per_day INTEGER,
                days_per_week INTEGER,
                vacation_per_year INTEGER,
                value_hour INTEGER
            )`
        );
        
        await db.exec(
            `CREATE TABLE jobs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INTEGER,
                total_hours INTEGER,
                created_at DATETIME
            )` 
        );
        
        await db.run(
            `INSERT INTO profile(
                name,
                avatar,
                monthly_budget,
                hours_per_day,
                days_per_week,
                vacation_per_year,
                value_hour
            ) VALUES (
                "Luiz Felipe",
                "https://unavatar.vercel.app/github/souluizfelipe",
                8000,
                8,
                5,
                4,
                50
            )`
        );
        
        await db.run(
            `INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "Pizzaria Guloso",
                2,
                1,
                1623763290917
            )`
        );
        
        await db.run(
            `INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "oneTwo Project",
                8,
                100,
                1623763290917
            )`
        );
        
        await db.close();
    }
}

initDb.init();
