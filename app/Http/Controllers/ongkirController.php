<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\province;
use App\courier;
use App\city;
use App\company;
use Kavist\RajaOngkir\Facades\RajaOngkir;

class ongkirController extends Controller
{
    public function courierProvince()
    {
        $courier = courier::all();
        $province = province::all();
        return response()->json(compact('province','courier'), 200); 
    }

    public function getCity(Request $request)
    {
        $id_province = $request->id;
        $city = city::where('province_id', $id_province)->get();
        
        return response()->json(compact('city'), 200);
    }

    public function getCost(Request $request)
    {

        $cost = RajaOngkir::ongkosKirim([
            'origin'        => 153,     // ID kota/kabupaten asal
            'destination'   => $request->destination,      // ID kota/kabupaten tujuan
            'weight'        => 1300,    // berat barang dalam gram
            'courier'       => $request->courier    // kode kurir pengiriman: ['jne', 'tiki', 'pos'] untuk starter
        ])->get();
        
        
        return response()->json(compact('cost'), 200);

    }
}
