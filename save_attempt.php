<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/helpers.php';

$payload = read_json_body();
$char = trim((string)($payload['char'] ?? ''));
$roman = trim((string)($payload['roman'] ?? ''));
$stars = (int)($payload['stars'] ?? 0);
$feedback = trim((string)($payload['feedback'] ?? ''));
$imageBase64 = (string)($payload['imageBase64'] ?? '');
$metadata = is_array($payload['metadata'] ?? null) ? $payload['metadata'] : [];

if ($char === '' || $stars < 1 || $stars > 5 || $imageBase64 === '') {
    json_response(['ok' => false, 'error' => 'Invalid attempt data.'], 422);
}
if (!valid_base64_png($imageBase64)) {
    json_response(['ok' => false, 'error' => 'imageBase64 must be a PNG image.'], 422);
}

$dataset = load_dataset();
$dataset['attempts'][] = [
    'id' => uniqid('attempt_', true),
    'appVersion' => APP_VERSION,
    'char' => $char,
    'roman' => $roman,
    'stars' => $stars,
    'feedback' => $feedback,
    'coverage' => isset($payload['coverage']) ? (float)$payload['coverage'] : null,
    'metadata' => [
        'strokeCount' => (int)($metadata['strokeCount'] ?? 0),
        'durationMs' => (int)($metadata['durationMs'] ?? 0),
        'canvasWidth' => (int)($metadata['canvasWidth'] ?? 0),
        'canvasHeight' => (int)($metadata['canvasHeight'] ?? 0),
        'penSize' => (int)($metadata['penSize'] ?? 0),
        'strokes' => $metadata['strokes'] ?? [],
    ],
    'imageBase64' => $imageBase64,
    'timestamp' => gmdate('c'),
];

save_dataset($dataset);
json_response(['ok' => true, 'stats' => calculate_stats($dataset)]);
