$items = @(
    "Butterfly Viscaria ALC blade", "Stiga Cybershape Carbon blade", "Nittaku Acoustic blade", "DHS Hurricane Long 5 blade",
    "Butterfly Tenergy 05 rubber", "DHS Hurricane 3 Neo rubber", "Yasaka Rakza Z rubber", "Tibhar Evolution MX-P rubber",
    "Nittaku Premium 3-Star table tennis ball", "Butterfly R40+ 3-Star ball", "DHS DJ40+ 3-Star ball", "Xiom Seamless 3-Star ball",
    "Mizuno Wave Medal 6 table tennis shoes", "Butterfly Lezoline Rifones shoes",
    "DHS Rainbow Table tennis table", "Butterfly Centrefold 25 table"
)

New-Item -ItemType Directory -Force -Path ".\images" | Out-Null

$i = 1
foreach ($item in $items) {
    $query = [uri]::EscapeDataString($item)
    $url = "https://html.duckduckgo.com/html/?q=$query"
    try {
        $html = Invoke-WebRequest -Uri $url -Headers @{"User-Agent"="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"} -UseBasicParsing -TimeoutSec 10
        if ($html.Content -match 'src="//external-content\.duckduckgo\.com/iu/\?u=([^"&]+)') {
            $imgUrl = [uri]::UnescapeDataString($Matches[1])
            Invoke-WebRequest -Uri $imgUrl -OutFile ".\images\item$i.jpg" -UseBasicParsing -TimeoutSec 10 | Out-Null
            Write-Host "Downloaded image $i for $item from $imgUrl"
        } else {
            Write-Host "No image found for $item, using placeholder"
            Invoke-WebRequest -Uri "https://placehold.co/600x400/FFF/000?text=$query" -OutFile ".\images\item$i.jpg" -UseBasicParsing -TimeoutSec 10 | Out-Null
        }
    } catch {
        Write-Host "Error downloading $item, using placeholder"
        Invoke-WebRequest -Uri "https://placehold.co/600x400/FFF/000?text=$query" -OutFile ".\images\item$i.jpg" -UseBasicParsing -TimeoutSec 10 | Out-Null
    }
    $i++
}
Write-Host "Done downloading images."
