fn main() {
    let version = "v0.9.0-precop-1.0.0";
    let arch = std::env::var("CARGO_CFG_TARGET_ARCH").unwrap_or_else(|_| "x86_64".to_string());
    let os = std::env::var("CARGO_CFG_TARGET_OS").unwrap_or_else(|_| "linux".to_string());
    let runtime = std::env::var("CARGO_CFG_TARGET_ENV").unwrap_or_else(|_| "gnu".to_string());

    let long_version = format!("version {version} compiled for {arch}-{os}-{runtime}");
    let user_agent = "/Precop:1.0.0/".to_string();

    println!("cargo:rustc-env=LONG_VERSION={long_version}");
    println!("cargo:rustc-env=GIT_DESCRIBE={version}");
    println!("cargo:rustc-env=USER_AGENT={user_agent}");
    println!("cargo:rerun-if-changed=build.rs");
}
