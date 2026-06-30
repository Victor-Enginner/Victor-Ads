# =============================================
# Inicia o PostgreSQL local portátil (sem admin)
# Uso:  ./start-db.ps1          (inicia)
#       ./start-db.ps1 stop     (para)
#       ./start-db.ps1 status   (verifica)
# =============================================
param([string]$action = "start")

$bin  = "C:\Users\Victor Ads\pgsql\bin"
$data = "C:\Users\Victor Ads\pgdata"
$log  = "C:\Users\Victor Ads\pg.log"

switch ($action) {
  "start" {
    & "$bin\pg_ctl.exe" -D $data -l $log -o "-p 5432" start
  }
  "stop" {
    & "$bin\pg_ctl.exe" -D $data stop
  }
  "status" {
    & "$bin\pg_isready.exe" -h localhost -p 5432
  }
  default { Write-Output "Uso: ./start-db.ps1 [start|stop|status]" }
}
