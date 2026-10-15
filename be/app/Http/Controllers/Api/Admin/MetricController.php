<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\MetricRequest;
use App\Http\Resources\MetricResource;
use App\Models\Metric;

class MetricController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $metrics = Metric::all();

        return MetricResource::collection($metrics);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MetricRequest $request)
    {
        $metric = Metric::create($request->validated());

        return response()->json([
            'message' => 'Metric added successfully',
            'data' => new MetricResource ($metric),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $metric = Metric::findOrFail($id);

        return new MetricResource($metric);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(MetricRequest $request, string $id)
    {
        $metric = Metric::findOrFail($id);

        $metric->update($request->validated());

        return response()->json([
            'message' => 'Metric edited successfully',
            'data' => new MetricResource($metric)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Metric::destroy($id);

        return response()->json(['message' => 'Metric deleted successfully']);
    }
}
