<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductVariant;

class ProductVariantSeeder extends Seeder
{
    public function run(): void
    {
        $variants = [
            // G.I. PIPE S40
            ['product' => 'G.I. Pipe S40', 'size' => '1/2', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 420.00],
            ['product' => 'G.I. Pipe S40', 'size' => '3/4', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 535.00],
            ['product' => 'G.I. Pipe S40', 'size' => '1', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 690.00],
            ['product' => 'G.I. Pipe S40', 'size' => '1 1/4', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 1100.00],
            ['product' => 'G.I. Pipe S40', 'size' => '1 1/2', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 1290.00],
            ['product' => 'G.I. Pipe S40', 'size' => '2', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 1795.00],
            ['product' => 'G.I. Pipe S40', 'size' => '2 1/2', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 1950.00],
            ['product' => 'G.I. Pipe S40', 'size' => '3', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 2450.00],
            ['product' => 'G.I. Pipe S40', 'size' => '4', 'type_series' => 'S40', 'unit' => 'per piece', 'price' => 3600.00],

            // G.I. PIPE S20
            ['product' => 'G.I. Pipe S20', 'size' => '1/2', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 320.00],
            ['product' => 'G.I. Pipe S20', 'size' => '3/4', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 430.00],
            ['product' => 'G.I. Pipe S20', 'size' => '1', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 650.00],
            ['product' => 'G.I. Pipe S20', 'size' => '1 1/4', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 720.00],
            ['product' => 'G.I. Pipe S20', 'size' => '1 1/2', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 920.00],
            ['product' => 'G.I. Pipe S20', 'size' => '2', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 1220.00],
            ['product' => 'G.I. Pipe S20', 'size' => '2 1/2', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 1980.00],
            ['product' => 'G.I. Pipe S20', 'size' => '3', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 2100.00],
            ['product' => 'G.I. Pipe S20', 'size' => '4', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 3150.00],

            // B.I. PIPE S20
            ['product' => 'B.I. Pipe S20', 'size' => '3/4', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 403.00],
            ['product' => 'B.I. Pipe S20', 'size' => '1', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 568.00],
            ['product' => 'B.I. Pipe S20', 'size' => '1 1/2', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 855.00],
            ['product' => 'B.I. Pipe S20', 'size' => '2', 'type_series' => 'S20', 'unit' => 'per piece', 'price' => 1150.00],

            // DEFORMED BAR
            ['product' => 'Deformed Bar', 'size' => '16mm', 'unit' => 'per piece', 'price' => 390.00],
            ['product' => 'Deformed Bar', 'size' => '12mm', 'unit' => 'per piece', 'price' => 210.00],
            ['product' => 'Deformed Bar', 'size' => '10mm', 'unit' => 'per piece', 'price' => 142.00],
            ['product' => 'Deformed Bar', 'size' => '9mm', 'type_series' => 'Standard', 'unit' => 'per piece', 'price' => 140.00],
            ['product' => 'Deformed Bar', 'size' => '8mm', 'unit' => 'per piece', 'price' => 115.00],

            // PLAIN ROUND BAR
            ['product' => 'Plain Round Bar', 'size' => '9mm', 'unit' => 'per piece', 'price' => 145.00],
            ['product' => 'Plain Round Bar', 'size' => '8mm', 'unit' => 'per piece', 'price' => 127.00],
            ['product' => 'Plain Round Bar', 'size' => '16mm', 'unit' => 'per piece', 'price' => 410.00],
            ['product' => 'Plain Round Bar', 'size' => '12mm', 'unit' => 'per piece', 'price' => 235.00],
            ['product' => 'Plain Round Bar', 'size' => '10mm', 'unit' => 'per piece', 'price' => 195.00],

            // SQUARE BAR
            ['product' => 'Square Bar', 'size' => '3/4', 'unit' => 'per piece', 'price' => 395.00],
            ['product' => 'Square Bar', 'size' => 'White', 'unit' => 'per piece', 'price' => 255.00],
            ['product' => 'Square Bar', 'size' => 'Yellow', 'unit' => 'per piece', 'price' => 185.00],
            ['product' => 'Square Bar', 'size' => 'Red', 'unit' => 'per piece', 'price' => 345.00],

            // CHANNEL BAR
            ['product' => 'Channel Bar', 'size' => '2x3', 'type_series' => 'H.D.', 'unit' => 'per piece', 'price' => 2250.00],

            // STEEL DECK
            ['product' => 'Steel Deck', 'size' => '0.8', 'unit' => 'per meter', 'price' => 650.00],
            ['product' => 'Steel Deck', 'size' => '1.0', 'unit' => 'per meter', 'price' => 750.00],

            // PLAIN SHEET
            ['product' => 'Plain Sheet', 'size' => '4x8', 'thickness' => '2.0mm', 'unit' => 'per sheet', 'price' => 2300.00],
            ['product' => 'Plain Sheet', 'size' => '4x8', 'thickness' => '1.0mm', 'unit' => 'per sheet', 'price' => 1380.00],

            // ANGLE BAR
            ['product' => 'Angle Bar', 'size' => '1/8 x 1', 'thickness' => '2mm', 'unit' => 'per piece', 'price' => 320.00],
            ['product' => 'Angle Bar', 'size' => '1/8 x 1 1/2', 'thickness' => '2mm', 'unit' => 'per piece', 'price' => 525.00],
            ['product' => 'Angle Bar', 'size' => '3/16 x 1', 'thickness' => '3mm', 'unit' => 'per piece', 'price' => 425.00],
            ['product' => 'Angle Bar', 'size' => '3/16 x 1 1/2', 'thickness' => '3mm', 'unit' => 'per piece', 'price' => 695.00],
            ['product' => 'Angle Bar', 'size' => '3/16 x 2', 'thickness' => '2.5mm', 'unit' => 'per piece', 'price' => 640.00],
            ['product' => 'Angle Bar', 'size' => '3/16 x 2', 'thickness' => '3mm', 'unit' => 'per piece', 'price' => 895.00],
            ['product' => 'Angle Bar', 'size' => '1/4 x 1', 'thickness' => '4mm', 'unit' => 'per piece', 'price' => 485.00],
            ['product' => 'Angle Bar', 'size' => '1/4 x 1', 'thickness' => '5mm', 'unit' => 'per piece', 'price' => 520.00],
            ['product' => 'Angle Bar', 'size' => '1/4 x 1 1/2', 'thickness' => '4mm', 'unit' => 'per piece', 'price' => 865.00],
            ['product' => 'Angle Bar', 'size' => '1/4 x 2', 'thickness' => '4mm', 'unit' => 'per piece', 'price' => 1180.00],
            ['product' => 'Angle Bar', 'size' => '1/4 x 2 1/2', 'thickness' => '5mm', 'unit' => 'per piece', 'price' => 1580.00],
            ['product' => 'Angle Bar', 'size' => '1/4 x 3', 'thickness' => '5mm', 'unit' => 'per piece', 'price' => 2380.00],

            // FLAT BAR
            ['product' => 'Flat Bar', 'size' => '1/4 x 1', 'thickness' => '4mm', 'unit' => 'per piece', 'price' => 290.00],
            ['product' => 'Flat Bar', 'size' => '1/4 x 1', 'thickness' => '3mm', 'unit' => 'per piece', 'price' => 255.00],
            ['product' => 'Flat Bar', 'size' => '1/4 x 1 1/4', 'unit' => 'per piece', 'price' => 465.00],
            ['product' => 'Flat Bar', 'size' => '1/4 x 1 1/2', 'unit' => 'per piece', 'price' => 530.00],
            ['product' => 'Flat Bar', 'size' => '1/4 x 2', 'unit' => 'per piece', 'price' => 745.00],
            ['product' => 'Flat Bar', 'size' => '1/4 x 2 1/2', 'unit' => 'per piece', 'price' => 965.00],
            ['product' => 'Flat Bar', 'size' => '1/4 x 3', 'unit' => 'per piece', 'price' => 1950.00],
            ['product' => 'Flat Bar', 'size' => '3/16 x 1/2', 'unit' => 'per piece', 'price' => 145.00],
            ['product' => 'Flat Bar', 'size' => '3/16 x 3/4', 'unit' => 'per piece', 'price' => 195.00],
            ['product' => 'Flat Bar', 'size' => '3/16 x 1', 'unit' => 'per piece', 'price' => 230.00],
            ['product' => 'Flat Bar', 'size' => '3/16 x 1 1/4', 'unit' => 'per piece', 'price' => 345.00],
            ['product' => 'Flat Bar', 'size' => '3/16 x 1 1/2', 'unit' => 'per piece', 'price' => 445.00],
            ['product' => 'Flat Bar', 'size' => '3/16 x 2', 'unit' => 'per piece', 'price' => 650.00],
            ['product' => 'Flat Bar', 'size' => '1/8 x 1', 'unit' => 'per piece', 'price' => 155.00],
            ['product' => 'Flat Bar', 'size' => '1/8 x 1 1/4', 'unit' => 'per piece', 'price' => 245.00],

            // METAL CLADDING
            ['product' => 'Metal Cladding', 'size' => '3ft x 8', 'unit' => 'per sheet', 'price' => 400.00],
            ['product' => 'Metal Cladding', 'size' => '3ft x 10', 'unit' => 'per sheet', 'price' => 500.00],
            ['product' => 'Metal Cladding', 'size' => '3ft x 12', 'unit' => 'per sheet', 'price' => 600.00],
            ['product' => 'Metal Cladding', 'size' => '1m x 8ft', 'unit' => 'per sheet', 'price' => 720.00],
            ['product' => 'Metal Cladding', 'size' => '1m x 10ft', 'unit' => 'per sheet', 'price' => 900.00],
            ['product' => 'Metal Cladding', 'size' => '1m x 12ft', 'unit' => 'per sheet', 'price' => 1080.00],
            ['product' => 'Metal Cladding', 'size' => 'per meter', 'unit' => 'per meter', 'price' => 350.00],

            // B.I. TUBULAR
            ['product' => 'B.I. Tubular', 'size' => '3/4 x 3/4', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 250.00],
            ['product' => 'B.I. Tubular', 'size' => '3/4 x 3/4', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 270.00],
            ['product' => 'B.I. Tubular', 'size' => '1 x 1', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 290.00],
            ['product' => 'B.I. Tubular', 'size' => '1 x 1', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 320.00],
            ['product' => 'B.I. Tubular', 'size' => '1 1/2 x 1 1/2', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 460.00],
            ['product' => 'B.I. Tubular', 'size' => '1 x 2', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 400.00],
            ['product' => 'B.I. Tubular', 'size' => '1 x 2', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 460.00],
            ['product' => 'B.I. Tubular', 'size' => '1 x 3', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 620.00],
            ['product' => 'B.I. Tubular', 'size' => '1 x 3', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 580.00],
            ['product' => 'B.I. Tubular', 'size' => '2 x 2', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 490.00],
            ['product' => 'B.I. Tubular', 'size' => '2 x 2', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 580.00],
            ['product' => 'B.I. Tubular', 'size' => '2 x 3', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 600.00],
            ['product' => 'B.I. Tubular', 'size' => '2 x 3', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 690.00],
            ['product' => 'B.I. Tubular', 'size' => '2 x 4', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 720.00],
            ['product' => 'B.I. Tubular', 'size' => '2 x 4', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 795.00],
            ['product' => 'B.I. Tubular', 'size' => '2 x 6', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 1330.00],

            // G.I. S-TUBE
            ['product' => 'G.I. S-Tube', 'size' => '4 x 4', 'thickness' => '2mm', 'unit' => 'per piece', 'price' => 2900.00],
            ['product' => 'G.I. S-Tube', 'size' => '4 x 4', 'thickness' => '3mm', 'unit' => 'per piece', 'price' => 3500.00],

            // G.I. CEPURLANES
            ['product' => 'G.I. Cepurlanes', 'size' => '2 x 3', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 450.00],
            ['product' => 'G.I. Cepurlanes', 'size' => '2 x 3', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 545.00],
            ['product' => 'G.I. Cepurlanes', 'size' => '2 x 4', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 560.00],
            ['product' => 'G.I. Cepurlanes', 'size' => '2 x 4', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 650.00],
            ['product' => 'G.I. Cepurlanes', 'size' => '2 x 6', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 680.00],
            ['product' => 'G.I. Cepurlanes', 'size' => '2 x 6', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 795.00],

            // B.I. CEPURLANES
            ['product' => 'B.I. Cepurlanes', 'size' => '2 x 3', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 370.00],
            ['product' => 'B.I. Cepurlanes', 'size' => '2 x 3', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 495.00],
            ['product' => 'B.I. Cepurlanes', 'size' => '2 x 4', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 575.00],
            ['product' => 'B.I. Cepurlanes', 'size' => '2 x 6', 'thickness' => '1.2', 'unit' => 'per piece', 'price' => 585.00],
            ['product' => 'B.I. Cepurlanes', 'size' => '2 x 6', 'thickness' => '1.5', 'unit' => 'per piece', 'price' => 645.00],

            // CYCLONE WIRE
            ['product' => 'Cyclone Wire', 'size' => '2 x 3ft', 'unit' => 'per roll', 'price' => 240.00],
            ['product' => 'Cyclone Wire', 'size' => '2 x 4ft', 'unit' => 'per roll', 'price' => 320.00],
            ['product' => 'Cyclone Wire', 'size' => '2 x 5ft', 'unit' => 'per roll', 'price' => 400.00],
            ['product' => 'Cyclone Wire', 'size' => '2 x 6ft', 'unit' => 'per roll', 'price' => 480.00],

            // STEEL MATTING
            ['product' => 'Steel Matting', 'size' => '4 x 8', 'thickness' => '3.5mm', 'unit' => 'per sheet', 'price' => 420.00],
            ['product' => 'Steel Matting', 'size' => '4 x 8', 'thickness' => '4.5mm', 'unit' => 'per sheet', 'price' => 620.00],
            ['product' => 'Steel Matting', 'size' => '4 x 8', 'thickness' => '5.5mm', 'unit' => 'per sheet', 'price' => 1050.00],

            // METAL FURRING
            ['product' => 'Wall Angle', 'unit' => 'per piece', 'price' => 205.00],
            ['product' => 'S-Furring', 'unit' => 'per piece', 'price' => 105.00],
            ['product' => 'D-Furring', 'unit' => 'per piece', 'price' => 135.00],
            ['product' => 'C-Channel', 'unit' => 'per piece', 'price' => 155.00],
            ['product' => 'Studs', 'size' => '2 x 3', 'unit' => 'per piece', 'price' => 155.00],
            ['product' => 'Batten', 'unit' => 'per piece', 'price' => 205.00],
            ['product' => 'W-Clip', 'unit' => 'per piece', 'price' => 8.00],

            // CULVERT
            ['product' => 'Culvert', 'size' => '6"', 'unit' => 'per piece', 'price' => 320.00],
            ['product' => 'Culvert', 'size' => '8"', 'unit' => 'per piece', 'price' => 420.00],
            ['product' => 'Culvert', 'size' => '10"', 'unit' => 'per piece', 'price' => 520.00],
            ['product' => 'Culvert', 'size' => '12"', 'unit' => 'per piece', 'price' => 750.00],
            ['product' => 'Culvert', 'size' => '18"', 'unit' => 'per piece', 'price' => 1200.00],
            ['product' => 'Culvert', 'size' => '24"', 'unit' => 'per piece', 'price' => 1550.00],
            ['product' => 'Culvert', 'size' => '36"', 'unit' => 'per piece', 'price' => 2900.00],
            ['product' => 'Culvert', 'size' => '48"', 'unit' => 'per piece', 'price' => 4500.00],

            // WELDING ROD
            ['product' => 'Mega Weld 6013 Special', 'unit' => 'per kilo', 'price' => 145.00],
            ['product' => 'Mega Weld 6011 Special', 'unit' => 'per kilo', 'price' => 160.00],
            ['product' => 'Nihon 6013 Special', 'unit' => 'per kilo', 'price' => 170.00],
            ['product' => 'Nihon 6011 Special', 'unit' => 'per kilo', 'price' => 185.00],
            ['product' => 'Nihon 6011 Ordinary', 'unit' => 'per kilo', 'price' => 170.00],
            ['product' => 'Nihon W-55', 'unit' => 'per kilo', 'price' => 125.00],

            // G.I. FITTINGS
            ['product' => 'G.I. Close Nipple', 'size' => '1/2', 'type_series' => '#1', 'unit' => 'per piece', 'price' => 15.00],
            ['product' => 'G.I. Nipple', 'size' => '1/2', 'type_series' => '#2', 'unit' => 'per piece', 'price' => 20.00],
            ['product' => 'G.I. Nipple', 'size' => '1/2', 'type_series' => '#3', 'unit' => 'per piece', 'price' => 25.00],
            ['product' => 'G.I. Nipple', 'size' => '1/2', 'type_series' => '#4', 'unit' => 'per piece', 'price' => 30.00],
            ['product' => 'G.I. Nipple', 'size' => '1/2', 'type_series' => '#5', 'unit' => 'per piece', 'price' => 35.00],
            ['product' => 'G.I. Nipple', 'size' => '1/2', 'type_series' => '#6', 'unit' => 'per piece', 'price' => 38.00],
            ['product' => 'G.I. Nipple', 'size' => '1/2', 'type_series' => '#8', 'unit' => 'per piece', 'price' => 45.00],
            ['product' => 'G.I. Nipple', 'size' => '1/2', 'type_series' => '#10', 'unit' => 'per piece', 'price' => 48.00],
            ['product' => 'G.I. Nipple', 'size' => '1/2', 'type_series' => '#12', 'unit' => 'per piece', 'price' => 58.00],
            ['product' => 'G.I. Coupling', 'size' => '1/2', 'unit' => 'per piece', 'price' => 15.00],
            ['product' => 'G.I. Elbow', 'size' => '1/2', 'unit' => 'per piece', 'price' => 15.00],
            ['product' => 'G.I. Tee', 'size' => '1/2', 'unit' => 'per piece', 'price' => 15.00],
            ['product' => 'G.I. ST. Elbow', 'size' => '1/2', 'unit' => 'per piece', 'price' => 15.00],
            ['product' => 'G.I. Union', 'size' => '1/2', 'unit' => 'per piece', 'price' => 45.00],
            ['product' => 'G.I. Cap', 'size' => '1/2', 'unit' => 'per piece', 'price' => 12.00],
            ['product' => 'G.I. Plug', 'size' => '1/2', 'unit' => 'per piece', 'price' => 12.00],

            // GATE & BALL VALVE
            ['product' => 'Gate Valve', 'size' => '1/2', 'type_series' => 'Bona Brass', 'unit' => 'per piece', 'price' => 255.00],
            ['product' => 'Gate Valve', 'size' => '1/2', 'type_series' => 'Great Volume GV', 'unit' => 'per piece', 'price' => 225.00],
            ['product' => 'Gate Valve', 'size' => '1/2', 'type_series' => 'Open Shut', 'unit' => 'per piece', 'price' => 185.00],
            ['product' => 'Gate Valve', 'size' => '1/2', 'type_series' => 'Sakita', 'unit' => 'per piece', 'price' => 225.00],
            ['product' => 'Ball Valve', 'size' => '1/2', 'type_series' => 'Bona Brass', 'unit' => 'per piece', 'price' => 350.00],
            ['product' => 'Ball Valve', 'size' => '1/2', 'type_series' => 'Hong Yuan', 'unit' => 'per piece', 'price' => 135.00],
            ['product' => 'Stop Cock', 'size' => '1/2', 'unit' => 'per piece', 'price' => 145.00],
            ['product' => 'Check Valve', 'size' => '1/2', 'type_series' => 'Bona Brass', 'unit' => 'per piece', 'price' => 195.00],

            // PPR
            ['product' => 'PPR Pipe', 'size' => '1/2', 'unit' => 'per piece', 'price' => 250.00],
            ['product' => 'PPR Plain Coupling', 'size' => '1/2', 'unit' => 'per piece', 'price' => 25.00],
            ['product' => 'PPR Plain Tee', 'size' => '1/2', 'unit' => 'per piece', 'price' => 35.00],
            ['product' => 'PPR Plain Elbow', 'size' => '1/2', 'unit' => 'per piece', 'price' => 28.00],
            ['product' => 'PPR Male Elbow', 'size' => '1/2', 'unit' => 'per piece', 'price' => 165.00],
            ['product' => 'PPR Male Tee', 'size' => '1/2', 'unit' => 'per piece', 'price' => 195.00],
            ['product' => 'PPR Male Adaptor', 'size' => '1/2', 'unit' => 'per piece', 'price' => 140.00],
            ['product' => 'PPR Female Elbow', 'size' => '1/2', 'unit' => 'per piece', 'price' => 155.00],
            ['product' => 'PPR Female Tee', 'size' => '1/2', 'unit' => 'per piece', 'price' => 160.00],
            ['product' => 'PPR Female Adaptor', 'size' => '1/2', 'unit' => 'per piece', 'price' => 110.00],
            ['product' => 'Ball Cock', 'unit' => 'per piece', 'price' => 610.00],

            // PVC
            ['product' => 'PVC Blue Pipe', 'size' => '3/4', 'unit' => 'per piece', 'price' => 85.00],
            ['product' => 'PVC Blue Pipe', 'size' => '1/2', 'unit' => 'per piece', 'price' => 85.00],
            ['product' => 'PVC Ball Valve', 'size' => '3/4', 'unit' => 'per piece', 'price' => 65.00],
            ['product' => 'PVC Plain Tee', 'size' => '3/4', 'unit' => 'per piece', 'price' => 35.00],
            ['product' => 'PVC Plain Tee', 'size' => '1/2', 'unit' => 'per piece', 'price' => 18.00],
            ['product' => 'PVC Plain Elbow', 'size' => '3/4', 'unit' => 'per piece', 'price' => 25.00],
            ['product' => 'PVC Plain Elbow', 'size' => '1/2', 'unit' => 'per piece', 'price' => 18.00],
            ['product' => 'PVC Plain Coupling', 'size' => '3/4', 'unit' => 'per piece', 'price' => 20.00],
            ['product' => 'PVC Plain Coupling', 'size' => '1/2', 'unit' => 'per piece', 'price' => 15.00],
            ['product' => 'PVC Female Adaptor', 'size' => '3/4', 'unit' => 'per piece', 'price' => 30.00],
            ['product' => 'PVC Female Adaptor', 'size' => '1/2', 'unit' => 'per piece', 'price' => 12.00],

            // PVC Series 1000
            ['product' => 'PVC Tee Series 1000', 'size' => '#2', 'unit' => 'per piece', 'price' => 70.00],
            ['product' => 'PVC Tee Series 1000', 'size' => '#3', 'unit' => 'per piece', 'price' => 145.00],
            ['product' => 'PVC Tee Series 1000', 'size' => '#4', 'unit' => 'per piece', 'price' => 205.00],
            ['product' => 'PVC Elbow Series 1000', 'size' => '#2', 'type_series' => '90deg', 'unit' => 'per piece', 'price' => 65.00],
            ['product' => 'PVC Elbow Series 1000', 'size' => '#3', 'type_series' => '90deg', 'unit' => 'per piece', 'price' => 105.00],
            ['product' => 'PVC Elbow Series 1000', 'size' => '#4', 'type_series' => '90deg', 'unit' => 'per piece', 'price' => 150.00],
            ['product' => 'PVC Elbow Series 1000', 'size' => '#2', 'type_series' => '45deg', 'unit' => 'per piece', 'price' => 55.00],
            ['product' => 'PVC Elbow Series 1000', 'size' => '#3', 'type_series' => '45deg', 'unit' => 'per piece', 'price' => 80.00],
            ['product' => 'PVC Elbow Series 1000', 'size' => '#4', 'type_series' => '45deg', 'unit' => 'per piece', 'price' => 120.00],
            ['product' => 'PVC Coupling Series 1000', 'size' => '#2', 'unit' => 'per piece', 'price' => 50.00],
            ['product' => 'PVC Coupling Series 1000', 'size' => '#3', 'unit' => 'per piece', 'price' => 75.00],
            ['product' => 'PVC Coupling Series 1000', 'size' => '#4', 'unit' => 'per piece', 'price' => 95.00],
            ['product' => 'PVC P-Trap', 'size' => '#2', 'unit' => 'per piece', 'price' => 85.00],
            ['product' => 'PVC P-Trap', 'size' => '#3', 'unit' => 'per piece', 'price' => 125.00],
            ['product' => 'PVC P-Trap', 'size' => '#4', 'unit' => 'per piece', 'price' => 130.00],
            ['product' => 'PVC Clean-Out', 'size' => '#2', 'unit' => 'per piece', 'price' => 40.00],
            ['product' => 'PVC Clean-Out', 'size' => '#3', 'unit' => 'per piece', 'price' => 55.00],
            ['product' => 'PVC Clean-Out', 'size' => '#4', 'unit' => 'per piece', 'price' => 75.00],

            // NAILS
            ['product' => 'Common Nail', 'size' => '#1', 'unit' => 'per kilo', 'price' => 80.00],
            ['product' => 'Common Nail', 'size' => '#1 1/2', 'unit' => 'per kilo', 'price' => 80.00],
            ['product' => 'Common Nail', 'size' => '#2', 'unit' => 'per kilo', 'price' => 80.00],
            ['product' => 'Common Nail', 'size' => '#2 1/2', 'unit' => 'per kilo', 'price' => 80.00],
            ['product' => 'Common Nail', 'size' => '#3', 'unit' => 'per kilo', 'price' => 80.00],
            ['product' => 'Common Nail', 'size' => '#4', 'unit' => 'per kilo', 'price' => 80.00],
            ['product' => 'Finishing Nail', 'size' => '#1', 'unit' => 'per kilo', 'price' => 90.00],
            ['product' => 'Finishing Nail', 'size' => '#1 1/2', 'unit' => 'per kilo', 'price' => 90.00],
            ['product' => 'Finishing Nail', 'size' => '#2', 'unit' => 'per kilo', 'price' => 90.00],
            ['product' => 'Finishing Nail', 'size' => '#2 1/2', 'unit' => 'per kilo', 'price' => 90.00],
            ['product' => 'Umbrella Nail', 'size' => '#2', 'unit' => 'per kilo', 'price' => 90.00],
            ['product' => 'Umbrella Nail', 'size' => '#2 1/2', 'unit' => 'per kilo', 'price' => 90.00],

            // PLYWOOD
            ['product' => 'Plywood Ordinary', 'size' => '5mm', 'type_series' => 'Sub-standard', 'unit' => 'per sheet', 'price' => 350.00],
            ['product' => 'Plywood Ordinary', 'size' => '1/2', 'type_series' => 'Sub-standard', 'unit' => 'per sheet', 'price' => 590.00],
            ['product' => 'Plywood Ordinary', 'size' => 'Plyboard', 'unit' => 'per sheet', 'price' => 920.00],
            ['product' => 'Plywood Marine', 'size' => '5mm', 'type_series' => 'Sub-standard', 'unit' => 'per sheet', 'price' => 410.00],
            ['product' => 'Plywood Marine', 'size' => '1/2', 'type_series' => 'Sub-standard', 'unit' => 'per sheet', 'price' => 670.00],
            ['product' => 'Plywood Marine', 'size' => '3/4', 'unit' => 'per sheet', 'price' => 980.00],
            ['product' => 'GRC Board', 'size' => '3.5mm', 'unit' => 'per sheet', 'price' => 350.00],
            ['product' => 'GRC Board', 'size' => '4.5mm', 'unit' => 'per sheet', 'price' => 430.00],

            // MISC
            ['product' => 'Nylon Rope', 'size' => '#24', 'unit' => 'per meter', 'price' => 18.00],
            ['product' => 'Nylon Rope', 'size' => '#22', 'unit' => 'per meter', 'price' => 16.00],
            ['product' => 'Nylon Rope', 'size' => '#20', 'unit' => 'per meter', 'price' => 15.00],
            ['product' => 'Nylon Rope', 'size' => '#18', 'unit' => 'per meter', 'price' => 13.00],
            ['product' => 'Sink Stallion', 'size' => '14 x 20', 'unit' => 'per piece', 'price' => 380.00],
            ['product' => 'Sink Stallion', 'size' => '16 x 24', 'unit' => 'per piece', 'price' => 420.00],
            ['product' => 'Insulation Foam', 'size' => '5mm', 'type_series' => 'Double', 'unit' => 'per meter', 'price' => 95.00],
            ['product' => 'Insulation Foam', 'size' => '5mm', 'type_series' => 'Single', 'unit' => 'per meter', 'price' => 55.00],
        ];

        foreach ($variants as $v) {
            $product = Product::where('name', $v['product'])->first();
            if (!$product) continue;

            ProductVariant::firstOrCreate([
                'product_id'  => $product->id,
                'size'        => $v['size'] ?? null,
                'type_series' => $v['type_series'] ?? null,
                'thickness'   => $v['thickness'] ?? null,
            ], [
                'unit'                => $v['unit'] ?? 'per piece',
                'price'               => $v['price'] ?? null,
                'stock_quantity'      => 0,
                'low_stock_threshold' => 5,
            ]);
        }
    }
}