# *在第一次运行前请先创建.env文件，并运行代码

```powershell
"JWT_SECRET=$(-join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | % {[char]$_}))" | Out-File .\.env
```

