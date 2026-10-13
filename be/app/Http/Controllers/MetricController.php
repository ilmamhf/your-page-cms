<?php

namespace App\Http\Controllers;

use App\Models\Metric;
use Illuminate\Http\Request;

class MetricController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $metrics = Metric::all();

        return response()->json($metrics);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|string|max:20',
            'value' => 'required|numeric',
            'suffix' => 'string',
            'order' => 'required|numeric',
            'is_active' => 'required|boolean'
        ]);

        $metric = Metric::create($validated);

        return response()->json($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $metric = Metric::findOrFail($id);

        return response()->json($metric);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $metric = Metric::findOrFail($id);

        $validated = $request->validate([
            'label' => 'required|string|max:20',
            'value' => 'required|numeric',
            'suffix' => 'string',
            'order' => 'required|numeric',
            'is_active' => 'required|boolean'
        ]);

        $metric->update($validated);

        return response()->json($metric);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Metric::destroy($id);

        return response()->json(['message' => 'Deleted successfully']);
    }
}
