@echo off
echo Building LangLink installers for all architectures...
echo.

REM Change to the script directory
cd /d "%~dp0"

REM Clean previous builds
echo Cleaning previous builds...
if exist "dist-electron" rmdir /s /q "dist-electron" 2>nul
if exist "dist-32" rmdir /s /q "dist-32" 2>nul
if exist "dist-64" rmdir /s /q "dist-64" 2>nul
if exist "dist-arm64" rmdir /s /q "dist-arm64" 2>nul

echo.
echo Building for x64 (64-bit)...
call npm run build:win-x64
if exist "dist-electron\LangLink Setup 1.0.0.exe" (
    mkdir "dist-64" 2>nul
    copy "dist-electron\LangLink Setup 1.0.0.exe" "dist-64\" >nul
    copy "dist-electron\LangLink Setup 1.0.0.exe.blockmap" "dist-64\" >nul
    echo x64 build completed and copied to dist-64
) else (
    echo ERROR: x64 build failed
    pause
    exit /b 1
)

echo.
echo Building for x32 (32-bit)...
call npm run build:win-ia32
if exist "dist-electron\LangLink Setup 1.0.0.exe" (
    mkdir "dist-32" 2>nul
    copy "dist-electron\LangLink Setup 1.0.0.exe" "dist-32\" >nul
    copy "dist-electron\LangLink Setup 1.0.0.exe.blockmap" "dist-32\" >nul
    echo x32 build completed and copied to dist-32
) else (
    echo ERROR: x32 build failed
    pause
    exit /b 1
)

echo.
echo Building for ARM64...
call npm run build:win-arm64
if exist "dist-electron\LangLink Setup 1.0.0.exe" (
    mkdir "dist-arm64" 2>nul
    copy "dist-electron\LangLink Setup 1.0.0.exe" "dist-arm64\" >nul
    copy "dist-electron\LangLink Setup 1.0.0.exe.blockmap" "dist-arm64\" >nul
    echo ARM64 build completed and copied to dist-arm64
) else (
    echo ERROR: ARM64 build failed
    pause
    exit /b 1
)

echo.
echo ========================================
echo Build Summary:
echo ========================================
echo x64 Installer: dist-64\LangLink Setup 1.0.0.exe
echo x32 Installer: dist-32\LangLink Setup 1.0.0.exe
echo ARM64 Installer: dist-arm64\LangLink Setup 1.0.0.exe
echo.
echo All builds completed successfully!
pause
