<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\product;

class productController extends Controller
{
    public function index()
    {
        $product = product::all();
        return response()->json(compact('product'), 200);
    }

    public function store(Request $request)
    {
        $id = $request->get('id');
        $getStok =  product::find($id);
        $a = $getStok->stok;

        if($a === 0 )
        {
            return response()->json(['error' => 'stok kosong'], 404);   
        }
        else
        {
            /* $getStok->stok = $getStok->stok - 1;
            $getStok->save(); */
            return response()->json(['sukses' => 'stok tersedia'], 200);
        }
    }

}


/*DB::table('products')->join('color_sizes', 'products.id', 'color_sizes.id_product')
                    ->select('products.id','products.name_product','products.type_product','products.price',
                    'products.desc','products.images','color_sizes.color',
                    'color_sizes.amount','color_sizes.size')
                    ->get();
*/