// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
use std::process::Command;
use tauri::Event;

#[tauri::command]
fn execute_click_script() -> Result<String, String> {
    let script_path = "robot.js";

    let output = std::process::Command::new("node")
        .arg(script_path)
        .output()
        .expect("Не удалось выполнить скрипт");

    if !output.status.success() {
        return Err(format!("Ошибка выполнения скрипта: {:?}", output));
    }

    Ok("Скрипт успешно выполнен".to_string())
}




fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![execute_click_script])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}



// use tauri::api::process::Command;
// use std::path::Path;

// fn execute_nodejs_script() {
//     let node_path = which::which("node").expect("Node.js not found in your PATH");
//     let program_path = node_path.to_str().expect("Invalid path").to_owned();

//     let mut command = Command::new(&program_path);
//     command.args(&["../nodejs_script.js"]);

// }
