# 把主站的 chat/ 目录快照回本仓库。
#
# 背景：线上只有一份，即 yenchiu.com/chat —— 由博客仓库 yen-chiu.github.io 的
# chat/ 目录发布。本仓库（Chat）只当源代码 / 里程碑快照的存档，不跟随每次改动。
#
# 用法（在仓库根目录或任意位置均可）：
#   powershell -File tools\backup-from-site.ps1          # 复制 + 写 SNAPSHOT.md + 本地提交
#   powershell -File tools\backup-from-site.ps1 -Push    # 再 push 到 origin
#   powershell -File tools\backup-from-site.ps1 -DryRun  # 只看会复制哪些文件，不动磁盘
# （装了 PowerShell 7 的话把 powershell 换成 pwsh 也一样。）
#
# 规则：只从主站往本仓库覆盖同名文件，不删除本仓库独有的东西
#       （src/、tools/、css/*.scss、gulpfile.js 这些源码本就不在发布目录里）。
param(
    [string]$Source = 'C:\03_Github\yen-chiu.github.io\chat',
    [switch]$Push,
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'
$Dest = Split-Path $PSScriptRoot -Parent

if (-not (Test-Path -LiteralPath $Source)) { throw "找不到主站目录：$Source" }
if (-not (Test-Path -LiteralPath (Join-Path $Dest '.git'))) { throw "目标不是 git 仓库：$Dest" }

$blogRepo = Split-Path -Path $Source -Parent
$sha = 'unknown'
try {
    $out = (& git -C $blogRepo rev-parse --short HEAD 2>$null)
    if ($out) { $sha = $out.Trim() }
} catch {
    # 源目录不在 git 仓库里（比如临时测试目录）时就当 unknown，不中断
}

$copied = New-Object System.Collections.Generic.List[string]
$same = 0
$skipped = New-Object System.Collections.Generic.List[string]

Get-ChildItem -LiteralPath $Source -Recurse -File -Force | ForEach-Object {
    $rel = $_.FullName.Substring($Source.Length + 1)
    $target = Join-Path $Dest $rel

    if ($rel -match '^(\.git|\.github|node_modules)[\\/]') { return }

    $needCopy = $true
    if (Test-Path -LiteralPath $target) {
        $a = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
        $b = (Get-FileHash -LiteralPath $target -Algorithm SHA256).Hash
        $needCopy = ($a -ne $b)
        if (-not $needCopy) {
            $script:same++
            return
        }
    }

    # 本仓库里有、但主站没有的目录（源码、工具、scss 等）一律不动；
    # 只覆盖发布目录里确实存在的文件。
    $copied.Add($rel)
    if (-not $DryRun) {
        $dir = Split-Path -Parent $target
        if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
        Copy-Item -LiteralPath $_.FullName -Destination $target -Force
    }
}

# 哪些东西只在备份仓库里：列个数量，免得以为漏拷了
$srcFiles = Get-ChildItem -LiteralPath $Source -Recurse -File -Force |
    ForEach-Object { $_.FullName.Substring($Source.Length + 1) }
$allSource = @{}
foreach ($f in $srcFiles) { $allSource[$f] = 1 }
Get-ChildItem -LiteralPath $Dest -Recurse -File -Force | ForEach-Object {
    $rel = $_.FullName.Substring($Dest.Length + 1)
    if ($rel -match '^(\.git|\.github|node_modules)[\\/]') { return }
    if (-not $allSource.ContainsKey($rel)) { $skipped.Add($rel) }
}

$today = Get-Date -Format 'yyyy-MM-dd'
$now = Get-Date -Format 'yyyy-MM-dd HH:mm'
$lines = @(
    '# 快照记录',
    '',
    "最近一次快照：**$now**（来源：``yen-chiu.github.io/chat``，博客仓库 commit ``$sha``）",
    '',
    '本仓库是「与念真聊天中」的存档。线上站点只有一处：<https://yenchiu.com/chat/>，',
    '由博客仓库 `yen-chiu.github.io` 的 `chat/` 目录发布。这里不跟随每次改动，',
    '只按里程碑手动打快照：`powershell -File tools\backup-from-site.ps1`（可选 `-Push`）。',
    '',
    "本次复制 $($copied.Count) 个文件，未变 $same 个；",
    "本仓库独有、不属于发布目录的 $($skipped.Count) 个（src/、tools/、scss 等源码，保持原样）。"
)
if (-not $DryRun) {
    [System.IO.File]::WriteAllText((Join-Path $Dest 'SNAPSHOT.md'), (($lines -join "`n") + "`n"), (New-Object System.Text.UTF8Encoding($false)))
}

Write-Output ("主站 commit : {0}" -f $sha)
Write-Output ("复制        : {0} 个" -f $copied.Count)
Write-Output ("未变        : {0} 个" -f $same)
Write-Output ("仅本仓库有  : {0} 个" -f $skipped.Count)
if ($copied.Count -gt 0) { Write-Output ("→ " + (($copied | Select-Object -First 12) -join ', ')) }

if ($DryRun) { Write-Output '(dry-run，没有写入磁盘)'; return }

& git -C $Dest add -A
$dirty = (& git -C $Dest status --porcelain)
if (-not $dirty) {
    Write-Output '工作区没有变化，不用提交。'
    return
}

$msg = "chore(chat): 快照 $today（主站 $sha）"
& git -C $Dest commit -q -m $msg
Write-Output ("已提交：{0}" -f $msg)

if ($Push) {
    & git -C $Dest push origin master
    Write-Output '已推送到 origin/master。'
} else {
    Write-Output '（没加 -Push，还在本地。要推再跑一次加 -Push，或手动 git push）'
}
