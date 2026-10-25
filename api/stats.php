<?php
declare(strict_types=1);
require_once __DIR__ . '/../includes/helpers.php';
json_response(['ok' => true, 'stats' => calculate_stats(load_dataset())]);
