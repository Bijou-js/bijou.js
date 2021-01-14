while true; do
  cd /workspace/tiny.js
  showdown makehtml -i README.md -o README.html
  terser --compress --mangle -o tiny-min.js -- tiny.js
  prettier --single-quote --trailing-comma all
  git stage .
  git commit -m "Some changes"
  git push
  sleep 1
  done