<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/helpers.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['ok' => false, 'error' => 'POST required.'], 405);
}
save_dataset(default_dataset());
json_response(['ok' => true, 'stats' => calculate_stats(load_dataset())]);
