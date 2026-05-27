<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // G.I. Pipe
            ['category' => 'G.I. Pipe', 'name' => 'G.I. Pipe S40'],
            ['category' => 'G.I. Pipe', 'name' => 'G.I. Pipe S20'],
            // B.I. Pipe
            ['category' => 'B.I. Pipe', 'name' => 'B.I. Pipe S40'],
            ['category' => 'B.I. Pipe', 'name' => 'B.I. Pipe S20'],
            // Deformed Bar
            ['category' => 'Deformed Bar', 'name' => 'Deformed Bar'],
            // Plain Round Bar
            ['category' => 'Plain Round Bar', 'name' => 'Plain Round Bar'],
            // Square Bar
            ['category' => 'Square Bar', 'name' => 'Square Bar'],
            // Angle Bar
            ['category' => 'Angle Bar', 'name' => 'Angle Bar'],
            // Flat Bar
            ['category' => 'Flat Bar', 'name' => 'Flat Bar'],
            // Channel Bar
            ['category' => 'Channel Bar', 'name' => 'Channel Bar'],
            // Steel Deck
            ['category' => 'Steel Deck', 'name' => 'Steel Deck'],
            // Plain Sheet
            ['category' => 'Plain Sheet', 'name' => 'Plain Sheet'],
            // Metal Cladding
            ['category' => 'Metal Cladding', 'name' => 'Metal Cladding'],
            // B.I. Tubular
            ['category' => 'B.I. Tubular', 'name' => 'B.I. Tubular'],
            // G.I. S-Tube
            ['category' => 'G.I. S-Tube', 'name' => 'G.I. S-Tube'],
            // G.I. Cepurlanes
            ['category' => 'G.I. Cepurlanes', 'name' => 'G.I. Cepurlanes'],
            // B.I. Cepurlanes
            ['category' => 'B.I. Cepurlanes', 'name' => 'B.I. Cepurlanes'],
            // Cyclone Wire
            ['category' => 'Cyclone Wire', 'name' => 'Cyclone Wire'],
            // Steel Matting
            ['category' => 'Steel Matting', 'name' => 'Steel Matting'],
            // Metal Furring
            ['category' => 'Metal Furring', 'name' => 'Wall Angle'],
            ['category' => 'Metal Furring', 'name' => 'S-Furring'],
            ['category' => 'Metal Furring', 'name' => 'D-Furring'],
            ['category' => 'Metal Furring', 'name' => 'C-Channel'],
            ['category' => 'Metal Furring', 'name' => 'Studs'],
            ['category' => 'Metal Furring', 'name' => 'Batten'],
            ['category' => 'Metal Furring', 'name' => 'W-Clip'],
            // Wire & Screen
            ['category' => 'Wire & Screen', 'name' => 'Thick Screen'],
            ['category' => 'Wire & Screen', 'name' => 'Thin Screen'],
            ['category' => 'Wire & Screen', 'name' => 'Mosquito Screen (Opal)'],
            ['category' => 'Wire & Screen', 'name' => "Orchid's Net"],
            ['category' => 'Wire & Screen', 'name' => 'Plastic Screen Green'],
            ['category' => 'Wire & Screen', 'name' => 'Insulation Foam'],
            // Culvert
            ['category' => 'Culvert', 'name' => 'Culvert'],
            // Welding Rod
            ['category' => 'Welding Rod', 'name' => 'Mega Weld 6013 Special'],
            ['category' => 'Welding Rod', 'name' => 'Mega Weld 6011 Special'],
            ['category' => 'Welding Rod', 'name' => 'Nihon 6013 Special'],
            ['category' => 'Welding Rod', 'name' => 'Nihon 6011 Special'],
            ['category' => 'Welding Rod', 'name' => 'Nihon 6011 Ordinary'],
            ['category' => 'Welding Rod', 'name' => 'Nihon W-55'],
            // G.I. Fittings
            ['category' => 'G.I. Fittings', 'name' => 'G.I. Close Nipple'],
            ['category' => 'G.I. Fittings', 'name' => 'G.I. Nipple'],
            ['category' => 'G.I. Fittings', 'name' => 'G.I. Coupling'],
            ['category' => 'G.I. Fittings', 'name' => 'G.I. Elbow'],
            ['category' => 'G.I. Fittings', 'name' => 'G.I. Tee'],
            ['category' => 'G.I. Fittings', 'name' => 'G.I. ST. Elbow'],
            ['category' => 'G.I. Fittings', 'name' => 'G.I. Union'],
            ['category' => 'G.I. Fittings', 'name' => 'G.I. Cap'],
            ['category' => 'G.I. Fittings', 'name' => 'G.I. Plug'],
            // Gate & Ball Valve
            ['category' => 'Gate & Ball Valve', 'name' => 'Gate Valve'],
            ['category' => 'Gate & Ball Valve', 'name' => 'Ball Valve'],
            ['category' => 'Gate & Ball Valve', 'name' => 'Stop Cock'],
            ['category' => 'Gate & Ball Valve', 'name' => 'Check Valve'],
            // PPR
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Pipe'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Plain Coupling'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Plain Tee'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Plain Elbow'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Male Elbow'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Male Tee'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Male Adaptor'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Female Elbow'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Female Tee'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'PPR Female Adaptor'],
            ['category' => 'PPR Pipe & Fittings', 'name' => 'Ball Cock'],
            // PVC
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Blue Pipe'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Ball Valve'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Elbow with Thread'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Plain Tee'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Plain Elbow'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Plain Coupling'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Male Adaptor'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Female Adaptor'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Tee Series 1000'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Tee Reducer Series 1000'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Wye Series 1000'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Wye Reducer Series 1000'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Elbow Series 1000'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Elbow Series 900'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Tee Reducer'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Tee'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Wye Reducer'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Wye'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Bushing Reducer'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC P-Trap'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Clean-Out'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Coupling Series 1000'],
            ['category' => 'PVC Pipe & Fittings', 'name' => 'PVC Coupling'],
            // PE
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Black Pipe'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Blue Pipe'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Coupling'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Elbow'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Tee'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Male Adaptor'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Female Adaptor'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Male Elbow'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Male Tee'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Female Elbow'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Female Tee'],
            ['category' => 'P.E. Fittings', 'name' => 'P.E. Plug'],
            // Nails
            ['category' => 'Nails', 'name' => 'Common Nail'],
            ['category' => 'Nails', 'name' => 'Finishing Nail'],
            ['category' => 'Nails', 'name' => 'Umbrella Nail'],
            // Plywood
            ['category' => 'Plywood & Board', 'name' => 'Plywood Ordinary'],
            ['category' => 'Plywood & Board', 'name' => 'Plywood Marine'],
            ['category' => 'Plywood & Board', 'name' => 'GRC Board'],
            // Misc
            ['category' => 'Miscellaneous', 'name' => 'Nylon Rope'],
            ['category' => 'Miscellaneous', 'name' => 'Sink Stallion'],
            ['category' => 'Miscellaneous', 'name' => 'Tent Black'],
        ];

        foreach ($products as $p) {
            $cat = Category::where('name', $p['category'])->first();
            if ($cat) {
                Product::firstOrCreate(
                    ['name' => $p['name'], 'category_id' => $cat->id]
                );
            }
        }
    }
}