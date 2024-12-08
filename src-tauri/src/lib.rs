use tauri_plugin_fs::FsExt;
use std::fs;

mod database;
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = database::migrate();
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:storyforge.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let scope = app.fs_scope();
            let home_dir = dirs::home_dir();
            if let Some(home_dir) = home_dir {
                if let Ok(false) = fs::exists(home_dir.join("storyforge")) {
                    let _ = fs::create_dir(home_dir.join("storyforge"));
                    let _ = scope.allow_directory(home_dir.join("storyforge"), true);
                } else {
                    let _ = scope.allow_directory(home_dir.join("storyforge"), true);
                }
            };
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
