<?php

namespace App\Http\Controllers;

use App\Http\Requests\PortofolioRequest;
use App\Http\Resources\PortofolioResource;
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

        return PortofolioResource::collection($portofolios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PortofolioRequest $request)
    {

        $portofolio = Portofolio::create($request->validated());

        return response()->json([
            'message' => 'Portofolio added successfully',
            'data' => new PortofolioResource($portofolio)
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $portofolio = Portofolio::findOrFail($id);

        return new PortofolioResource($portofolio);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PortofolioRequest $request, string $id)
    {
        $portofolio = Portofolio::findOrFail($id);

        $portofolio->update($request->validated());

        return response()->json([
            'message' => 'Portofolio edited successfully',
            'data' => new PortofolioResource($portofolio)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Portofolio::destroy($id);

        return response()->json(['message' => 'Portofolio deleted Successfully']);
    }
}
