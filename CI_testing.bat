@echo off
title git hooks CI
echo Copying over git hooks for continuous integration testing
cp ./hooks/pre-commit ./.git/hooks/pre-commit
cp ./hooks/pre-push ./.git/hooks/pre-push
