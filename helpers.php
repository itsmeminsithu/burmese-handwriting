<?php
declare(strict_types=1);

const APP_VERSION = '0.3.0-php-python';
const DATA_FILE = __DIR__ . '/../data/attempts.json';

function json_response(array $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

function read_json_body(): array {
    $raw = file_get_contents('php://input') ?: '';
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        json_response(['ok' => false, 'error' => 'Invalid JSON request body.'], 400);
    }
    return $data;
}

function ensure_data_file(): void {
    $dir = dirname(DATA_FILE);
    if (!is_dir($dir)) mkdir($dir, 0775, true);
    if (!file_exists(DATA_FILE)) {
        file_put_contents(DATA_FILE, json_encode(default_dataset(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
    }
}

function default_dataset(): array {
    return [
        'appVersion' => APP_VERSION,
        'createdAt' => gmdate('c'),
        'attempts' => [],
    ];
}

function load_dataset(): array {
    ensure_data_file();
    $data = json_decode((string) file_get_contents(DATA_FILE), true);
    if (!is_array($data) || !isset($data['attempts']) || !is_array($data['attempts'])) {
        $data = default_dataset();
    }
    return $data;
}

function save_dataset(array $data): void {
    ensure_data_file();
    $data['appVersion'] = APP_VERSION;
    $data['updatedAt'] = gmdate('c');
    file_put_contents(DATA_FILE, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT), LOCK_EX);
}

function valid_base64_png(string $base64): bool {
    $bin = base64_decode($base64, true);
    return is_string($bin) && str_starts_with($bin, "\x89PNG\r\n\x1a\n");
}

function calculate_stats(array $dataset): array {
    $attempts = $dataset['attempts'] ?? [];
    $charStats = [];
    $streak = 0;
    $bestStreak = 0;
    $totalStars = 0;

    foreach ($attempts as $attempt) {
        $char = (string)($attempt['char'] ?? '');
        $stars = (int)($attempt['stars'] ?? 0);
        if ($stars < 1 || $stars > 5 || $char === '') continue;
        $totalStars += $stars;
        if (!isset($charStats[$char])) {
            $charStats[$char] = ['attempts' => 0, 'totalStars' => 0, 'bestStars' => 0, 'averageStars' => 0.0];
        }
        $charStats[$char]['attempts']++;
        $charStats[$char]['totalStars'] += $stars;
        $charStats[$char]['bestStars'] = max($charStats[$char]['bestStars'], $stars);

        if ($stars >= 3) {
            $streak++;
            $bestStreak = max($bestStreak, $streak);
        } else {
            $streak = 0;
        }
    }

    foreach ($charStats as &$stat) {
        $stat['averageStars'] = $stat['attempts'] > 0 ? round($stat['totalStars'] / $stat['attempts'], 2) : 0.0;
    }

    $totalAttempts = count($attempts);
    return [
        'appVersion' => APP_VERSION,
        'totalAttempts' => $totalAttempts,
        'averageStars' => $totalAttempts > 0 ? round($totalStars / $totalAttempts, 2) : 0.0,
        'streak' => $streak,
        'bestStreak' => $bestStreak,
        'charStats' => $charStats,
        'attempts' => $attempts,
    ];
}
