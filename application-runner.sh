#!bin/shell

cd client/
npm run dev &

sleep 5

cd server/
. .venv/bin/activate

python run.py &