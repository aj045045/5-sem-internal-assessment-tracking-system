#!/bin/bash

# Initialize variables to store process PIDs
client_pid=""
server_pid=""
xdg_pid=""

start_servers() {
    cd client/
    npm run start &
    client_pid="$!"

    sleep 5

    cd ../server/
    . .venv/bin/activate
    gunicorn -w 5 -b 0.0.0.0:5000 run:app &
    server_pid="$!"

    xdg-open http://localhost:3000/&
    xdg_pid="$!"
}

stop_servers() {
    # Check if each process PID is set and then attempt to kill it
    if [ -n "$server_pid" ]; then
        kill "$server_pid"
    fi

    if [ -n "$client_pid" ]; then
        kill "$client_pid"
    fi

    if [ -n "$xdg_pid" ]; then
        kill "$xdg_pid"
    fi
}

# Trap the termination signal to stop the servers before exiting
trap 'stop_servers; exit 0' SIGINT SIGTERM

start_servers
echo "Press Enter to stop the servers... "
read -r stop_server_data

if [ -z "$stop_server_data" ]; then
    stop_servers
fi

# Keep the script running in the background
while true; do
    sleep 1
done
