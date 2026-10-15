<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceRequest;
use App\Http\Resources\ServiceResource;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();

        return ServiceResource::collection($services);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ServiceRequest $request)
    {
        $service = Service::create($request->validated());

        return response()->json([
            ['message' => 'Service added successfully'],
            'data' => new ServiceResource($service)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $service = Service::findOrFail($id);
        return new ServiceResource($service);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ServiceRequest $request, string $id)
    {
        $service = Service::findOrFail($id);

        $service->update($request->validated());

        return response()->json([
            'message' => 'Service edited successfully',
            'data' => new ServiceResource($service)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Service::destroy($id);

        return response()->json(['message'=>'Service deleted successfully']);
    }
}
