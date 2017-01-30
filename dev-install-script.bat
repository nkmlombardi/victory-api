@echo off
title Installing OneLink application
echo Copying over git pre-commits for continuous integration testing
cp ./hooks/pre-commit ./.git/hooks/pre-commit
echo installing API...
call npm install
echo running Mocha and Chai tests...
call npm test
echo If all tests passed, you should be set to use the API!  If any problems arise, contact jsemedo@transperfect.com
pause Press any key to exit.
