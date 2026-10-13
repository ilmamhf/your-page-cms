<?php

namespace App\Http\Controllers;

use App\Models\Portofolio;
use Illuminate\Http\Request;

class PortofolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $portofolios = Portofolio::all();

        return response()->json($portofolios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'string',
            'image_url' => 'string',
            'order' => 'required|numeric',
            'is_active' => 'required|boolean'
        ]);

        $portofolio = Portofolio::create($validated);

        return response()->json($portofolio);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $portofolio = Portofolio::findOrFail($id);

        return response()->json($portofolio);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $portofolio = Portofolio::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'string',
            'image_url' => 'string',
            'order' => 'required|numeric',
            'is_active' => 'required|boolean'
        ]);

        $portofolio->update($validated);

        return response()->json($portofolio);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Portofolio::destroy($id);

        return response()->json(['message' => 'Deleted Successfully']);
    }
}
