<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/helpers.php';
$dataset = load_dataset();
$export = [
    'exportedAt' => gmdate('c'),
    'stats' => calculate_stats($dataset),
    'dataset' => $dataset,
];
$filename = 'burmese_handwriting_dataset_' . gmdate('Ymd_His') . '.json';
header('Content-Type: application/json; charset=utf-8');
header('Content-Disposition: attachment; filename="' . $filename . '"');
echo json_encode($export, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
