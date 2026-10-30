<?php

namespace Database\Factories;

use App\Models\Metric;
use Illuminate\Database\Eloquent\Factories\Factory;

class MetricFactory extends Factory
{
    protected $model = Metric::class;

    private static int $order = 0;
    private static string $currentBusinessType = 'software';

    private static array $catalogs = [
        'software' => [
            ['label' => 'Projects Delivered', 'value' => 142, 'suffix' => '+'],
            ['label' => 'Active Clients', 'value' => 38, 'suffix' => ''],
            ['label' => 'Team Members', 'value' => 45, 'suffix' => ''],
            ['label' => 'Years in Business', 'value' => 8, 'suffix' => ''],
        ],
        'creative' => [
            ['label' => 'Brands Launched', 'value' => 87, 'suffix' => '+'],
            ['label' => 'Design Awards', 'value' => 12, 'suffix' => ''],
            ['label' => 'Client Retention', 'value' => 94, 'suffix' => '%'],
            ['label' => 'Team Size', 'value' => 18, 'suffix' => ''],
        ],
        'property' => [
            ['label' => 'Properties Sold', 'value' => 320, 'suffix' => '+'],
            ['label' => 'Total Sales Volume', 'value' => 480, 'suffix' => 'M+'],
            ['label' => 'Active Listings', 'value' => 45, 'suffix' => ''],
            ['label' => 'Client Satisfaction', 'value' => 98, 'suffix' => '%'],
        ],
        'engineering' => [
            ['label' => 'Projects Completed', 'value' => 215, 'suffix' => '+'],
            ['label' => 'Total Sq Ft Engineered', 'value' => 12, 'suffix' => 'M+'],
            ['label' => 'Licensed Engineers', 'value' => 28, 'suffix' => ''],
            ['label' => 'Safety Record', 'value' => 100, 'suffix' => '%'],
        ],
        'small_business' => [
            ['label' => 'Businesses Helped', 'value' => 267, 'suffix' => '+'],
            ['label' => 'Revenue Growth Avg', 'value' => 340, 'suffix' => '%'],
            ['label' => 'Client Retention', 'value' => 91, 'suffix' => '%'],
            ['label' => 'Years Experience', 'value' => 15, 'suffix' => ''],
        ],
    ];

    public static function setBusinessType(string $type): void
    {
        self::$currentBusinessType = $type;
        self::$order = 0;
    }

    public function definition(): array
    {
        $catalog = self::$catalogs[self::$currentBusinessType] ?? self::$catalogs['software'];
        $item = $catalog[self::$order % count($catalog)];

        return [
            'label' => $item['label'],
            'value' => $item['value'],
            'suffix' => $item['suffix'],
            'order' => self::$order++,
            'is_active' => true,
        ];
    }
}