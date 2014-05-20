@echo off

REM This batch file mimics what the Makefile does on Windows

FOR /F "tokens=*" %%i IN ('npm bin') DO SET BIN=%%i

if "%1" == "test" (
  "%BIN%\mocha" --reporter spec
  goto DONE
)

if "%1" == "watch" (
  "%BIN%\mocha" --watch --reporter min
  goto DONE
)

if "%1" == "watch-app" (
  "%BIN%\nodemon" sample_app\app.js
  goto DONE
)

:DONE
