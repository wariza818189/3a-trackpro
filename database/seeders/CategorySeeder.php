<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'G.I. Pipe', 'description' => 'Galvanized Iron Pipes'],
            ['name' => 'B.I. Pipe', 'description' => 'Black Iron Pipes'],
            ['name' => 'Deformed Bar', 'description' => 'Deformed Steel Bars'],
            ['name' => 'Plain Round Bar', 'description' => 'Plain Round Steel Bars'],
            ['name' => 'Square Bar', 'description' => 'Square Steel Bars'],
            ['name' => 'Angle Bar', 'description' => 'Angle Steel Bars'],
            ['name' => 'Flat Bar', 'description' => 'Flat Steel Bars'],
            ['name' => 'Channel Bar', 'description' => 'Channel Steel Bars'],
            ['name' => 'Steel Deck', 'description' => 'Steel Deck Sheets'],
            ['name' => 'Plain Sheet', 'description' => 'Plain Steel Sheets'],
            ['name' => 'Metal Cladding', 'description' => 'Metal Cladding Sheets'],
            ['name' => 'B.I. Tubular', 'description' => 'Black Iron Tubular'],
            ['name' => 'G.I. S-Tube', 'description' => 'Galvanized Iron Square Tube'],
            ['name' => 'G.I. Cepurlanes', 'description' => 'G.I. Cepurlanes'],
            ['name' => 'B.I. Cepurlanes', 'description' => 'B.I. Cepurlanes'],
            ['name' => 'Cyclone Wire', 'description' => 'Cyclone Wire Fencing'],
            ['name' => 'Steel Matting', 'description' => 'Steel Matting Sheets'],
            ['name' => 'Metal Furring', 'description' => 'Metal Furring Components'],
            ['name' => 'Wire & Screen', 'description' => 'Various Wire and Screen Products'],
            ['name' => 'Culvert', 'description' => 'Culvert Pipes'],
            ['name' => 'Welding Rod', 'description' => 'Welding Rods'],
            ['name' => 'G.I. Fittings', 'description' => 'G.I. Pipe Fittings'],
            ['name' => 'Gate & Ball Valve', 'description' => 'Gate Valves and Ball Valves'],
            ['name' => 'PPR Pipe & Fittings', 'description' => 'PPR Pipes and Fittings'],
            ['name' => 'PVC Pipe & Fittings', 'description' => 'PVC Pipes and Fittings'],
            ['name' => 'P.E. Fittings', 'description' => 'Polyethylene Pipe Fittings'],
            ['name' => 'Nails', 'description' => 'Common, Finishing, and Umbrella Nails'],
            ['name' => 'Plywood & Board', 'description' => 'Plywood and GRC Boards'],
            ['name' => 'Miscellaneous', 'description' => 'Nylon Rope, Sink, Tent, Insulation'],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['name' => $cat['name']], $cat);
        }
    }
}