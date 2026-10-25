<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/helpers.php';

$payload = read_json_body();
$imageBase64 = (string)($payload['imageBase64'] ?? '');
$targetChar = trim((string)($payload['char'] ?? ''));
$targetRoman = trim((string)($payload['roman'] ?? ''));
$metadata = is_array($payload['metadata'] ?? null) ? $payload['metadata'] : [];

if ($targetChar === '' || $imageBase64 === '') {
    json_response(['ok' => false, 'error' => 'Missing char or imageBase64.'], 422);
}
if (!valid_base64_png($imageBase64)) {
    json_response(['ok' => false, 'error' => 'imageBase64 must be a PNG image.'], 422);
}

$temp = tempnam(sys_get_temp_dir(), 'bhw_');
$pngPath = $temp . '.png';
rename($temp, $pngPath);
file_put_contents($pngPath, base64_decode($imageBase64));

$cmd = [
    'python3',
    __DIR__ . '/../scripts/scorer.py',
    '--image', $pngPath,
    '--char', $targetChar,
    '--roman', $targetRoman,
    '--stroke-count', (string)($metadata['strokeCount'] ?? 0),
    '--duration-ms', (string)($metadata['durationMs'] ?? 0),
];

$descriptorSpec = [1 => ['pipe', 'w'], 2 => ['pipe', 'w']];
$process = proc_open($cmd, $descriptorSpec, $pipes);
if (!is_resource($process)) {
    @unlink($pngPath);
    json_response(['ok' => false, 'error' => 'Could not start Python scorer.'], 500);
}
$output = stream_get_contents($pipes[1]);
$error = stream_get_contents($pipes[2]);
fclose($pipes[1]); fclose($pipes[2]);
$exitCode = proc_close($process);
@unlink($pngPath);

if ($exitCode !== 0) {
    json_response(['ok' => false, 'error' => 'Python scorer failed.', 'details' => trim($error)], 500);
}

$result = json_decode($output, true);
if (!is_array($result)) {
    json_response(['ok' => false, 'error' => 'Python scorer returned invalid JSON.'], 500);
}

json_response(['ok' => true, 'result' => $result]);
