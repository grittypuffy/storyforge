use tauri_plugin_sql::{Migration, MigrationKind};

pub fn migrate() -> Vec<Migration> {
    let profile_migration = Migration {
        version: 2,
        description: "create_profile_table",
        sql: "CREATE TABLE IF NOT EXISTS profile  (
                id TEXT PRIMARY KEY,
                profile_name TEXT NOT NULL UNIQUE,
                avatar BLOB NOT NULL
                );",
        kind: MigrationKind::Up,
    };

    let project_migration = Migration {
        version: 1,
        description: "create_project_table",
        sql: r#"CREATE TABLE IF NOT EXISTS project (
                id TEXT PRIMARY KEY,
                profile_id TEXT,
                title TEXT NOT NULL,
                genre TEXT,
                category TEXT,
                deadline DATE,
                created_at DATE NOT NULL,
                recently_updated DATE NOT NULL,
                synopsis TEXT
            );"#,
        kind: MigrationKind::Up,
    };
    
    let migrations = vec![profile_migration, project_migration];
    migrations
}
