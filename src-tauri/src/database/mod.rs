use tauri_plugin_sql::{Migration, MigrationKind};

pub fn migrate() -> Vec<Migration> {
    let migration = vec![Migration {
        version: 1,
        description: "create_profile_table",
        sql: "CREATE TABLE profile (id TEXT PRIMARY KEY, profile_name TEXT NOT NULL UNIQUE, avatar BLOB NOT NULL);",
        kind: MigrationKind::Up,
    }];
    migration
}
